import { useState, useRef, useEffect, useContext } from 'react';
import { SettingsContext } from '../App';
import { Search, Bell, Menu, ShieldCheck, FileCode2, BookOpen, User, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileAvatar from './ProfileAvatar';

const Topbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const { systemAlerts, analysisResults } = useContext(SettingsContext);
  
  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowProfile(false);
        setShowNotifications(false);
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Search logic
  const routes = [
    { name: 'Dashboard', path: '/' },
    { name: 'Attack Simulator', path: '/simulator' },
    { name: 'Phishing Detector', path: '/detector' },
    { name: 'URL Analyzer', path: '/url-analyzer' },
    { name: 'Training Scenarios', path: '/scenarios' },
    { name: 'Security Awareness', path: '/awareness' },
    { name: 'About', path: '/about' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
  ];

  const searchResults = routes.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setShowSearch(false);
    setSearchQuery('');
  };

  return (
    <header className="h-20 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center flex-1">
        <button className="lg:hidden text-slate-400 hover:text-slate-100 p-2 mr-2" aria-label="Toggle Menu">
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Search */}
        <div className="hidden md:block max-w-md w-full relative" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-500 absolute left-4" />
            <input 
              type="text" 
              placeholder="Search PHISHGUARD modules..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => setShowSearch(true)}
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-full pl-12 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              aria-label="Search modules"
            />
          </div>
          
          {/* Search Dropdown */}
          {showSearch && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
              <div className="py-2 max-h-64 overflow-y-auto custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={result.path}
                      onClick={() => handleSearchSelect(result.path)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors flex items-center"
                    >
                      <Search className="w-4 h-4 mr-3 text-slate-500" />
                      {result.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500 text-center italic">
                    No matching PHISHGUARD module found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-400 tracking-wider">SYSTEM ONLINE</span>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-slate-400 hover:text-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full border-2 border-slate-950"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute top-full right-0 mt-4 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">System Notifications</h3>
                <button className="text-xs font-bold text-cyan-500 hover:text-cyan-400">Mark all read</button>
              </div>
              <div className="divide-y divide-slate-800 max-h-80 overflow-y-auto custom-scrollbar">
                
                {systemAlerts && (
                  <div className="px-4 py-3 hover:bg-slate-800/50 transition-colors cursor-default">
                    <div className="flex items-start">
                      <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">System Status</h4>
                        <p className="text-xs text-slate-400 mt-1">PHISHGUARD system is ready and all modules are online.</p>
                        <span className="text-[10px] text-slate-500 mt-2 block">Just now</span>
                      </div>
                    </div>
                  </div>
                )}

                {analysisResults && (
                  <div className="px-4 py-3 hover:bg-slate-800/50 transition-colors cursor-default">
                    <div className="flex items-start">
                      <BookOpen className="w-5 h-5 text-cyan-500 mt-0.5 mr-3 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">Training Available</h4>
                        <p className="text-xs text-slate-400 mt-1">6 interactive training scenarios are ready for testing.</p>
                        <span className="text-[10px] text-slate-500 mt-2 block">2 mins ago</span>
                      </div>
                    </div>
                  </div>
                )}

                {systemAlerts && (
                  <div className="px-4 py-3 hover:bg-slate-800/50 transition-colors cursor-default">
                    <div className="flex items-start">
                      <FileCode2 className="w-5 h-5 text-violet-500 mt-0.5 mr-3 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">Project Environment</h4>
                        <p className="text-xs text-slate-400 mt-1">Project environment is active. Local analysis engine initialized.</p>
                        <span className="text-[10px] text-slate-500 mt-2 block">10 mins ago</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {(!systemAlerts && !analysisResults) && (
                  <div className="px-4 py-6 text-center text-slate-500 text-sm">
                    All notifications are currently disabled.
                  </div>
                )}

              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative pl-6 border-l border-slate-800" ref={profileRef}>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-3 text-left focus:outline-none"
            aria-label="Profile Menu"
          >
            <div className="hidden md:block">
              <div className="text-sm font-bold text-slate-200">Selvi P</div>
              <div className="text-xs font-bold text-cyan-500">III CSE C</div>
            </div>
            <ProfileAvatar size="md" />
          </button>
          
          {showProfile && (
            <div className="absolute top-full right-0 mt-4 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 z-50">
              <div className="px-4 py-4 border-b border-slate-800 bg-slate-900/50">
                <p className="text-sm font-bold text-white">Selvi P</p>
                <p className="text-xs text-cyan-400 font-medium">III CSE C</p>
              </div>
              <div className="py-2">
                <Link 
                  to="/profile" 
                  onClick={() => setShowProfile(false)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4 mr-3 text-slate-500" />
                  View Profile
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setShowProfile(false)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 mr-3 text-slate-500" />
                  About Project
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setShowProfile(false)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4 mr-3 text-slate-500" />
                  Settings
                </Link>
              </div>
              <div className="py-2 border-t border-slate-800">
                <button 
                  onClick={() => setShowProfile(false)}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-rose-400 hover:bg-slate-800 hover:text-rose-300 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out (Demo)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
