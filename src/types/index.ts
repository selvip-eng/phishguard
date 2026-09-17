export interface EmailData {
  sender: string;
  replyTo?: string;
  subject: string;
  body: string;
  headers?: Record<string, string>;
  raw?: string;
}

export type IndicatorType = 'urgency' | 'link' | 'impersonation' | 'credential' | 'financial' | 'auth' | 'mismatch' | 'threat' | 'url_structure' | 'threat_intel';

export interface Indicator {
  type: IndicatorType;
  label: string;
  evidence: string;
  explanation: string;
  action: string;
  score: number;
}

export type RiskLevel = 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK' | 'CRITICAL RISK';

export interface AnalysisResult {
  score: number;
  level: RiskLevel;
  indicators: Indicator[];
  threatIntelAvailable: boolean;
  redactedInput?: Partial<EmailData>;
}

export interface TrainingQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string; skill: string }[];
}

export interface TrainingScenario {
  id: string;
  title: string;
  type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  introduction: string;
  simulatedMessage: {
    sender: string;
    subject: string;
    body: string;
    url?: string;
  };
  questions: TrainingQuestion[];
}

export interface TrainingSession {
  scenarioId: string;
  scenarioTitle: string;
  score: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  detectedSkills: string[];
  areasForImprovement: string[];
  recommendations: string[];
  completedAt: string;
}

