import { useState } from 'react';
import { GraduationCap, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Download, Activity, Play, RotateCcw, LayoutGrid, AlertTriangle } from 'lucide-react';
import { scenariosData } from '../data/scenarios';
import type { TrainingScenario, TrainingSession } from '../types';
import { generateTrainingReport } from '../services/reportGenerator';

const TrainingScenarios = () => {
  const [activeScenario, setActiveScenario] = useState<TrainingScenario | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [detectedSkills, setDetectedSkills] = useState<Set<string>>(new Set());
  const [areasForImprovement, setAreasForImprovement] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const startScenario = (scenario: TrainingScenario) => {
    setActiveScenario(scenario);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setDetectedSkills(new Set());
    setAreasForImprovement(new Set());
    setIsCompleted(false);
    setDownloadSuccess(false);
  };

  const handleOptionSelect = (optionId: string) => {
    if (isAnswerRevealed) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerRevealed || !activeScenario) return;

    const currentQuestion = activeScenario.questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId);
    
    if (selectedOption?.isCorrect) {
      setScore(prev => prev + Math.round(100 / activeScenario.questions.length));
      setCorrectAnswers(prev => prev + 1);
      setDetectedSkills(prev => new Set(prev).add(selectedOption.skill));
    } else if (selectedOption) {
      setIncorrectAnswers(prev => prev + 1);
      // The skill associated with the incorrect option or the correct option
      const correctOption = currentQuestion.options.find(o => o.isCorrect);
      if (correctOption) {
        setAreasForImprovement(prev => new Set(prev).add(correctOption.skill));
      }
    }
    
    setIsAnswerRevealed(true);
  };

  const handleNext = () => {
    if (!activeScenario) return;
    
    if (currentQuestionIndex < activeScenario.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerRevealed(false);
    } else {
      setIsCompleted(true);
    }
  };

  const generateRecommendations = (accuracy: number, areas: string[]): string[] => {
    const recs: string[] = [];
    if (accuracy === 100) {
      recs.push('Excellent work! You demonstrated a strong understanding of phishing vectors.');
      recs.push('Continue to independently verify all unexpected requests.');
    } else {
      recs.push('Always verify the actual sender domain, not just the display name.');
      recs.push('Never click links in unexpected emails. Navigate to the service manually.');
      if (areas.includes('Urgency Detection') || areas.includes('Social Engineering Tactics')) {
        recs.push('Beware of artificial urgency designed to make you act without thinking.');
      }
      if (areas.includes('Domain Verification') || areas.includes('Suspicious URL Recognition')) {
        recs.push('Inspect URLs carefully. Look out for typosquatting and deceptive subdomains.');
      }
    }
    return recs;
  };

  const handleDownloadReport = () => {
    if (!activeScenario) return;
    
    const accuracy = Math.round((correctAnswers / activeScenario.questions.length) * 100);
    const areas = Array.from(areasForImprovement);
    const session: TrainingSession = {
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      score: Math.min(score, 100),
      maxScore: 100,
      correctAnswers,
      incorrectAnswers,
      totalQuestions: activeScenario.questions.length,
      detectedSkills: Array.from(detectedSkills),
      areasForImprovement: areas,
      recommendations: generateRecommendations(accuracy, areas),
      completedAt: new Date().toLocaleString()
    };
    
    generateTrainingReport(session);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  if (activeScenario) {
    if (isCompleted) {
      const accuracy = Math.round((correctAnswers / activeScenario.questions.length) * 100);
      const areas = Array.from(areasForImprovement);
      const recs = generateRecommendations(accuracy, areas);

      return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
          <div className="soc-card p-10 text-center space-y-8 border-t-4 border-t-success relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="mx-auto w-20 h-20 bg-emerald-500/100/20 rounded-full flex items-center justify-center border border-success/50 relative z-10">
              <GraduationCap className="w-10 h-10 text-emerald-400" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">TRAINING COMPLETED</h2>
              <p className="text-slate-500">You have completed the "{activeScenario.title}" scenario.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 relative z-10">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Score</div>
                <div className="text-4xl font-black text-white">{Math.min(score, 100)}<span className="text-xl text-slate-400">/100</span></div>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Correct</div>
                <div className="text-4xl font-black text-cyan-400">{correctAnswers}<span className="text-xl text-slate-400">/{activeScenario.questions.length}</span></div>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Accuracy</div>
                <div className="text-4xl font-black text-blue-400">{accuracy}%</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left relative z-10">
              <div className="bg-slate-900/80 p-6 rounded-xl border border-emerald-500/30 space-y-3">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Identified Correctly:</h3>
                <ul className="space-y-2">
                  {Array.from(detectedSkills).length > 0 ? Array.from(detectedSkills).map((skill, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" />
                      {skill}
                    </li>
                  )) : (
                    <li className="text-sm text-slate-400">No specific skills identified correctly.</li>
                  )}
                </ul>
              </div>
              
              <div className="bg-slate-900/80 p-6 rounded-xl border border-amber-500/30 space-y-3">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Areas for Improvement:</h3>
                <ul className="space-y-2">
                  {areas.length > 0 ? areas.map((area, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-400">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mr-2" />
                      {area}
                    </li>
                  )) : (
                    <li className="flex items-center text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" />
                      Perfect score!
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50 text-left relative z-10">
               <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Security Recommendations</h4>
               <ul className="space-y-2 text-sm text-slate-400">
                 {recs.map((rec, idx) => (
                   <li key={idx} className="flex items-start">
                     <span className="text-cyan-400 mr-2">•</span>
                     <span>{rec}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4 relative z-10">
              <button onClick={() => startScenario(activeScenario)} className="btn-secondary py-3 px-6 text-sm flex items-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>RETRY SCENARIO</span>
              </button>
              
              <button onClick={() => setActiveScenario(null)} className="py-3 px-6 text-sm flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors font-bold tracking-wider">
                <LayoutGrid className="w-4 h-4" />
                <span>CHOOSE ANOTHER</span>
              </button>
              
              <div className="flex flex-col items-center">
                <button onClick={handleDownloadReport} className="btn-primary py-3 px-6 text-sm flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD REPORT</span>
                </button>
                {downloadSuccess && (
                  <span className="text-emerald-400 text-xs font-bold transition-opacity animate-in fade-in mt-2 absolute -bottom-6">Report downloaded!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = activeScenario.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / activeScenario.questions.length) * 100;

    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
        <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <button onClick={() => setActiveScenario(null)} className="text-slate-500 hover:text-white transition-colors text-sm font-bold">
            ← BACK TO SCENARIOS
          </button>
          <div className="text-cyan-400 font-bold text-sm tracking-wider uppercase">
            {activeScenario.title} — QUESTION {currentQuestionIndex + 1} OF {activeScenario.questions.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simulated Email */}
          <div className="soc-card overflow-hidden flex flex-col h-full border-slate-700/50 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
               <ShieldAlert className="w-64 h-64" />
            </div>
            
            <div className="bg-slate-800/50 border-b border-slate-700/50 px-4 py-3 flex items-center space-x-2 relative z-10">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-danger"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <div className="text-slate-500 text-xs font-mono ml-4">Inbox - Webmail Client</div>
            </div>
            
            {/* Educational Banner */}
            <div className="bg-warning text-black text-xs font-bold uppercase tracking-widest text-center py-1.5 relative z-10">
              EDUCATIONAL SIMULATION - NOT A REAL EMAIL
            </div>
            
            <div className="p-6 bg-slate-900/80 space-y-6 flex-grow text-gray-900 relative z-10">
              <div className="border-b pb-4 space-y-2">
                <div className="flex text-sm">
                  <span className="w-16 text-slate-400 font-medium">From:</span>
                  <span className="font-medium">{activeScenario.simulatedMessage.sender}</span>
                </div>
                <div className="flex text-sm">
                  <span className="w-16 text-slate-400 font-medium">Subject:</span>
                  <span className="font-bold">{activeScenario.simulatedMessage.subject}</span>
                </div>
              </div>
              
              <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {activeScenario.simulatedMessage.body}
              </div>
              
              {activeScenario.simulatedMessage.url && (
                <div className="pt-4">
                  <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm">
                    View Alert / Action Link
                  </div>
                  <div className="text-xs text-blue-400 hover:underline mt-2 font-mono break-all cursor-pointer">
                    {activeScenario.simulatedMessage.url}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Question Area */}
          <div className="soc-card p-6 md:p-8 flex flex-col space-y-6">
            <div className="bg-cyan-500/100/10 text-cyan-400 border border-cyan-500/30 p-4 rounded-lg text-sm mb-2">
              <Activity className="w-4 h-4 inline-block mr-2" />
              {activeScenario.introduction}
            </div>

            <h3 className="text-xl font-bold text-white">{currentQuestion.text}</h3>

            <div className="space-y-3 flex-grow">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optionClass = "border-slate-600/50 bg-slate-900/50 hover:border-cyan-400 text-slate-400";
                
                if (isAnswerRevealed) {
                  if (option.isCorrect) {
                    optionClass = "border-success bg-emerald-500/100/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
                  } else if (isSelected && !option.isCorrect) {
                    optionClass = "border-danger bg-rose-500/10 text-rose-400";
                  } else {
                    optionClass = "border-slate-700/50 bg-slate-800/50 text-slate-400 opacity-50";
                  }
                } else if (isSelected) {
                  optionClass = "border-primary bg-cyan-500/100/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isAnswerRevealed}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start ${optionClass}`}
                  >
                    <div className="mr-3 mt-0.5 flex-shrink-0">
                      {isAnswerRevealed && option.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isAnswerRevealed && isSelected && !option.isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                      {!isAnswerRevealed && (
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary' : 'border-gray-600'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{option.text}</div>
                      {isAnswerRevealed && (isSelected || option.isCorrect) && (
                        <div className={`text-sm mt-2 font-medium ${option.isCorrect ? 'text-emerald-400/90' : 'text-rose-400/90'}`}>
                          Explanation: <span className="text-slate-400 font-normal">{option.explanation}</span>
                          <div className="mt-1 font-bold text-xs uppercase opacity-80">Phishing Indicator: {option.skill}</div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              {!isAnswerRevealed ? (
                <button 
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className={`w-full py-4 rounded-lg font-bold tracking-wider transition-all duration-300 ${
                    selectedOptionId 
                      ? 'bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                      : 'bg-gray-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  SUBMIT ANSWER
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className="w-full py-4 rounded-lg font-bold tracking-wider bg-slate-900/80 text-black hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>{currentQuestionIndex < activeScenario.questions.length - 1 ? 'NEXT QUESTION' : 'COMPLETE SCENARIO'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-cyan-400 mr-3" />
          TRAINING SCENARIOS
        </h1>
        <p className="text-slate-500 font-mono tracking-wide">"Test your detection skills against real-world simulated attacks."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {scenariosData.map((scenario) => (
          <div key={scenario.id} className="soc-card p-6 flex flex-col group hover:-translate-y-1 transition-all duration-300 border-slate-700/50 hover:border-cyan-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50 group-hover:border-cyan-400 transition-colors">
                <ShieldAlert className="w-6 h-6 text-cyan-400" />
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                scenario.difficulty === 'Beginner' ? 'bg-emerald-500/100/10 text-emerald-400 border-emerald-500/30' :
                scenario.difficulty === 'Intermediate' ? 'bg-amber-500/100/10 text-amber-400 border-amber-500/30' :
                'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}>
                {scenario.difficulty}
              </span>
            </div>
            
            <div className="space-y-2 mb-6 relative z-10 flex-grow">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{scenario.title}</h3>
              <p className="text-sm font-mono text-cyan-400/70">{scenario.type}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{scenario.description}</p>
            </div>
            
            <button 
              onClick={() => startScenario(scenario)}
              className="mt-auto w-full py-3 px-4 rounded border border-slate-600/50 bg-[#080d1a] hover:bg-cyan-500/100/10 hover:border-primary text-slate-400 hover:text-white transition-all duration-300 flex justify-between items-center relative z-10"
            >
              <span className="font-bold text-sm tracking-wide">START MODULE</span>
              <Play className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingScenarios;


