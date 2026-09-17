import { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, CheckCircle2, ShieldX, Globe, Terminal, Activity, AlertTriangle, Download } from 'lucide-react';
import { analyzeUrls } from '../services/urlAnalyzer';
import { calculateRiskScore } from '../services/riskScoring';
import { isThreatIntelAvailable } from '../services/threatIntel';
import type { AnalysisResult } from '../types';
import { generateAnalysisReport } from '../services/reportGenerator';

const URLAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | AnalysisResult>(null);
  const [error, setError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleScan = async () => {
    setError('');
    setDownloadSuccess(false);
    
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }
    
    // Basic validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com).');
      return;
    }

    setAnalyzing(true);
    setResult(null);
    
    try {
      // Analyze
      const indicators = await analyzeUrls([url]);
      const res = calculateRiskScore(indicators, isThreatIntelAvailable());
      
      // Delay for UX
      setTimeout(() => {
        setResult(res);
        setAnalyzing(false);
      }, 1500);
      
    } catch (e) {
      setError('Analysis failed due to an unexpected error.');
      setAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    generateAnalysisReport(result, 'URL', `Target URL: ${url}`);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const protocol = url.startsWith('https') ? 'HTTPS' : url.startsWith('http') ? 'HTTP' : 'Unknown';
  let domain = 'Unknown';
  let ipAddress = 'No';
  let subdomains = 0;
  
  try {
    const parsed = new URL(url);
    domain = parsed.hostname;
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) ipAddress = 'Yes';
    const parts = domain.split('.');
    if (!ipAddress && parts.length > 2) {
      subdomains = parts.length - 2; // Rough estimate
      if (domain.includes('co.uk') || domain.includes('com.au')) subdomains = parts.length - 3;
      if (subdomains < 0) subdomains = 0;
    }
  } catch(e) {}

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center">
          <Globe className="w-8 h-8 text-blue-400 mr-3" />
          URL SECURITY SCANNER
        </h1>
        <p className="text-slate-500 font-mono tracking-wide">"Scan individual URLs for malicious patterns, domains, and deceptive routing."</p>
      </div>

      <div className="soc-card p-6 md:p-10 border-t-2 border-t-secondary/50 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Terminal className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              className="input-field pl-12 font-mono text-lg bg-slate-900/80" 
              placeholder="Enter suspicious URL (e.g., https://example.com/login)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            />
          </div>
          <button 
            onClick={handleScan}
            disabled={analyzing || !url}
            className="btn-secondary py-3.5 md:w-auto w-full whitespace-nowrap text-lg shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            {analyzing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                <span>SCANNING...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>INITIATE SCAN</span>
              </div>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 text-rose-400 text-sm font-bold flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
      </div>

      {analyzing && (
        <div className="soc-card p-12 flex flex-col items-center justify-center space-y-6">
          <Activity className="w-12 h-12 text-blue-400 animate-pulse" />
          <div className="relative w-full max-w-lg h-1.5 bg-gray-900 rounded overflow-hidden">
            <div className="scan-line bg-secondary shadow-[0_0_15px_rgba(16,185,129,1)]" style={{ animation: 'scan 2s linear infinite', height: '100%', width: '30%', left: '-30%' }}></div>
            <style>{`@keyframes scan { 0% { left: -30%; } 100% { left: 100%; } }`}</style>
          </div>
          <div className="font-mono text-sm text-blue-400/80 flex flex-col items-center space-y-1">
            <span>Resolving DNS records...</span>
            <span className="opacity-70">Analyzing URL structure...</span>
            <span className="opacity-40">Checking reputation databases...</span>
          </div>
        </div>
      )}

      {result && !analyzing && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in slide-in-from-bottom-8 duration-500">
          
          {/* Main Result Card */}
          <div className="md:col-span-5 soc-card p-8 border-t-4 border-t-danger space-y-8 flex flex-col relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[60px] pointer-events-none ${
              result.level.includes('HIGH') || result.level.includes('CRITICAL') ? 'bg-rose-500/10' :
              result.level.includes('MEDIUM') ? 'bg-amber-500/100/10' : 'bg-emerald-500/100/10'
            }`}></div>
            
            <div className="relative z-10 space-y-6 flex-grow flex flex-col justify-center">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider flex items-center space-x-2 border shadow-lg ${
                  result.level.includes('HIGH') || result.level.includes('CRITICAL') ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-danger/20' :
                  result.level.includes('MEDIUM') ? 'bg-warning/20 text-amber-400 border-warning/50' : 'bg-emerald-500/100/20 text-emerald-400 border-success/50'
                }`}>
                  {result.level.includes('LOW') ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                  <span>{result.level}</span>
                </div>
                <div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Calculated Risk Score</div>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-8xl font-black tracking-tighter ${
                      result.level.includes('HIGH') || result.level.includes('CRITICAL') ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                      result.level.includes('MEDIUM') ? 'text-amber-400' : 'text-emerald-400'
                    }`}>{result.score}</span>
                    <span className="text-3xl text-slate-400 font-bold ml-1">/100</span>
                  </div>
                </div>
              </div>

              {!result.threatIntelAvailable && (
                 <div className="bg-gray-800/50 border border-slate-600/50 text-slate-500 px-4 py-2 rounded text-xs text-center">
                   External threat intelligence is currently unavailable. Local analysis applied.
                 </div>
              )}
              
              <div className="pt-4 flex justify-center flex-col items-center space-y-2">
                <button onClick={handleDownload} className="text-xs flex items-center space-x-2 text-blue-400 hover:text-white bg-blue-500/100/10 px-4 py-2 rounded transition-colors border border-blue-300">
                  <Download className="w-4 h-4" />
                  <span className="font-bold tracking-wider uppercase">DOWNLOAD REPORT</span>
                </button>
                {downloadSuccess && (
                  <span className="text-emerald-400 text-xs font-bold transition-opacity animate-in fade-in">Downloaded successfully!</span>
                )}
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="md:col-span-7 soc-card p-8 space-y-6 flex flex-col">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center border-b border-slate-700/50 pb-3">
              <Terminal className="w-5 h-5 mr-2 text-blue-400" />
              Analysis Log
            </h2>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              {[
                { label: 'Protocol Security', value: protocol, isDanger: protocol !== 'HTTPS' },
                { label: 'Extracted Domain', value: domain, isMono: true },
                { label: 'IP Address Usage', value: ipAddress, isDanger: ipAddress === 'Yes' },
                { label: 'Subdomains Count', value: subdomains.toString(), isWarning: subdomains > 1 },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  <span className="text-slate-500 text-sm font-medium">{item.label}</span>
                  <span className={`text-sm ${
                    item.isDanger ? 'text-rose-400 font-bold flex items-center' : 
                    item.isWarning ? 'text-amber-400 font-bold flex items-center' : 
                    item.isMono ? 'font-mono text-slate-300' : 'text-emerald-400 font-bold flex items-center'
                  }`}>
                    {item.isDanger && <ShieldX className="w-4 h-4 mr-1" />}
                    {item.isWarning && <AlertTriangle className="w-4 h-4 mr-1" />}
                    {!item.isDanger && !item.isWarning && !item.isMono && <CheckCircle2 className="w-4 h-4 mr-1" />}
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex-grow">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700/50 pb-2 mb-4">Detected Indicators</h3>
              
              {result.indicators.length === 0 ? (
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-center">
                  <p className="text-slate-500 text-sm">No specific threats matched by the engine.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {result.indicators.map((ind, i) => (
                    <div key={i} className="flex flex-col bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                      <div className="flex items-start space-x-3 mb-2">
                        <ShieldX className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> 
                        <span className="text-slate-300 font-bold text-sm">{ind.label}</span>
                      </div>
                      <p className="text-xs text-slate-500 pl-7">{ind.evidence}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLAnalyzer;



