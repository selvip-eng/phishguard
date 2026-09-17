import type { Indicator, AnalysisResult, RiskLevel } from '../types';

export const calculateRiskScore = (indicators: Indicator[], threatIntelAvailable: boolean): AnalysisResult => {
  let score = 0;
  
  // Deduplicate by label to prevent score inflation
  const uniqueIndicators = Array.from(new Map(indicators.map(item => [item.label, item])).values());
  
  for (const ind of uniqueIndicators) {
    score += ind.score;
  }

  score = Math.min(score, 100);

  let level: RiskLevel = 'LOW RISK';
  if (score >= 85) level = 'CRITICAL RISK';
  else if (score >= 60) level = 'HIGH RISK';
  else if (score >= 30) level = 'MEDIUM RISK';

  return {
    score,
    level,
    indicators: uniqueIndicators,
    threatIntelAvailable
  };
};

