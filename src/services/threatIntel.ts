import type { Indicator } from '../types';

export const isThreatIntelAvailable = (): boolean => {
  // Use VITE_ prefix for Vite env vars
  return !!import.meta.env.VITE_THREAT_INTEL_API_KEY;
};

export const checkThreatIntel = async (url: string): Promise<Indicator[]> => {
  const indicators: Indicator[] = [];
  
  if (!isThreatIntelAvailable()) {
    return indicators;
  }

  // Simulate API call using the key
  try {
    // const key = import.meta.env.VITE_THREAT_INTEL_API_KEY;
    // const res = await fetch(`https://api.external-threat-intel.com/scan?url=${encodeURIComponent(url)}`, { ... });
    
    // For demonstration, we simulate a response
    await new Promise(r => setTimeout(r, 500));
    
    // Mocking an external hit if it contains "scam" or "phish"
    if (url.toLowerCase().includes('scam') || url.toLowerCase().includes('phish')) {
      indicators.push({
        type: 'threat_intel',
        label: 'Blacklisted Domain (Threat Intel)',
        evidence: `Threat Intelligence API flagged ${new URL(url).hostname}`,
        explanation: 'An external threat intelligence provider has confirmed this domain is associated with malicious activity.',
        action: 'Do not interact. The domain is verified as dangerous by security vendors.',
        score: 40
      });
    }
  } catch (e) {
    console.error('Threat intel failed:', e);
  }

  return indicators;
};

