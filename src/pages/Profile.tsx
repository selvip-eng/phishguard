import { Shield, BookOpen, Search, Lock, Mail, Server } from 'lucide-react';
import ProfileAvatar from '../components/ProfileAvatar';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="soc-card p-8 md:p-12 relative overflow-hidden mt-8">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/50 border border-cyan-500/30 px-4 py-1.5 rounded-full mb-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Project Creator</span>
          </div>

          <ProfileAvatar size="xl" className="border-4 border-slate-900 ring-2 ring-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-2" />

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-wide">Selvi P</h1>
            <p className="text-xl font-bold text-cyan-400">Computer Science & Engineering</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="bg-slate-900/80 border border-slate-700/50 px-6 py-2 rounded-xl text-sm font-bold text-slate-300">
              Class: <span className="text-white ml-1">III CSE C</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/50 px-6 py-2 rounded-xl text-sm font-bold text-slate-300">
              College: <span className="text-white ml-1">Agni College of Technology</span>
            </div>
          </div>

          <div className="w-full max-w-2xl border-t border-slate-800 mt-8 pt-8">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Development Focus</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <Search className="w-5 h-5 text-violet-400 mb-2" />
                <h3 className="font-bold text-slate-200 text-sm mb-1">Threat Detection</h3>
                <p className="text-xs text-slate-500 font-medium">Algorithmic phishing email analysis</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <Lock className="w-5 h-5 text-rose-400 mb-2" />
                <h3 className="font-bold text-slate-200 text-sm mb-1">Security Architecture</h3>
                <p className="text-xs text-slate-500 font-medium">Privacy-first local processing</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <Server className="w-5 h-5 text-blue-400 mb-2" />
                <h3 className="font-bold text-slate-200 text-sm mb-1">URL Analysis</h3>
                <p className="text-xs text-slate-500 font-medium">Domain reputation scoring</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <Mail className="w-5 h-5 text-amber-400 mb-2" />
                <h3 className="font-bold text-slate-200 text-sm mb-1">Social Engineering</h3>
                <p className="text-xs text-slate-500 font-medium">Indicator extraction & parsing</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <BookOpen className="w-5 h-5 text-cyan-400 mb-2" />
                <h3 className="font-bold text-slate-200 text-sm mb-1">Interactive Learning</h3>
                <p className="text-xs text-slate-500 font-medium">Educational cyber-labs</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-center items-center text-center">
                <Shield className="w-6 h-6 text-emerald-400 mb-2" />
                <h3 className="font-bold text-white text-sm">PHISHGUARD</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
