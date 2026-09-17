import { useState, useRef } from 'react';
import { Search, AlertTriangle, ShieldCheck, Download, Link as LinkIcon, FileText, Activity, Cpu, Upload, Trash2, XCircle } from 'lucide-react';
import type { EmailData, AnalysisResult } from '../types';
import { analyzeEmailAsync } from '../services/emailAnalyzer';
import { generateAnalysisReport } from '../services/reportGenerator';

const PhishingDetector = () => {
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | AnalysisResult>(null);
  const [error, setError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [inputData, setInputData] = useState<EmailData>({ 
    sender: 'security@example.com', 
    replyTo: '',
    subject: 'Urgent: Verify your account', 
    body: 'Dear User,\n\nYour account has been flagged for unusual activity. Please verify your account immediately to prevent permanent restrictions.\n\nFailure to act within 24 hours will result in account suspension.\n\nClick here: https://security-training.example.com/account/verify'
  });

  const [fileContent, setFileContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setInputData({ sender: '', replyTo: '', subject: '', body: '' });
    setFileContent('');
    setFileName('');
    setResult(null);
    setError('');
    setDownloadSuccess(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.eml') && !file.name.endsWith('.txt')) {
      setError('Unable to parse this email file. Please upload a valid .eml or .txt file.');
      return;
    }

    setFileName(file.name);
    setError('');
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFileContent(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    setError('');
    setDownloadSuccess(false);
    
    if (activeTab === 'paste') {
      if (!inputData.sender && !inputData.body && !inputData.subject) {
        setError('Please enter a message or upload an .eml file.');
        return;
      }
    } else {
      if (!fileContent) {
        setError('Please enter a message or upload an .eml file.');
        return;
      }
    }

    setAnalyzing(true);
    setResult(null);
    
    try {
      const analysis = activeTab === 'paste' 
        ? await analyzeEmailAsync(inputData) 
        : await analyzeEmailAsync(fileContent);
        
      setResult(analysis);
    } catch (err) {
      setError('Failed to analyze the input. Please ensure it is a valid format.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    let summary = '';
    if (result.redactedInput) {
      summary = `Sender: ${result.redactedInput.sender}\nSubject: ${result.redactedInput.subject}\nBody preview: ${result.redactedInput.body}`;
    }
    generateAnalysisReport(result, 'Email', summary);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center">
          <Activity className="w-8 h-8 text-cyan-400 mr-3" />
          SOC ANALYSIS WORKSPACE
        </h1>
        <p className="text-slate-500 font-mono tracking-wide">"Analyze an email, message, or suspicious content for phishing indicators."</p>
      </div>

      <div className="soc-card overflow-hidden border-t-2 border-t-primary/50">
        <div className="flex border-b border-slate-700/50 bg-[#080d1a]">
          <button 
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center space-x-2 ${activeTab === 'paste' ? 'bg-cyan-500/100/10 text-cyan-400 border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/80/5'}`}
          >
            <FileText className="w-5 h-5" />
            <span>PASTE EMAIL</span>
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center space-x-2 ${activeTab === 'upload' ? 'bg-cyan-500/100/10 text-cyan-400 border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/80/5'}`}
          >
            <Upload className="w-5 h-5" />
            <span>UPLOAD .EML</span>
          </button>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-5 relative flex flex-col h-full">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent hidden lg:block"></div>
              
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Cpu className="w-5 h-5 text-cyan-400 mr-2" />
                  Input Telemetry
                </h3>
                <button onClick={handleClear} className="text-slate-500 hover:text-rose-400 text-sm flex items-center space-x-1 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span>CLEAR ANALYSIS</span>
                </button>
              </div>
              
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-2 rounded flex items-center space-x-2 text-sm">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                {activeTab === 'paste' ? (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sender (From)</label>
                      <input 
                        type="text" 
                        className="input-field font-mono text-sm" 
                        value={inputData.sender} 
                        onChange={e => setInputData({...inputData, sender: e.target.value})}
                        placeholder="e.g. security@paypal.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reply-To (Optional)</label>
                      <input 
                        type="text" 
                        className="input-field font-mono text-sm" 
                        value={inputData.replyTo || ''} 
                        onChange={e => setInputData({...inputData, replyTo: e.target.value})}
                        placeholder="e.g. scammer@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                      <input 
                        type="text" 
                        className="input-field text-sm" 
                        value={inputData.subject}
                        onChange={e => setInputData({...inputData, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Body (Including URLs)</label>
                      <textarea 
                        className="input-field h-40 resize-none text-sm leading-relaxed font-mono"
                        value={inputData.body}
                        onChange={e => setInputData({...inputData, body: e.target.value})}
                        placeholder="Paste the suspicious email text here..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-slate-600/50 rounded-xl bg-slate-800/50 hover:bg-slate-800/50 transition-colors">
                    {!fileName ? (
                      <div className="text-center space-y-4 p-8">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                        <div>
                          <p className="text-slate-400 font-medium">Drag and drop an .eml file here</p>
                          <p className="text-slate-400 text-sm mt-1">or click to browse from your computer</p>
                        </div>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-slate-600/50 text-sm font-medium transition-colors"
                        >
                          Select File
                        </button>
                      </div>
                    ) : (
                      <div className="text-center space-y-4 p-8 w-full">
                        <FileText className="w-12 h-12 text-cyan-400 mx-auto" />
                        <div>
                          <p className="text-white font-medium break-all">{fileName}</p>
                          <p className="text-emerald-400 text-sm mt-1">File loaded successfully</p>
                        </div>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-slate-600/50 text-sm font-medium transition-colors"
                        >
                          Change File
                        </button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept=".eml,.txt" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                  </div>
                )}
              </div>
              
              <div className="pt-6">
                <button 
                  onClick={handleAnalyze} 
                  disabled={analyzing}
                  className="btn-primary w-full py-4 text-lg"
                >
                  {analyzing ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                      <span>ANALYZING THREAT LOGIC...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>INITIALIZE DETECTION</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Results Area */}
            <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 p-6 relative overflow-hidden flex flex-col min-h-[600px]">
              
              {!analyzing && !result && (
                <div className="text-center text-slate-400 space-y-4 m-auto">
                  <Activity className="w-16 h-16 mx-auto opacity-20" />
                  <p className="font-mono text-sm uppercase tracking-widest">Engine Standby</p>
                  <p className="text-xs">Awaiting telemetry input for heuristic analysis.</p>
                </div>
              )}

              {analyzing && (
                <div className="flex flex-col items-center justify-center space-y-8 z-10 m-auto w-full">
                  <div className="relative w-full max-w-sm h-1 bg-gray-900 rounded overflow-hidden">
                    <div className="scan-line bg-primary shadow-[0_0_15px_rgba(6,182,212,1)]" style={{ animation: 'scan 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite', height: '100%', width: '50%', left: '-50%' }}></div>
                    <style>{`@keyframes scan { 0% { left: -50%; } 100% { left: 100%; } }`}</style>
                  </div>
                  
                  <div className="terminal-panel w-full max-w-sm border-cyan-500/40 text-cyan-400 bg-primary/5 text-xs">
                    <p className="animate-pulse">&gt; Parsing MIME structure...</p>
                    <p className="animate-pulse" style={{ animationDelay: '0.3s' }}>&gt; Extracting authentication headers...</p>
                    <p className="animate-pulse" style={{ animationDelay: '0.6s' }}>&gt; Scanning lexical parameters...</p>
                    <p className="animate-pulse" style={{ animationDelay: '0.9s' }}>&gt; Checking URL reputation...</p>
                    <p className="animate-pulse" style={{ animationDelay: '1.2s' }}>&gt; Calculating threat probability...</p>
                  </div>
                </div>
              )}

              {result && !analyzing && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500 absolute inset-0 p-6 overflow-y-auto">
                  <div className="flex flex-col gap-4">
                    {/* Score Card */}
                    <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg ${
                      result.level === 'CRITICAL RISK' ? 'bg-[#1a0f14] border-danger shadow-danger/20' :
                      result.level === 'HIGH RISK' ? 'bg-[#1a0f14] border-rose-500/40 shadow-danger/10' :
                      result.level === 'MEDIUM RISK' ? 'bg-warning/5 border-warning/50' :
                      'bg-success/5 border-success/50'
                    }`}>
                      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] pointer-events-none ${
                        result.level.includes('CRITICAL') || result.level.includes('HIGH') ? 'bg-rose-500/10' :
                        result.level.includes('MEDIUM') ? 'bg-amber-500/100/10' : 'bg-emerald-500/100/10'
                      }`}></div>
                      
                      <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-3">RISK ASSESSMENT</h3>
                      
                      <div className={`inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full font-bold text-sm mb-4 border ${
                        result.level === 'CRITICAL RISK' ? 'bg-danger/30 border-danger text-white pulse-warning' :
                        result.level === 'HIGH RISK' ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' :
                        result.level === 'MEDIUM RISK' ? 'bg-warning/20 border-warning/50 text-amber-400' :
                        'bg-emerald-500/100/20 border-success/50 text-emerald-400'
                      }`}>
                        {result.level.includes('LOW') ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        <span>{result.level}</span>
                      </div>
                      
                      <div className="flex items-baseline justify-center">
                        <span className={`text-7xl font-black tracking-tighter ${
                          result.level.includes('CRITICAL') || result.level.includes('HIGH') ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                          result.level.includes('MEDIUM') ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {result.score}
                        </span>
                        <span className="text-2xl text-slate-400 font-bold ml-1">/100</span>
                      </div>
                      
                      <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-wider max-w-xs mx-auto">
                        This is a risk assessment based on available evidence, not a definitive guarantee.
                      </p>
                    </div>

                    {!result.threatIntelAvailable && (
                       <div className="bg-gray-800/50 border border-slate-600/50 text-slate-500 px-4 py-2 rounded text-xs text-center">
                         External threat intelligence is currently unavailable. Local analysis applied.
                       </div>
                    )}
                  </div>
                  
                  {/* Indicators List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Detected Indicators ({result.indicators.length})</h3>
                    </div>
                    
                    {result.indicators.length === 0 ? (
                      <div className="bg-emerald-500/100/10 border border-emerald-500/30 rounded-lg p-6 text-center space-y-2">
                        <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                        <h4 className="text-emerald-400 font-bold">No Major Threats Detected</h4>
                        <p className="text-sm text-slate-500">However, always remain cautious and verify senders independently.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {result.indicators.map((ind: any, i: number) => (
                          <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 hover:border-gray-600 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="mt-0.5 shrink-0">
                                {(ind.type === 'urgency' || ind.type === 'impersonation') && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                                {(ind.type === 'link' || ind.type === 'auth') && <LinkIcon className="w-4 h-4 text-rose-400" />}
                                {(ind.type === 'credential' || ind.type === 'threat' || ind.type === 'mismatch' || ind.type === 'threat_intel') && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                                {ind.type === 'financial' && <Activity className="w-4 h-4 text-amber-400" />}
                              </div>
                              <div className="space-y-3 text-sm w-full">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-bold text-slate-300">{ind.label}</h4>
                                  <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/50">+{ind.score} pts</span>
                                </div>
                                
                                <div className="bg-slate-900/80 rounded p-2.5 border border-slate-700/50/50">
                                  <span className="font-bold text-slate-500 text-xs uppercase block mb-1">Evidence:</span> 
                                  <p className="text-slate-400 font-mono text-xs break-all">{ind.evidence}</p>
                                </div>
                                
                                <div className="bg-slate-900/80 rounded p-2.5 border border-slate-700/50/50">
                                  <span className="font-bold text-slate-500 text-xs uppercase block mb-1">Why it matters:</span> 
                                  <p className="text-slate-400">{ind.explanation}</p>
                                </div>
                                
                                <div className="bg-primary/5 rounded p-2.5 border border-primary/10">
                                  <span className="font-bold text-cyan-400/80 text-xs uppercase block mb-1">Security Recommendation:</span> 
                                  <p className="text-cyan-400/90">{ind.action}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {result.indicators.length > 0 && (
                     <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50 mt-4">
                       <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Overall Recommendation</h4>
                       <p className="text-sm text-slate-400 leading-relaxed">
                         Based on the detection of {result.indicators.length} risk indicators, it is highly recommended to <strong className="text-white">NOT click any links or provide credentials</strong>. Verify the sender using an independent trusted channel. Do not reply to the email.
                       </p>
                     </div>
                  )}

                  <div className="pt-4 border-t border-slate-700/50 flex justify-center flex-col items-center space-y-2">
                    <button onClick={handleDownload} className="text-xs flex items-center space-x-2 text-cyan-400 hover:text-white bg-cyan-500/100/10 px-4 py-2 rounded transition-colors border border-cyan-500/40">
                      <Download className="w-4 h-4" />
                      <span className="font-bold tracking-wider uppercase">DOWNLOAD REPORT</span>
                    </button>
                    {downloadSuccess && (
                      <span className="text-emerald-400 text-xs font-bold transition-opacity animate-in fade-in">Downloaded successfully!</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingDetector;



