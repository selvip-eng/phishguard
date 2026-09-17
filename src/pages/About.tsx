import { Shield, Layout, FileCode2, Search, LinkIcon, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';
import ProfileAvatar from '../components/ProfileAvatar';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12">
      
      {/* Title Section */}
      <div className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-900/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-4">
          <Shield className="w-10 h-10 text-cyan-400" />
        </div>
        <h1 className="text-4xl font-black tracking-widest text-white uppercase">
          About PHISH<span className="text-cyan-500">GUARD</span>
        </h1>
        <p className="text-slate-400 font-medium max-w-2xl mx-auto">
          Phishing Attack & Detection System designed for educational analysis and proactive security training.
        </p>
      </div>

      {/* Developer Profile Section */}
      <div className="soc-card overflow-hidden border-cyan-500/30">
        <div className="bg-gradient-to-r from-slate-900 to-cyan-950 p-8 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <ProfileAvatar size="xl" className="border-4 border-slate-900 ring-2 ring-cyan-500/50" />
            
            <div className="text-center md:text-left space-y-2 pt-2">
              <h2 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-1">About the Developer</h2>
              <h3 className="text-3xl font-black">Selvi P</h3>
              <p className="text-lg font-medium text-slate-300">Computer Science & Engineering</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                <span className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-4 py-1.5 rounded-full text-sm font-bold">III CSE C</span>
                <span className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-1.5 rounded-full text-sm font-bold">Agni College of Technology</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-slate-900/80 text-slate-300 leading-relaxed font-medium">
          <p>
            PHISHGUARD was developed as a cybersecurity learning and detection project focused on understanding phishing attacks, identifying suspicious indicators, analyzing URLs and improving security awareness. 
          </p>
        </div>
      </div>

      {/* Contributions Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center">
          <span className="bg-cyan-500 w-2 h-6 mr-3 rounded-full"></span>
          My Contribution
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="soc-card p-6 flex items-start space-x-4 group hover:border-pink-500/50">
            <div className="bg-pink-500/10 p-3 rounded-lg text-pink-400 group-hover:scale-110 transition-transform">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-pink-400 transition-colors">UI / UX Design</h4>
              <p className="text-sm text-slate-400 mt-1">Designed the premium cybersecurity interface, projector-friendly themes, and responsive layouts.</p>
            </div>
          </div>
          
          <div className="soc-card p-6 flex items-start space-x-4 group hover:border-blue-500/50">
            <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Frontend Development</h4>
              <p className="text-sm text-slate-400 mt-1">Built the interactive React application using modern hooks, state management, and Tailwind CSS.</p>
            </div>
          </div>

          <div className="soc-card p-6 flex items-start space-x-4 group hover:border-rose-500/50">
            <div className="bg-rose-500/10 p-3 rounded-lg text-rose-400 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-rose-400 transition-colors">Phishing Detection</h4>
              <p className="text-sm text-slate-400 mt-1">Implemented local rule-based analysis for parsing emails, extracting headers, and finding threat indicators.</p>
            </div>
          </div>

          <div className="soc-card p-6 flex items-start space-x-4 group hover:border-indigo-500/50">
            <div className="bg-indigo-500/10 p-3 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">URL Analysis</h4>
              <p className="text-sm text-slate-400 mt-1">Created routing rules to inspect suspicious domains, detect typosquatting, and score risk levels.</p>
            </div>
          </div>

          <div className="soc-card p-6 flex items-start space-x-4 group hover:border-emerald-500/50">
            <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">Security Training</h4>
              <p className="text-sm text-slate-400 mt-1">Developed an interactive multiple-choice training module with instant feedback and dynamic scoring.</p>
            </div>
          </div>

          <div className="soc-card p-6 flex items-start space-x-4 group hover:border-amber-500/50">
            <div className="bg-amber-500/10 p-3 rounded-lg text-amber-400 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">Report Generation</h4>
              <p className="text-sm text-slate-400 mt-1">Integrated client-side PDF generation to export customized security reports and training results.</p>
            </div>
          </div>
          
          <div className="soc-card p-6 flex items-start space-x-4 group hover:border-slate-300/50">
            <div className="bg-slate-800 p-3 rounded-lg text-slate-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-slate-300 transition-colors">Integration & Testing</h4>
              <p className="text-sm text-slate-400 mt-1">Ensured privacy-first execution, component functionality, and data flow validation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Ownership Certificate-style Section */}
      <div className="soc-card p-10 text-center space-y-6 mt-12 bg-slate-900 border-2 border-cyan-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none"></div>
        <div className="mx-auto w-16 h-16 bg-cyan-900/30 rounded-full flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Shield className="w-8 h-8 text-cyan-400" />
        </div>
        
        <h2 className="text-3xl font-black tracking-widest text-white">PHISHGUARD</h2>
        
        <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full my-6 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Designed & Developed by</p>
          <p className="text-2xl font-black text-cyan-400">Selvi P</p>
        </div>
        
        <div className="pt-4 space-y-1">
          <p className="text-lg font-semibold text-slate-300">Computer Science & Engineering</p>
          <p className="text-lg font-semibold text-slate-300">Agni College of Technology</p>
        </div>
        
        <div className="pt-8">
          <span className="inline-block px-6 py-2 border-2 border-slate-700 rounded-full text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-900/50">
            Project Activity / Cybersecurity
          </span>
        </div>
      </div>

    </div>
  );
};

export default About;
