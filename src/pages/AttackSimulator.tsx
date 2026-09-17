import { useState } from 'react';
import { Shield, ChevronRight, Lock, Mail, Globe, Server, UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

const AttackSimulator = () => {
  const [step, setStep] = useState(1);
  const [, setSelectedScenario] = useState<number | null>(null);

  const scenarios = [
    {
      id: 1,
      title: "Suspicious Login Alert",
      threat: "Credential Harvesting",
      difficulty: "Beginner",
      icon: Lock,
      color: "cyan"
    },
    {
      id: 2,
      title: "Urgent Invoice Attached",
      threat: "Malware Payload",
      difficulty: "Intermediate",
      icon: Mail,
      color: "rose"
    },
    {
      id: 3,
      title: "HR Policy Update",
      threat: "Spear Phishing",
      difficulty: "Advanced",
      icon: UserCheck,
      color: "violet"
    }
  ];

  const handleStart = (id: number) => {
    setSelectedScenario(id);
    setStep(2);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Interactive Cyber-Lab</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-wide">Attack Simulator</h1>
          <p className="text-slate-400 mt-2 font-medium">Safely experience and analyze real-world phishing methodologies.</p>
        </div>
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`w-3 h-3 rounded-full border border-slate-700 ${step >= s ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-slate-900'}`}></div>
          ))}
        </div>
      </div>

      {/* Stage 1: Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-200 flex items-center">
            <span className="text-cyan-500 mr-2">01.</span> Select Threat Scenario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <div key={scenario.id} className="soc-card p-6 flex flex-col hover:border-cyan-500/50 group transition-colors cursor-pointer" onClick={() => handleStart(scenario.id)}>
                  <div className={`w-12 h-12 rounded-xl bg-${scenario.color}-500/10 border border-${scenario.color}-500/20 flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 text-${scenario.color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{scenario.title}</h3>
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider border border-slate-700/50 px-2 py-1 rounded bg-slate-900/50">
                      {scenario.difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider border border-slate-700/50 px-2 py-1 rounded bg-slate-900/50">
                      {scenario.threat}
                    </span>
                  </div>
                  <button className="mt-auto w-full flex items-center justify-center space-x-2 bg-slate-900 border border-slate-700/50 text-slate-300 py-3 rounded-xl font-bold group-hover:bg-cyan-600 group-hover:border-cyan-500 group-hover:text-white transition-all">
                    <span>Initialize Vector</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stage 2: Inbound Vector */}
      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <h2 className="text-xl font-bold text-slate-200 flex items-center">
            <span className="text-cyan-500 mr-2">02.</span> Analyze Inbound Vector
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 soc-card p-0 overflow-hidden border border-slate-700/50">
              <div className="bg-slate-950/80 px-4 py-3 flex items-center space-x-2 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                <span className="ml-4 text-xs font-mono text-slate-500">mail.client.local</span>
              </div>
              <div className="p-6 bg-white text-slate-900 min-h-[300px]">
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-slate-600">From:</span>
                    <span className="text-slate-800">Security Team &lt;security-alert@company-verify-portal.com&gt;</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-slate-600">To:</span>
                    <span className="text-slate-800">employee@company.com</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-600">Subject:</span>
                    <span className="text-slate-900 font-bold">URGENT: Unauthorized Login Attempt Detected</span>
                  </div>
                </div>
                <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
                  <p>Dear Employee,</p>
                  <p>We detected an unauthorized login attempt to your account from a new IP address in <strong>Russia</strong> on {new Date().toLocaleDateString()}.</p>
                  <p>To prevent immediate suspension of your account, you must verify your identity within the next 2 hours.</p>
                  <div className="py-4 text-center">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">Verify Account Now</button>
                  </div>
                  <p>If you fail to verify, your access will be permanently locked.</p>
                  <p className="text-slate-500 mt-8 text-xs">Security Operations Center</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="soc-card p-6 bg-cyan-900/10 border-cyan-500/30">
                <h3 className="font-bold text-cyan-400 mb-2 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2" />
                  Observation Task
                </h3>
                <p className="text-sm text-slate-300">Identify the primary social engineering tactic being used in this message.</p>
              </div>
              
              <div className="space-y-3">
                <button onClick={() => setStep(3)} className="w-full text-left soc-card p-4 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center justify-between group">
                  <span className="text-sm font-bold text-slate-200">Sense of Urgency & Threat</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                </button>
                <button onClick={() => setStep(3)} className="w-full text-left soc-card p-4 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center justify-between group">
                  <span className="text-sm font-bold text-slate-200">Greed & Reward</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                </button>
                <button onClick={() => setStep(3)} className="w-full text-left soc-card p-4 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center justify-between group">
                  <span className="text-sm font-bold text-slate-200">Curiosity</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 3: Exploit Execution */}
      {step === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <h2 className="text-xl font-bold text-slate-200 flex items-center">
            <span className="text-cyan-500 mr-2">03.</span> Payload Delivery
          </h2>
          
          <div className="soc-card p-8 text-center max-w-2xl mx-auto border-t-4 border-t-rose-500">
            <div className="w-20 h-20 mx-auto bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mb-6 neo-glow-red animate-pulse-slow">
              <Globe className="w-10 h-10 text-rose-500" />
            </div>
            
            <h3 className="text-2xl font-black text-white mb-4">You clicked the link.</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              In a real scenario, this click would route you to a deceptive webpage engineered to harvest your credentials or execute a drive-by download. The attacker relied on the <strong>urgency</strong> created in the previous step to bypass your critical thinking.
            </p>
            
            <button onClick={() => setStep(4)} className="btn-primary mx-auto">
              <span>View Post-Exploit Analysis</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stage 4: Resolution */}
      {step === 4 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-xl font-bold text-slate-200 flex items-center">
            <span className="text-cyan-500 mr-2">04.</span> Action Report
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="soc-card p-6 border-cyan-500/30 bg-cyan-900/10">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Simulation Complete</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                You successfully navigated the credential harvesting attack scenario. Recognizing urgency and checking sender domains are critical first steps in defense.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 bg-slate-900/50 p-3 rounded border border-slate-800">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <div className="text-xs font-bold text-slate-300">Sender Domain Mismatch</div>
                    <div className="text-xs text-slate-500">company-verify-portal.com is not a legitimate domain.</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-slate-900/50 p-3 rounded border border-slate-800">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <div className="text-xs font-bold text-slate-300">Artificial Urgency</div>
                    <div className="text-xs text-slate-500">Threatening immediate suspension to force action.</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="soc-card p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready for Analysis?</h3>
              <p className="text-sm text-slate-400 mb-8">
                Apply what you've learned. Use the Phishing Detector to scan real suspicious emails.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center">
                <button onClick={() => setStep(1)} className="btn-outline text-sm">
                  Run Another Scenario
                </button>
                <button className="btn-primary text-sm" onClick={() => window.location.href = '/detector'}>
                  Go to Detector
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AttackSimulator;
