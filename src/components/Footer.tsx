import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 py-8 border-t border-slate-800/50 bg-transparent">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-slate-500" />
          <span className="text-sm font-bold tracking-widest text-slate-400">
            PHISH<span className="text-slate-500">GUARD</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>Cybersecurity Learning</span>
          <span className="text-slate-700">•</span>
          <span>Detection</span>
          <span className="text-slate-700">•</span>
          <span>Awareness</span>
        </div>
        
        <div className="text-xs font-bold text-slate-500">
          Designed & Developed by <span className="text-cyan-500">Selvi P</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
