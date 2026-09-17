import type { EmailData, Indicator, AnalysisResult } from '../types';
import { parseEml, redactSensitiveInfo } from './emailParser';
import { extractUrls, analyzeUrls } from './urlAnalyzer';
import { calculateRiskScore } from './riskScoring';
import { isThreatIntelAvailable } from './threatIntel';

export const analyzeSender = (data: EmailData): Indicator[] => {
  const indicators: Indicator[] = [];
  if (!data.sender) return indicators;

  if (data.replyTo && data.replyTo.trim() !== '') {
    const senderEmail = data.sender.match(/<([^>]+)>/)?.[1] || data.sender;
    const replyToEmail = data.replyTo.match(/<([^>]+)>/)?.[1] || data.replyTo;
    
    if (senderEmail.toLowerCase().trim() !== replyToEmail.toLowerCase().trim()) {
      indicators.push({
        type: 'mismatch',
        label: 'Sender/Reply-To Mismatch',
        evidence: `From: ${senderEmail}, Reply-To: ${replyToEmail}`,
        explanation: 'The reply address differs from the sender. Used to route your reply to an attacker.',
        action: 'Do not reply. Verify actual contact address independently.',
        score: 25
      });
    }
  }

  const displayMatch = data.sender.match(/^"?([^"<]+)"?\s*<([^>]+)>/);
  if (displayMatch) {
    const displayName = displayMatch[1].toLowerCase();
    const emailAddr = displayMatch[2].toLowerCase();
    const trustedBrands = ['paypal', 'apple', 'microsoft', 'google', 'amazon', 'bank', 'support', 'security', 'billing'];
    
    for (const brand of trustedBrands) {
      if (displayName.includes(brand) && !emailAddr.includes(brand)) {
        indicators.push({
          type: 'impersonation',
          label: 'Brand Impersonation',
          evidence: `Display name claims "${brand}" but email is ${emailAddr}`,
          explanation: 'Sender appears to spoof a trusted brand.',
          action: 'Contact the brand through official channels.',
          score: 30
        });
        break;
      }
    }
  }

  return indicators;
};

export const analyzeHeaders = (data: EmailData): Indicator[] => {
  const indicators: Indicator[] = [];
  if (!data.headers) return indicators;

  const authResults = data.headers['authentication-results'] || '';
  if (authResults) {
    const authLower = authResults.toLowerCase();
    if (authLower.includes('spf=fail') || authLower.includes('spf=softfail')) {
      indicators.push({
        type: 'auth',
        label: 'SPF Failure',
        evidence: 'SPF=fail in Authentication-Results',
        explanation: 'Sender IP is not authorized for this domain. Strong indicator of spoofing.',
        action: 'Do not trust the sender identity.',
        score: 30
      });
    }
    if (authLower.includes('dkim=fail')) {
      indicators.push({
        type: 'auth',
        label: 'DKIM Failure',
        evidence: 'DKIM=fail in Authentication-Results',
        explanation: 'Cryptographic signature failed. Email may be tampered or forged.',
        action: 'Do not trust the contents.',
        score: 30
      });
    }
    if (authLower.includes('dmarc=fail')) {
      indicators.push({
        type: 'auth',
        label: 'DMARC Failure',
        evidence: 'DMARC=fail in Authentication-Results',
        explanation: 'Failed domain DMARC policy. Likely spoofed.',
        action: 'Discard this email immediately.',
        score: 35
      });
    }
  }
  return indicators;
};

export const analyzeText = (text: string): Indicator[] => {
  const indicators: Indicator[] = [];
  const lowerText = text.toLowerCase();

  const urgencyRegex = /(immediate(ly)? action|within (12|24|48) hours|urgent(ly)?|asap|do not delay|time is running out)/i;
  const urgencyMatch = text.match(urgencyRegex);
  if (urgencyMatch) {
    indicators.push({
      type: 'urgency',
      label: 'Urgent Language',
      evidence: `Found phrase: "${urgencyMatch[0]}"`,
      explanation: 'Attackers use artificial urgency to panic victims into acting quickly.',
      action: 'Take a step back. Legitimate orgs rarely demand immediate panic-driven action.',
      score: 15
    });
  }

  const threatRegex = /(suspend(ed)?|terminate(d)?|delete(d)?|restrict(ed)?|block(ed)?|legal action|revoke(d)?)/i;
  const threatMatch = text.match(threatRegex);
  if (threatMatch && lowerText.includes('account')) {
    indicators.push({
      type: 'threat',
      label: 'Threatening Language',
      evidence: `Found phrase: "${threatMatch[0]}"`,
      explanation: 'Threats regarding account status are used to coerce users into handing over credentials.',
      action: 'Log into your account manually by typing the URL in your browser.',
      score: 20
    });
  }

  const credRegex = /(verify your account|update your account|login( here)?|click( here)? to log in|confirm your identity|password reset|verify your password)/i;
  const credMatch = text.match(credRegex);
  if (credMatch) {
    indicators.push({
      type: 'credential',
      label: 'Credential Request',
      evidence: `Found phrase: "${credMatch[0]}"`,
      explanation: 'Directing you to a login page, likely a cloned phishing site.',
      action: 'Never enter credentials on pages accessed via unsolicited links.',
      score: 25
    });
  }

  const finRegex = /(invoice attached|overdue payment|wire transfer|gift card|crypto|bitcoin|billing error|refund available)/i;
  const finMatch = text.match(finRegex);
  if (finMatch) {
    indicators.push({
      type: 'financial',
      label: 'Financial Request',
      evidence: `Found financial phrase: "${finMatch[0]}"`,
      explanation: 'Discusses financial transactions, a common vector for fraud.',
      action: 'Verify financial requests by calling the person or company directly.',
      score: 20
    });
  }

  return indicators;
};

export const analyzeEmailAsync = async (input: EmailData | string): Promise<AnalysisResult> => {
  const emailData = typeof input === 'string' ? parseEml(input) : input;
  const indicators: Indicator[] = [];

  indicators.push(...analyzeSender(emailData));
  indicators.push(...analyzeHeaders(emailData));

  const fullText = `${emailData.subject}\n\n${emailData.body}`;
  indicators.push(...analyzeText(fullText));

  const urls = extractUrls(fullText);
  if (emailData.raw) {
      // In case there are URLs in raw HTML not caught by body cleanup
      const rawUrls = extractUrls(emailData.raw);
      urls.push(...rawUrls);
  }
  const uniqueUrls = [...new Set(urls)];

  const urlIndicators = await analyzeUrls(uniqueUrls);
  indicators.push(...urlIndicators);

  const result = calculateRiskScore(indicators, isThreatIntelAvailable());
  
  // Attach redacted input to result for safe reporting
  result.redactedInput = {
    sender: redactSensitiveInfo(emailData.sender),
    subject: redactSensitiveInfo(emailData.subject),
    body: redactSensitiveInfo(emailData.body).substring(0, 500) + (emailData.body.length > 500 ? '...' : '')
  };

  return result;
};

