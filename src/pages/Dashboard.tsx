import { Link } from 'react-router-dom';
import { Shield, Search, Link as LinkIcon, AlertTriangle, ChevronRight, Play, ShieldCheck, Globe, Mail, Activity, Lock, BookOpen, ArrowRight } from 'lucide-react';
import ProfileAvatar from '../components/ProfileAvatar';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-8">
      
      {/* Top Section: Hero + Profile */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Main Hero (Left) */}
        <div className="xl:col-span-8 soc-card p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="space-y-6 max-w-xl">
              <div className="inline-flex items-center space-x-2 bg-cyan-950/50 border border-cyan-500/30 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Cybersecurity Learning Platform</span>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-wide">
                  PHISH<span className="text-cyan-400">GUARD</span>
                </h1>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-300">
                  Phishing Attack & Detection System
                </h2>
                <p className="text-lg font-medium text-cyan-500 mt-2">
                  "Understand the Attack. Detect the Threat. Stay Secure."
                </p>
              </div>
              
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                An interactive cybersecurity platform for learning phishing techniques, analyzing suspicious messages and URLs, and improving security awareness.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/50 rounded-xl px-2 py-2">
                  <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-800">
                    <Play className="w-4 h-4 text-cyan-500 mr-2" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">SIMULATE</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-800">
                    <Search className="w-4 h-4 text-violet-500 mr-2" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">ANALYZE</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-800">
                    <Shield className="w-4 h-4 text-rose-500 mr-2" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">DETECT</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className="flex items-center px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-500/30">
                    <Lock className="w-4 h-4 text-cyan-400 mr-2" />
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">PROTECT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Hero Visualization */}
            <div className="hidden md:flex flex-col items-center justify-center relative w-64 h-64 shrink-0">
              {/* Orbital rings */}
              <div className="absolute inset-0 border border-slate-700/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-dashed border-cyan-500/30 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
              <div className="absolute inset-10 border border-slate-600/30 rounded-full"></div>
              
              {/* Central element */}
              <div className="absolute inset-0 flex items-center justify-center neo-glow-cyan animate-pulse-slow">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/50 flex items-center justify-center backdrop-blur-md">
                  <ShieldCheck className="w-12 h-12 text-cyan-400" />
                </div>
              </div>

              {/* Floating nodes */}
              <div className="absolute top-0 right-10 w-10 h-10 rounded-lg bg-slate-800/80 border border-rose-500/50 flex items-center justify-center neo-glow-red animate-pulse">
                <Mail className="w-5 h-5 text-rose-400" />
              </div>
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-slate-800/80 border border-violet-500/50 flex items-center justify-center neo-glow-violet animate-pulse" style={{ animationDelay: '1s' }}>
                <Globe className="w-5 h-5 text-violet-400" />
              </div>
              <div className="absolute top-1/2 -right-4 w-10 h-10 rounded-lg bg-slate-800/80 border border-blue-500/50 flex items-center justify-center animate-pulse" style={{ animationDelay: '2s' }}>
                <LinkIcon className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile / Creator Card (Right) */}
        <div className="xl:col-span-4 soc-card p-6 flex flex-col relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-900/40 to-transparent"></div>
          
          <div className="flex justify-between items-start relative z-10 mb-6">
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Project Creator</span>
          </div>

          <div className="flex flex-col items-center text-center relative z-10 flex-grow">
            <ProfileAvatar size="xl" className="mb-4" />
            
            <h3 className="text-2xl font-black text-white tracking-wide">Selvi P</h3>
            <p className="text-sm font-semibold text-slate-400 mt-1">Computer Science & Engineering</p>
            <p className="text-xs font-bold text-cyan-400 mt-2 bg-cyan-500/10 px-3 py-1 rounded-full">III CSE C • Agni College of Technology</p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700/50 relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Shield className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-bold text-slate-300 tracking-widest">PHISHGUARD</span>
            </div>
            <p className="text-xs text-center text-slate-500 font-medium">Cybersecurity Learning & Phishing Detection System</p>
            
            <div className="text-center mt-4">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">Designed & Developed by Selvi P</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Attack Simulator */}
        <Link to="/simulator" className="soc-card p-6 flex flex-col group hover:border-cyan-500/50">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
              <AlertTriangle className="w-6 h-6 text-cyan-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Attack Simulator</h3>
          <p className="text-sm text-slate-400 mt-2 mb-6 flex-grow">Learn how phishing attacks work safely with real-world examples and interactive stages.</p>
          <div className="w-full bg-slate-900 border border-slate-700/50 text-slate-300 py-2.5 rounded-lg text-sm font-bold text-center group-hover:bg-cyan-600 group-hover:border-cyan-500 group-hover:text-white transition-all duration-300">
            Start Simulation
          </div>
        </Link>

        {/* 2. Phishing Detector */}
        <Link to="/detector" className="soc-card p-6 flex flex-col group hover:border-violet-500/50">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
              <Search className="w-6 h-6 text-violet-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-violet-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">Phishing Detector</h3>
          <p className="text-sm text-slate-400 mt-2 mb-6 flex-grow">Analyze suspicious messages and emails for social engineering indicators and malicious intent.</p>
          <div className="w-full bg-slate-900 border border-slate-700/50 text-slate-300 py-2.5 rounded-lg text-sm font-bold text-center group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white transition-all duration-300">
            Analyze Message
          </div>
        </Link>

        {/* 3. URL Analyzer */}
        <Link to="/url-analyzer" className="soc-card p-6 flex flex-col group hover:border-blue-500/50">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
              <LinkIcon className="w-6 h-6 text-blue-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">URL Analyzer</h3>
          <p className="text-sm text-slate-400 mt-2 mb-6 flex-grow">Inspect suspicious URLs for deceptive formatting, typosquatting, and malicious routing.</p>
          <div className="w-full bg-slate-900 border border-slate-700/50 text-slate-300 py-2.5 rounded-lg text-sm font-bold text-center group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all duration-300">
            Scan a URL
          </div>
        </Link>

        {/* 4. Security Awareness */}
        <Link to="/awareness" className="soc-card p-6 flex flex-col group hover:border-teal-500/50">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300">
              <Shield className="w-6 h-6 text-teal-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">Security Awareness</h3>
          <p className="text-sm text-slate-400 mt-2 mb-6 flex-grow">Learn the fundamental warning signs of phishing and practical techniques to stay secure.</p>
          <div className="w-full bg-slate-900 border border-slate-700/50 text-slate-300 py-2.5 rounded-lg text-sm font-bold text-center group-hover:bg-teal-600 group-hover:border-teal-500 group-hover:text-white transition-all duration-300">
            Explore Awareness
          </div>
        </Link>
      </div>

      {/* Bottom Section: Progress & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 soc-card p-6 flex flex-col justify-center border-l-4 border-l-cyan-500">
          <div className="flex items-center space-x-4 mb-4">
            <Activity className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Your Progress</h3>
              <p className="text-sm text-slate-400">Track your cybersecurity learning journey</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            <div className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xl font-bold text-white">6</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Scenarios</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xl font-bold text-white">4</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Core Tools</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
              <Search className="w-5 h-5 text-violet-400" />
              <div>
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Local Data</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
              <Lock className="w-5 h-5 text-rose-400" />
              <div>
                <div className="text-xl font-bold text-white">Safe</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Analysis</div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/scenarios" className="soc-card p-6 flex items-center justify-between group hover:border-cyan-500/50 bg-gradient-to-br from-slate-900/80 to-cyan-900/20">
          <div className="space-y-2 max-w-[200px]">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 mb-4">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">Build Your Skills</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Every click you make makes you safer. Start a training scenario.</p>
            <div className="inline-flex items-center text-xs font-bold text-cyan-400 pt-2">
              <span>Let's Go</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <div className="relative w-24 h-24 shrink-0">
             <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent border-r-transparent transform -rotate-45"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-xl font-black text-white">50%</span>
             </div>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default Dashboard;
