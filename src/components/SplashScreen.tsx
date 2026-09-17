import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030712] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <div className="relative mb-6">
          <Shield className="w-24 h-24 text-cyan-500 relative z-10 animate-pulse" />
          <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
        </div>
        
        <h1 className="text-5xl font-black tracking-widest text-white mb-3">
          PHISH<span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">GUARD</span>
        </h1>
        <p className="text-lg font-bold text-slate-300 tracking-widest uppercase mb-16">
          Phishing Attack & Detection System
        </p>

        <div className="flex flex-col items-center space-y-4 border-t border-slate-800 pt-8">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Designed & Developed By</p>
          <div className="flex items-center space-x-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
            <ProfileAvatar size="md" />
            <div className="text-left">
              <h2 className="text-lg font-black text-white leading-tight">Selvi P</h2>
              <p className="text-xs font-bold text-cyan-400">Computer Science & Engineering</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Agni College of Technology</p>
            </div>
          </div>
          <div className="mt-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
            Project Activity / Cybersecurity
          </div>
        </div>
        
        {/* Loading bar */}
        <div className="w-64 h-1 bg-slate-900 rounded-full mt-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-cyan-500 w-full origin-left animate-[scale-x_2.5s_ease-in-out]"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
