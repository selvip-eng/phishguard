const fs = require('fs');
const files = [
  'src/pages/AttackSimulator.tsx',
  'src/pages/PhishingDetector.tsx',
  'src/pages/URLAnalyzer.tsx',
  'src/pages/TrainingScenarios.tsx',
  'src/pages/Awareness.tsx',
  'src/pages/About.tsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  c = c.replace(/glass-card/g, 'soc-card');
  c = c.replace(/glass-panel/g, 'soc-card');
  
  c = c.replace(/bg-white/g, 'bg-slate-900/80');
  c = c.replace(/bg-slate-50/g, 'bg-slate-900/50');
  c = c.replace(/bg-slate-100/g, 'bg-slate-800/50');
  
  c = c.replace(/text-slate-900/g, 'text-white');
  c = c.replace(/text-slate-800/g, 'text-slate-100');
  c = c.replace(/text-slate-700/g, 'text-slate-300');
  c = c.replace(/text-slate-600/g, 'text-slate-400');
  c = c.replace(/text-slate-500/g, 'text-slate-500');
  
  c = c.replace(/border-slate-200/g, 'border-slate-700/50');
  c = c.replace(/border-slate-300/g, 'border-slate-600/50');
  
  c = c.replace(/bg-slate-900\/80 border-2 border-slate-700\/50 text-slate-100/g, 'soc-input');
  c = c.replace(/bg-slate-900\/80 border-2 border-slate-700\/50/g, 'soc-input');

  c = c.replace(/text-cyan-600/g, 'text-cyan-400');
  c = c.replace(/text-cyan-700/g, 'text-cyan-300');
  c = c.replace(/bg-cyan-50/g, 'bg-cyan-500/10');
  c = c.replace(/bg-cyan-100/g, 'bg-cyan-500/20');
  c = c.replace(/border-cyan-100/g, 'border-cyan-500/20');
  c = c.replace(/border-cyan-200/g, 'border-cyan-500/30');
  c = c.replace(/border-cyan-300/g, 'border-cyan-500/40');
  
  c = c.replace(/text-emerald-600/g, 'text-emerald-400');
  c = c.replace(/bg-emerald-50/g, 'bg-emerald-500/10');
  c = c.replace(/bg-emerald-100/g, 'bg-emerald-500/20');
  c = c.replace(/border-emerald-200/g, 'border-emerald-500/30');
  
  c = c.replace(/text-red-600/g, 'text-rose-400');
  c = c.replace(/text-red-500/g, 'text-rose-400');
  c = c.replace(/bg-red-50/g, 'bg-rose-500/10');
  c = c.replace(/bg-red-100/g, 'bg-rose-500/20');
  c = c.replace(/border-red-200/g, 'border-rose-500/30');
  c = c.replace(/border-red-300/g, 'border-rose-500/40');
  
  c = c.replace(/text-amber-600/g, 'text-amber-400');
  c = c.replace(/bg-amber-50/g, 'bg-amber-500/10');
  c = c.replace(/border-amber-200/g, 'border-amber-500/30');
  
  c = c.replace(/text-blue-600/g, 'text-blue-400');
  c = c.replace(/bg-blue-50/g, 'bg-blue-500/10');
  c = c.replace(/border-blue-200/g, 'border-blue-500/30');
  
  fs.writeFileSync(f, c);
});
