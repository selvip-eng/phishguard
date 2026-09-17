import { useContext } from 'react';
import { SettingsContext } from '../App';
import { Monitor, Moon, Sun, MonitorPlay, Bell, Layout } from 'lucide-react';

const Settings = () => {
  const { 
    theme, setTheme,
    presentationMode, setPresentationMode,
    compactLayout, setCompactLayout,
    reduceAnimations, setReduceAnimations,
    systemAlerts, setSystemAlerts,
    analysisResults, setAnalysisResults
  } = useContext(SettingsContext);

  const Switch = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${enabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
    >
      <span className="sr-only">Toggle setting</span>
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="border-b border-slate-800 pb-6 mb-8">
        <h1 className="text-3xl font-black text-white tracking-wide">System Settings</h1>
        <p className="text-slate-400 mt-2 font-medium">Configure your PHISHGUARD environment preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Presentation Mode */}
        <div className="soc-card p-6 md:col-span-2 border-cyan-500/30 bg-cyan-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4 cursor-pointer" onClick={() => setPresentationMode(!presentationMode)}>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <MonitorPlay className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Presentation Mode</h2>
              </div>
              <p className="text-sm text-slate-300 max-w-xl">
                Optimizes the UI for classroom projectors. Increases important text readability, improves contrast, and reduces decorative elements.
              </p>
            </div>
            
            <button 
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${presentationMode ? 'bg-cyan-500' : 'bg-slate-700'}`}
            >
              <span className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${presentationMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="soc-card p-6">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
            <Monitor className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-bold text-white">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-700/50 bg-slate-900/50 text-slate-400 hover:border-cyan-500/50'}`}
              >
                <Moon className="w-5 h-5 mb-2" />
                <span className="text-xs font-bold">Dark</span>
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-700/50 bg-slate-900/50 text-slate-400 hover:border-cyan-500/50'}`}
              >
                <Sun className="w-5 h-5 mb-2" />
                <span className="text-xs font-bold">Light</span>
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-700/50 bg-slate-900/50 text-slate-400 hover:border-cyan-500/50'}`}
              >
                <Monitor className="w-5 h-5 mb-2" />
                <span className="text-xs font-bold">System</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interface */}
        <div className="soc-card p-6">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
            <Layout className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-bold text-white">Interface</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center cursor-pointer group" onClick={() => setCompactLayout(!compactLayout)}>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">Compact Layout</h3>
                <p className="text-xs text-slate-400">Reduce spacing between elements</p>
              </div>
              <Switch enabled={compactLayout} onChange={() => {}} />
            </div>
            
            <div className="flex justify-between items-center cursor-pointer group" onClick={() => setReduceAnimations(!reduceAnimations)}>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">Reduce Animations</h3>
                <p className="text-xs text-slate-400">Disable non-essential motion</p>
              </div>
              <Switch enabled={reduceAnimations} onChange={() => {}} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="soc-card p-6">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
            <Bell className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-bold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center cursor-pointer group" onClick={() => setSystemAlerts(!systemAlerts)}>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">System Alerts</h3>
                <p className="text-xs text-slate-400">Important status updates</p>
              </div>
              <Switch enabled={systemAlerts} onChange={() => {}} />
            </div>
            
            <div className="flex justify-between items-center cursor-pointer group" onClick={() => setAnalysisResults(!analysisResults)}>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">Analysis Results</h3>
                <p className="text-xs text-slate-400">Notify when scan completes</p>
              </div>
              <Switch enabled={analysisResults} onChange={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
