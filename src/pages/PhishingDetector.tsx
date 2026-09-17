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

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    
    // Auto-parse if they pasted full headers
    let newSender = inputData.sender;
    let newSubject = inputData.subject;
    let newReplyTo = inputData.replyTo;
    
    // Simple regex for extracting basic headers from raw paste
    const fromMatch = text.match(/^From:\s*(.+)$/im);
    const subjectMatch = text.match(/^Subject:\s*(.+)$/im);
    const replyToMatch = text.match(/^Reply-To:\s*(.+)$/im);
    
    if (fromMatch && !inputData.sender) newSender = fromMatch[1].trim();
    if (subjectMatch && !inputData.subject) newSubject = subjectMatch[1].trim();
    if (replyToMatch && !inputData.replyTo) newReplyTo = replyToMatch[1].trim();

    setInputData({
      ...inputData,
      body: text,
      sender: newSender,
      subject: newSubject,
      replyTo: newReplyTo
    });
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
        <p className="text-slate-400 font-mono tracking-wide">"Analyze an email, message, or suspicious content for phishing indicators."</p>
      </div>

      <div className="soc-card overflow-hidden border-t-2 border-t-cyan-500/50">
        <div className="flex border-b border-slate-700/50 bg-slate-950/80">
          <button 
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center space-x-2 ${activeTab === 'paste' ? 'bg-cyan-500/10 text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}`}
          >
            <FileText className="w-5 h-5" />
            <span>PASTE EMAIL</span>
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center space-x-2 ${activeTab === 'upload' ? 'bg-cyan-500/10 text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}`}
          >
            <Upload className="w-5 h-5" />
            <span>UPLOAD .EML</span>
          </button>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-5 relative flex flex-col h-full">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/50 to-transparent hidden lg:block"></div>
              
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
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sender (From)</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono text-sm" 
                        value={inputData.sender} 
                        onChange={e => setInputData({...inputData, sender: e.target.value})}
                        placeholder="e.g. security@paypal.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reply-To (Optional)</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono text-sm" 
                        value={inputData.replyTo || ''} 
                        onChange={e => setInputData({...inputData, replyTo: e.target.value})}
                        placeholder="e.g. scammer@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50 text-sm" 
                        value={inputData.subject}
                        onChange={e => setInputData({...inputData, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Email Body (Including URLs)</label>
                      </div>
                      <p className="text-xs text-slate-500 mb-3 border-l-2 border-cyan-500/50 pl-2">
                        You can paste the entire email including From, To, Subject, message body and URLs. PHISHGUARD will extract the available indicators automatically.
                      </p>
                      <textarea 
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 h-56 resize-none text-sm leading-relaxed font-mono custom-scrollbar"
                        value={inputData.body}
                        onChange={handleBodyChange}
                        placeholder="Paste the complete suspicious email here..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-slate-600/50 rounded-xl bg-slate-800/20 hover:bg-slate-800/50 transition-colors">
                    {!fileName ? (
                      <div className="text-center space-y-4 p-8">
                        <Upload className="w-12 h-12 text-slate-500 mx-auto" />
                        <div>
                          <p className="text-slate-300 font-medium">Drag and drop an .eml file here</p>
                          <p className="text-slate-500 text-sm mt-1">or click to browse from your computer</p>
                        </div>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600/50 text-sm font-medium transition-colors text-slate-200"
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
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600/50 text-sm font-medium transition-colors text-slate-200"
                        >
                          Change File
                        </button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".eml,.txt"
                      className="hidden" 
                    />
                  </div>
                )}
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:shadow-none flex items-center justify-center space-x-2 group mt-4"
              >
                {analyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                    <span>ANALYZING THREATS...</span>
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>INITIALIZE DETECTION</span>
                  </>
                )}
              </button>
            </div>

            {/* Analysis Results Panel */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-700/50 relative overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${result ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`}></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analysis Engine</span>
                </div>
                {analyzing && (
                  <span className="text-xs text-cyan-400 font-mono animate-pulse">PROCESSING TELEMETRY...</span>
                )}
              </div>

              {!result && !analyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4 p-8">
                  <Activity className="w-16 h-16 opacity-20" />
                  <p className="text-sm uppercase tracking-widest font-bold">Engine Standby</p>
                  <p className="text-xs text-center max-w-xs opacity-60">Awaiting telemetry input for heuristic analysis.</p>
                </div>
              ) : analyzing ? (
                <div className="flex-1 p-8 text-cyan-500 font-mono text-sm overflow-hidden flex flex-col justify-end">
                  <div className="space-y-2 opacity-70">
                    <p>&gt; Initializing security sandbox...</p>
                    <p>&gt; Parsing email headers...</p>
                    <p>&gt; Extracting indicator strings...</p>
                    <p>&gt; Analyzing linguistic patterns...</p>
                    <p>&gt; Checking domain reputation...</p>
                    <p className="animate-pulse">&gt; Evaluating risk score...</p>
                  </div>
                </div>
              ) : result && (
                <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar animate-in fade-in z-10">
                  
                  {/* Risk Score Header */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="soc-card flex-1 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] ${
                        result.level.includes('CRITICAL') || result.level.includes('HIGH') ? 'bg-rose-500/20' :
                        result.level.includes('MEDIUM') ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                      }`}></div>
                      
                      <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-3 z-10">RISK ASSESSMENT</h3>
                      
                      <div className={`z-10 inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full font-bold text-sm mb-4 border ${
                        result.level === 'CRITICAL RISK' ? 'bg-rose-500/20 border-rose-500 text-rose-400' :
                        result.level === 'HIGH RISK' ? 'bg-rose-500/10 border-rose-500/50 text-rose-400' :
                        result.level === 'MEDIUM RISK' ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' :
                        'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                      }`}>
                        {result.level.includes('LOW') ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        <span>{result.level}</span>
                      </div>
                      
                      <div className="z-10 flex items-baseline justify-center">
                        <span className={`text-7xl font-black tracking-tighter ${
                          result.level.includes('CRITICAL') || result.level.includes('HIGH') ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                          result.level.includes('MEDIUM') ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {result.score}
                        </span>
                        <span className="text-2xl text-slate-500 font-bold ml-1">/100</span>
                      </div>
                    </div>

                    {!result.threatIntelAvailable && (
                       <div className="bg-slate-900 border border-slate-700/50 text-slate-400 px-4 py-3 rounded-lg text-xs text-center flex items-center justify-center">
                         External threat intelligence is currently unavailable. Local heuristic analysis applied.
                       </div>
                    )}
                  </div>
                  
                  {/* Indicators List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Detected Indicators ({result.indicators.length})</h3>
                    </div>
                    
                    {result.indicators.length === 0 ? (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 text-center space-y-2">
                        <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                        <h4 className="text-emerald-400 font-bold">No Major Threats Detected</h4>
                        <p className="text-sm text-slate-400">However, always remain cautious and verify senders independently.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {result.indicators.map((ind: any, i: number) => (
                          <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-500/50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="mt-0.5 shrink-0">
                                {(ind.type === 'urgency' || ind.type === 'impersonation') && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                                {(ind.type === 'link' || ind.type === 'auth') && <LinkIcon className="w-4 h-4 text-rose-400" />}
                                {(ind.type === 'credential' || ind.type === 'threat' || ind.type === 'mismatch' || ind.type === 'threat_intel') && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                                {ind.type === 'financial' && <Activity className="w-4 h-4 text-amber-400" />}
                              </div>
                              <div className="space-y-3 text-sm w-full">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-bold text-slate-200">{ind.label}</h4>
                                  <span className="text-xs font-mono text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/30">+{ind.score} pts</span>
                                </div>
                                
                                <div className="bg-slate-950 rounded border border-slate-800 p-3">
                                  <span className="font-bold text-slate-500 text-[10px] uppercase block mb-1">Evidence:</span> 
                                  <p className="text-slate-300 font-mono text-xs break-all">{ind.evidence}</p>
                                </div>
                                
                                <div className="bg-slate-900/80 rounded p-3">
                                  <span className="font-bold text-slate-500 text-[10px] uppercase block mb-1">Why it matters:</span> 
                                  <p className="text-slate-300">{ind.explanation}</p>
                                </div>
                                
                                <div className="bg-cyan-900/10 rounded p-3 border border-cyan-500/20">
                                  <span className="font-bold text-cyan-500 text-[10px] uppercase block mb-1">Security Recommendation:</span> 
                                  <p className="text-cyan-100">{ind.action}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-center flex-col items-center space-y-2">
                    <button onClick={handleDownload} className="text-xs flex items-center space-x-2 text-cyan-400 hover:text-white bg-cyan-950 px-6 py-3 rounded-full transition-colors border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
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
