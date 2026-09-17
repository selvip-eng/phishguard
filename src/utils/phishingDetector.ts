export interface EmailData {
  sender: string;
  replyTo?: string;
  subject: string;
  body: string;
  headers?: Record<string, string>;
  raw?: string;
}

export interface Indicator {
  type: 'urgency' | 'link' | 'impersonation' | 'credential' | 'financial' | 'auth' | 'mismatch' | 'threat';
  label: string;
  evidence: string;
  explanation: string;
  action: string;
  score: number;
}

export interface AnalysisResult {
  score: number;
  level: 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK' | 'CRITICAL RISK';
  indicators: Indicator[];
}

export const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  const urls = text.match(urlRegex) || [];
  return [...new Set(urls)]; // return unique URLs
};

export const analyzeSender = (data: EmailData): Indicator[] => {
  const indicators: Indicator[] = [];
  
  if (!data.sender) return indicators;

  // Check Sender / Reply-To mismatch
  if (data.replyTo && data.replyTo.trim() !== '') {
    const senderEmail = data.sender.match(/<([^>]+)>/)?.[1] || data.sender;
    const replyToEmail = data.replyTo.match(/<([^>]+)>/)?.[1] || data.replyTo;
    
    if (senderEmail.toLowerCase().trim() !== replyToEmail.toLowerCase().trim()) {
      indicators.push({
        type: 'mismatch',
        label: 'Sender/Reply-To Mismatch',
        evidence: `From: ${senderEmail}, Reply-To: ${replyToEmail}`,
        explanation: 'The reply address differs from the sender address. Attackers use this to route your reply to their account while appearing to come from a trusted source.',
        action: 'Do not reply. Verify the actual contact address of the organization.',
        score: 25
      });
    }
  }

  // Check for common brand impersonations in display name but weird email
  const displayMatch = data.sender.match(/^"?([^"<]+)"?\s*<([^>]+)>/);
  if (displayMatch) {
    const displayName = displayMatch[1].toLowerCase();
    const emailAddr = displayMatch[2].toLowerCase();
    const trustedBrands = ['paypal', 'apple', 'microsoft', 'google', 'amazon', 'bank', 'support', 'security'];
    
    for (const brand of trustedBrands) {
      if (displayName.includes(brand) && !emailAddr.includes(brand)) {
        indicators.push({
          type: 'impersonation',
          label: 'Brand Impersonation',
          evidence: `Display name contains "${brand}" but email is ${emailAddr}`,
          explanation: 'The sender is trying to look like a trusted brand, but the actual email address does not match the brand\'s domain.',
          action: 'Verify the sender address carefully. Contact the brand through official channels.',
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
        label: 'SPF Authentication Failure',
        evidence: 'SPF=fail in Authentication-Results',
        explanation: 'The sender\'s IP address is not authorized to send emails on behalf of this domain. This is a strong indicator of spoofing.',
        action: 'Treat this email as highly suspicious. Do not trust the sender identity.',
        score: 30
      });
    }
    if (authLower.includes('dkim=fail')) {
      indicators.push({
        type: 'auth',
        label: 'DKIM Authentication Failure',
        evidence: 'DKIM=fail in Authentication-Results',
        explanation: 'The email\'s cryptographic signature failed validation, meaning it may have been tampered with or forged.',
        action: 'Do not trust the contents or sender of this email.',
        score: 30
      });
    }
    if (authLower.includes('dmarc=fail')) {
      indicators.push({
        type: 'auth',
        label: 'DMARC Policy Failure',
        evidence: 'DMARC=fail in Authentication-Results',
        explanation: 'The email failed the domain\'s DMARC policy, confirming it is likely spoofed and unauthorized.',
        action: 'Discard this email. It is highly likely to be malicious.',
        score: 35
      });
    }
  }

  return indicators;
};

export const analyzeText = (text: string): Indicator[] => {
  const indicators: Indicator[] = [];
  const lowerText = text.toLowerCase();

  // Urgency
  const urgencyRegex = /(immediate(ly)? action|within (12|24|48) hours|urgent(ly)?|asap|do not delay|time is running out)/i;
  const urgencyMatch = text.match(urgencyRegex);
  if (urgencyMatch) {
    indicators.push({
      type: 'urgency',
      label: 'Urgent Language',
      evidence: `Found phrase: "${urgencyMatch[0]}"`,
      explanation: 'Attackers use artificial urgency to panic victims into acting quickly without thinking.',
      action: 'Take a step back. Legitimate organizations rarely demand immediate panic-driven action.',
      score: 15
    });
  }

  // Threats
  const threatRegex = /(suspend(ed)?|terminate(d)?|delete(d)?|restrict(ed)?|block(ed)?|legal action|revoke(d)?)/i;
  const threatMatch = text.match(threatRegex);
  if (threatMatch && lowerText.includes('account')) {
    indicators.push({
      type: 'threat',
      label: 'Threatening Language',
      evidence: `Found phrase implying account action: "${threatMatch[0]}"`,
      explanation: 'Threats regarding account status are commonly used to coerce users into handing over credentials.',
      action: 'Do not click links. Log into your account manually by typing the URL in your browser.',
      score: 20
    });
  }

  // Credentials
  const credRegex = /(verify your account|update your account|login( here)?|click( here)? to log in|confirm your identity|password reset|verify your password)/i;
  const credMatch = text.match(credRegex);
  if (credMatch) {
    indicators.push({
      type: 'credential',
      label: 'Credential Request',
      evidence: `Found phrase: "${credMatch[0]}"`,
      explanation: 'The email is attempting to direct you to a login page, likely a cloned phishing site.',
      action: 'Never enter credentials on pages accessed via unsolicited links.',
      score: 25
    });
  }

  // Financial
  const finRegex = /(invoice attached|overdue payment|wire transfer|gift card|crypto|bitcoin|billing error|refund available)/i;
  const finMatch = text.match(finRegex);
  if (finMatch) {
    indicators.push({
      type: 'financial',
      label: 'Financial/Payment Request',
      evidence: `Found financial phrase: "${finMatch[0]}"`,
      explanation: 'The email discusses financial transactions, a common vector for wire fraud or refund scams.',
      action: 'Do not process payments or open attachments. Verify financial requests by calling the person or company directly.',
      score: 20
    });
  }

  return indicators;
};

export const analyzeUrls = (urls: string[]): Indicator[] => {
  const indicators: Indicator[] = [];
  
  for (const url of urls) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      // Check for IP address in URL
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
        indicators.push({
          type: 'link',
          label: 'IP Address URL',
          evidence: `URL uses an IP address instead of a domain: ${hostname}`,
          explanation: 'Legitimate organizations use domain names, not raw IP addresses. This is often used to hide the true destination.',
          action: 'Do not click the link. It is highly suspicious.',
          score: 30
        });
        continue;
      }

      // Check for excessive subdomains
      const parts = hostname.split('.');
      if (parts.length > 3 && !hostname.includes('co.uk') && !hostname.includes('com.au')) {
        indicators.push({
          type: 'link',
          label: 'Excessive Subdomains',
          evidence: `Domain structure is unusually long: ${hostname}`,
          explanation: 'Attackers use long subdomains (e.g., login.paypal.com.scam.net) to trick users into looking only at the beginning of the URL.',
          action: 'Inspect the end of the domain name carefully (just before the first slash).',
          score: 20
        });
      }

      // Check for URL shorteners
      const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd'];
      if (shorteners.includes(hostname.toLowerCase())) {
        indicators.push({
          type: 'link',
          label: 'URL Shortener',
          evidence: `Uses known shortener: ${hostname}`,
          explanation: 'Attackers use URL shorteners to hide the actual destination of malicious links.',
          action: 'Use a URL expander service to see the true destination before clicking.',
          score: 15
        });
      }

    } catch (e) {
      // Invalid URL
    }
  }

  return indicators;
};

export const calculateRiskScore = (indicators: Indicator[]): AnalysisResult => {
  let score = 0;
  
  // Deduplicate indicators by label so we don't double count identical issues
  const uniqueIndicators = Array.from(new Map(indicators.map(item => [item.label, item])).values());
  
  for (const ind of uniqueIndicators) {
    score += ind.score;
  }

  // Cap at 100
  score = Math.min(score, 100);

  let level: AnalysisResult['level'] = 'LOW RISK';
  if (score >= 85) level = 'CRITICAL RISK';
  else if (score >= 60) level = 'HIGH RISK';
  else if (score >= 30) level = 'MEDIUM RISK';

  return {
    score,
    level,
    indicators: uniqueIndicators
  };
};

export const parseEml = (rawEml: string): EmailData => {
  const data: EmailData = { sender: '', subject: '', body: '', headers: {}, raw: rawEml };
  
  // Split headers and body
  // Usually separated by \r\n\r\n or \n\n
  const splitIndex = rawEml.indexOf('\r\n\r\n') !== -1 ? rawEml.indexOf('\r\n\r\n') : rawEml.indexOf('\n\n');
  
  if (splitIndex === -1) {
    // Malformed, treat whole thing as body
    data.body = rawEml;
    return data;
  }

  const headerPart = rawEml.substring(0, splitIndex);
  data.body = rawEml.substring(splitIndex).trim();

  // Parse headers (handling multiline folded headers)
  const headerLines = headerPart.split(/\r?\n/);
  let currentKey = '';
  
  for (const line of headerLines) {
    if (line.match(/^\s+/) && currentKey) {
      // Continuation of previous header
      data.headers![currentKey] += ' ' + line.trim();
    } else {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        currentKey = match[1].toLowerCase();
        data.headers![currentKey] = match[2].trim();
      }
    }
  }

  data.sender = data.headers!['from'] || '';
  data.replyTo = data.headers!['reply-to'] || '';
  data.subject = data.headers!['subject'] || '';

  return data;
};

export const analyzeEmail = (input: EmailData | string): AnalysisResult => {
  let emailData: EmailData;

  if (typeof input === 'string') {
    emailData = parseEml(input);
  } else {
    emailData = input;
  }

  const indicators: Indicator[] = [];

  // Analyze Sender
  indicators.push(...analyzeSender(emailData));

  // Analyze Headers
  indicators.push(...analyzeHeaders(emailData));

  // Combine subject and body for text analysis
  const fullText = `${emailData.subject}\n\n${emailData.body}`;
  indicators.push(...analyzeText(fullText));

  // Analyze URLs
  const urls = extractUrls(fullText);
  indicators.push(...analyzeUrls(urls));

  return calculateRiskScore(indicators);
};

