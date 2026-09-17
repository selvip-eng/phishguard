import { Eye, Link, Clock, Key, Shield, ShieldCheck, CheckCircle, ShieldAlert } from 'lucide-react';

const Awareness = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center">
          <Shield className="w-8 h-8 text-amber-400 mr-3" />
          SECURITY AWARENESS
        </h1>
        <p className="text-slate-500 font-mono tracking-wide">"HOW TO IDENTIFY PHISHING & PROTECT YOURSELF"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="soc-card p-6 md:p-8 flex items-start space-x-6 hover:border-cyan-500/40 group">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/100/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Eye className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center"><span className="text-cyan-400 mr-2 font-mono">01</span> Check the Sender</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Look carefully at the actual email address, not just the display name. Attackers often use domains that look similar to legitimate ones (e.g., security@paypaI.com instead of paypal.com).</p>
            </div>
          </div>

          <div className="soc-card p-6 md:p-8 flex items-start space-x-6 hover:border-rose-500/30 group">
            <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-danger/20 text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <Link className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center"><span className="text-rose-400 mr-2 font-mono">02</span> Inspect the URL</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Hover over links without clicking to see the real destination. Check the real domain before entering credentials. Ensure the site uses HTTPS, though this alone doesn't guarantee safety.</p>
            </div>
          </div>

          <div className="soc-card p-6 md:p-8 flex items-start space-x-6 hover:border-amber-500/30 group">
            <div className="w-14 h-14 rounded-xl bg-amber-500/100/10 border border-warning/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center"><span className="text-amber-400 mr-2 font-mono">03</span> Don't Trust Urgency</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Attackers create panic using threats of account deletion, legal action, or missed deliveries. Legitimate organizations give you time to resolve issues. Always pause and verify.</p>
            </div>
          </div>
          
          <div className="soc-card p-6 md:p-8 flex items-start space-x-6 hover:border-emerald-500/30 group">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/100/10 border border-success/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center"><span className="text-emerald-400 mr-2 font-mono">04</span> Verify Independently</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Never use contact information or links provided in a suspicious message. Open a new browser tab, search for the company, and log in through their official website or app directly.</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="soc-card p-6 bg-gradient-to-b from-[#0b1221] to-[#05080f]">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-2 uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
              Defense Checklist
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Key className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-300">Don't Reuse Passwords</div>
                  <div className="text-xs text-slate-400">Use a password manager for unique keys.</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-300">Enable MFA Everywhere</div>
                  <div className="text-xs text-slate-400">Multi-factor auth stops 99% of attacks.</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-300">Never Share OTPs</div>
                  <div className="text-xs text-slate-400">Codes are for you only. Never give them out.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="soc-card p-6 border-l-4 border-l-danger bg-danger/5">
            <h3 className="text-lg font-bold text-rose-400 mb-2 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2" />
              Critical Rule
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              If an email, text, or caller asks for your password, social security number, or bank details, it is almost certainly a scam. <strong>Stop communication immediately.</strong>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Awareness;



