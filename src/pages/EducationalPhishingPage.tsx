import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, Lock, MapPin, Clock, Server } from 'lucide-react';

const EducationalPhishingPage = () => {
  const [reveal, setReveal] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    setReveal(true);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-12">
      {/* Simulation Banner */}
      <div className="bg-rose-500/20 border border-rose-500/50 text-rose-300 px-4 py-3 rounded-lg mb-8 flex items-center justify-center font-bold text-sm tracking-wide text-center">
        <AlertTriangle className="w-5 h-5 mr-3 shrink-0" />
        EDUCATIONAL SIMULATION ONLY — No real credentials are collected or transmitted.
      </div>

      {!reveal ? (
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="bg-slate-950 p-6 text-center border-b border-slate-800">
            <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <Lock className="w-6 h-6 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Account Security Verification</h2>
            <p className="text-sm text-slate-400">Your account requires immediate verification.</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-4">
              <h3 className="text-rose-400 text-sm font-bold flex items-center mb-3">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Suspicious Activity Detected
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-500 w-20">Location:</span>
                  <span className="font-semibold text-white">Russia</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-500 w-20">Time:</span>
                  <span className="font-semibold text-white">17/09/2026</span>
                </div>
                <div className="flex items-center">
                  <Server className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-500 w-20">Status:</span>
                  <span className="font-semibold text-rose-400">Verification Required</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-500 text-sm cursor-not-allowed">
                  employee@company.com
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <div className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-500 text-sm italic cursor-not-allowed text-center">
                  ******** Training Simulation ********
                </div>
              </div>

              <button 
                onClick={handleVerify}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2"
              >
                VERIFY ACCOUNT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div className="soc-card p-8 border-t-4 border-t-rose-500 text-center">
            <div className="w-20 h-20 mx-auto bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mb-6 neo-glow-red">
              <ShieldAlert className="w-10 h-10 text-rose-500" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-widest">Phishing Attack Detected</h2>
            <p className="text-slate-400 font-medium">You just interacted with a simulated credential harvesting page.</p>
          </div>

          <div className="soc-card p-6">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">Threat Indicators Explained</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xs mr-4 shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Artificial Urgency</h4>
                  <p className="text-sm text-slate-400 mt-1">"Verify within 2 hours or your account will be locked." Attackers use time limits to force immediate action without thinking.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xs mr-4 shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Suspicious Sender Domain</h4>
                  <p className="text-sm text-slate-400 mt-1"><span className="text-rose-400 font-mono">security-alert@company-verify-portal.com</span></p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xs mr-4 shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Domain Mismatch</h4>
                  <p className="text-sm text-slate-400 mt-1"><span className="text-rose-400 font-mono">company-verify-portal.com</span> is NOT the legitimate organization domain. It is a look-alike domain designed to trick you.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xs mr-4 shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Unexpected Login Verification</h4>
                  <p className="text-sm text-slate-400 mt-1">The message asks you to verify an account after an alleged login attempt. Legitimate services usually block the attempt and ask you to change your password directly through the app, not via a panicked email link.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xs mr-4 shrink-0 mt-0.5">5</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Threatening Consequences</h4>
                  <p className="text-sm text-slate-400 mt-1">Immediate suspension and permanent lockout are psychological tricks used to pressure the user.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xs mr-4 shrink-0 mt-0.5">6</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Suspicious Destination</h4>
                  <p className="text-sm text-slate-400 mt-1">The verification page you just landed on was hosted locally as part of this training simulation, completely disconnected from the actual service.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="soc-card p-6 bg-cyan-900/10 border-cyan-500/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              What Should You Have Done?
            </h3>
            <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
              <li>Check the sender address carefully.</li>
              <li>Hover over or check the destination URL before clicking any links.</li>
              <li>Avoid urgent account-verification links in unexpected emails.</li>
              <li>Contact the organization through an official, known channel (like typing their main URL directly into your browser).</li>
              <li>Report suspicious messages to your IT/Security department.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => navigate('/simulator')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors border border-slate-700 hover:border-slate-600 flex items-center justify-center"
            >
              RUN ANOTHER SCENARIO
            </button>
            <button 
              onClick={() => navigate('/detector')}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              GO TO PHISHING DETECTOR
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalPhishingPage;
