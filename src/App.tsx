import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Dashboard from './pages/Dashboard';
import AttackSimulator from './pages/AttackSimulator';
import PhishingDetector from './pages/PhishingDetector';
import URLAnalyzer from './pages/URLAnalyzer';
import TrainingScenarios from './pages/TrainingScenarios';
import Awareness from './pages/Awareness';
import About from './pages/About';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export type ThemeType = 'dark' | 'light' | 'system';

interface SettingsState {
  theme: ThemeType;
  setTheme: (val: ThemeType) => void;
  presentationMode: boolean;
  setPresentationMode: (val: boolean) => void;
  compactLayout: boolean;
  setCompactLayout: (val: boolean) => void;
  reduceAnimations: boolean;
  setReduceAnimations: (val: boolean) => void;
  systemAlerts: boolean;
  setSystemAlerts: (val: boolean) => void;
  analysisResults: boolean;
  setAnalysisResults: (val: boolean) => void;
}

export const SettingsContext = createContext<SettingsState>({
  theme: 'dark',
  setTheme: () => {},
  presentationMode: false,
  setPresentationMode: () => {},
  compactLayout: false,
  setCompactLayout: () => {},
  reduceAnimations: false,
  setReduceAnimations: () => {},
  systemAlerts: true,
  setSystemAlerts: () => {},
  analysisResults: true,
  setAnalysisResults: () => {}
});

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  // Read from localStorage with defaults
  const [theme, setTheme] = useState<ThemeType>(() => (localStorage.getItem('phishguard_theme') as ThemeType) || 'dark');
  const [presentationMode, setPresentationMode] = useState(() => localStorage.getItem('phishguard_presentation_mode') === 'true');
  const [compactLayout, setCompactLayout] = useState(() => localStorage.getItem('phishguard_compact_layout') === 'true');
  const [reduceAnimations, setReduceAnimations] = useState(() => localStorage.getItem('phishguard_reduce_animations') === 'true');
  const [systemAlerts, setSystemAlerts] = useState(() => localStorage.getItem('phishguard_system_alerts') !== 'false');
  const [analysisResults, setAnalysisResults] = useState(() => localStorage.getItem('phishguard_analysis_results') !== 'false');

  // Apply Settings globally to body classes
  useEffect(() => {
    localStorage.setItem('phishguard_theme', theme);
    localStorage.setItem('phishguard_presentation_mode', String(presentationMode));
    localStorage.setItem('phishguard_compact_layout', String(compactLayout));
    localStorage.setItem('phishguard_reduce_animations', String(reduceAnimations));
    localStorage.setItem('phishguard_system_alerts', String(systemAlerts));
    localStorage.setItem('phishguard_analysis_results', String(analysisResults));

    const body = document.body;

    // Theme logic
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }

    // Presentation mode
    if (presentationMode) body.classList.add('presentation-mode');
    else body.classList.remove('presentation-mode');

    // Compact layout
    if (compactLayout) body.classList.add('compact-layout');
    else body.classList.remove('compact-layout');

    // Reduce animations
    if (reduceAnimations) body.classList.add('reduce-animations');
    else body.classList.remove('reduce-animations');
    
  }, [theme, presentationMode, compactLayout, reduceAnimations, systemAlerts, analysisResults]);

  return (
    <SettingsContext.Provider value={{
      theme, setTheme,
      presentationMode, setPresentationMode,
      compactLayout, setCompactLayout,
      reduceAnimations, setReduceAnimations,
      systemAlerts, setSystemAlerts,
      analysisResults, setAnalysisResults
    }}>
      <Router>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        
        <div className={`app-container flex h-screen overflow-hidden text-slate-200 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
          <Sidebar />
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <Topbar />
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
              <div className="main-content-wrapper max-w-7xl mx-auto w-full flex flex-col">
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/simulator" element={<AttackSimulator />} />
                    <Route path="/detector" element={<PhishingDetector />} />
                    <Route path="/url-analyzer" element={<URLAnalyzer />} />
                    <Route path="/scenarios" element={<TrainingScenarios />} />
                    <Route path="/awareness" element={<Awareness />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </Router>
    </SettingsContext.Provider>
  );
}

export default App;
