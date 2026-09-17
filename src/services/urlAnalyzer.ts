import type { Indicator } from '../types';
import { checkThreatIntel, isThreatIntelAvailable } from './threatIntel';

export const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  const urls = text.match(urlRegex) || [];
  return [...new Set(urls)]; 
};

export const analyzeLocalUrl = (url: string): Indicator[] => {
  const indicators: Indicator[] = [];
  
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (parsedUrl.protocol !== 'https:') {
      indicators.push({
        type: 'url_structure',
        label: 'Unencrypted Protocol (HTTP)',
        evidence: `URL uses ${parsedUrl.protocol}`,
        explanation: 'The connection is not secure, meaning data can be intercepted.',
        action: 'Never enter credentials on HTTP sites.',
        score: 10
      });
    }

    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
      indicators.push({
        type: 'link',
        label: 'IP Address URL',
        evidence: `URL uses an IP address: ${hostname}`,
        explanation: 'Legitimate organizations use domains, not raw IP addresses. Used to hide true destination.',
        action: 'Do not click. Highly suspicious.',
        score: 30
      });
      return indicators; 
    }

    const parts = hostname.split('.');
    if (parts.length > 3 && !hostname.includes('co.uk') && !hostname.includes('com.au')) {
      indicators.push({
        type: 'url_structure',
        label: 'Excessive Subdomains',
        evidence: `Domain structure: ${hostname}`,
        explanation: 'Attackers use long subdomains (e.g. login.paypal.com.scam.net) to hide the real root domain.',
        action: 'Inspect the end of the domain name carefully.',
        score: 20
      });
    }

    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd'];
    if (shorteners.includes(hostname.toLowerCase())) {
      indicators.push({
        type: 'link',
        label: 'URL Shortener',
        evidence: `Uses known shortener: ${hostname}`,
        explanation: 'Hides the actual destination of malicious links.',
        action: 'Use a URL expander service to verify destination.',
        score: 15
      });
    }
    
    // Typo-squatting / Brand keywords
    const trustedBrands = ['paypal', 'apple', 'microsoft', 'google', 'amazon', 'bank'];
    const domainWithoutTld = parts[parts.length - 2] || parts[0];
    for (const brand of trustedBrands) {
      if (hostname.includes(brand) && domainWithoutTld !== brand) {
        indicators.push({
          type: 'impersonation',
          label: 'Brand Impersonation in URL',
          evidence: `URL contains "${brand}" but root domain is ${domainWithoutTld}`,
          explanation: 'The URL is designed to look like a trusted brand.',
          action: 'Manually navigate to the official website.',
          score: 25
        });
        break;
      }
    }

  } catch (e) {
    indicators.push({
      type: 'url_structure',
      label: 'Malformed URL',
      evidence: `Could not parse: ${url}`,
      explanation: 'The URL structure is irregular.',
      action: 'Avoid clicking.',
      score: 10
    });
  }

  return indicators;
};

export const analyzeUrls = async (urls: string[]): Promise<Indicator[]> => {
  const indicators: Indicator[] = [];
  
  for (const url of urls) {
    // Local rule-based
    indicators.push(...analyzeLocalUrl(url));
    
    // External Threat Intel
    if (isThreatIntelAvailable()) {
      const externalIndicators = await checkThreatIntel(url);
      indicators.push(...externalIndicators);
    }
  }

  return indicators;
};

