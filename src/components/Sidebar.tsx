import { Link, useLocation } from 'react-router-dom';
import { Shield, Activity, Search, Link as LinkIcon, BookOpen, AlertTriangle, Info, Settings, User } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: Activity },
    { to: '/simulator', label: 'Attack Simulator', icon: AlertTriangle },
    { to: '/detector', label: 'Phishing Detector', icon: Search },
    { to: '/url-analyzer', label: 'URL Analyzer', icon: LinkIcon },
    { to: '/scenarios', label: 'Training Scenarios', icon: BookOpen },
    { to: '/awareness', label: 'Security Awareness', icon: Shield },
    { to: '/about', label: 'About Project', icon: Info },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl hidden lg:flex flex-col h-screen sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-slate-800/50 shrink-0">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-cyan-500 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full group-hover:bg-cyan-500/40 transition-colors duration-300"></div>
          </div>
          <div className="text-xl font-black tracking-widest text-slate-100">
            PHISH<span className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">GUARD</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">Core Modules</div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-300 group ${
                isActive 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'} transition-colors`} />
              <span>{item.label}</span>
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="shrink-0 p-4 border-t border-slate-800/50">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">System</div>
        <Link to="/profile" className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname === '/profile' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}>
          <User className={`w-5 h-5 ${location.pathname === '/profile' ? 'text-cyan-400' : 'text-slate-500'} transition-colors`} />
          <span>Profile</span>
        </Link>
        <Link to="/settings" className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname === '/settings' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}>
          <Settings className={`w-5 h-5 ${location.pathname === '/settings' ? 'text-cyan-400' : 'text-slate-500'} transition-colors`} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
