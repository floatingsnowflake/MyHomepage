
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, Code2, GitMerge, CheckCircle2, Cpu } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const QuestSystemDetail: React.FC = () => {
  const { content } = useLanguage();
  
  // Safety check for nested content
  const qs = content?.minghai?.questSystem;

  if (!qs) return null;

  const nodeIcons = {
    static: Database,
    runtime: Activity,
    logic: Code2,
    event: GitMerge
  };

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h4 className="text-2xl font-bold text-white mb-2">{qs.title || 'Quest System Architecture'}</h4>
        <p className="text-game-secondary font-mono text-sm tracking-wide uppercase">{qs.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Visualization */}
        <div className="lg:col-span-2 bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             System Live Diagram
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {/* Fix: Explicitly cast Object.entries to provide typing for 'node' properties */}
            {qs.nodes && (Object.entries(qs.nodes) as [string, { name: string; desc: string }][]).map(([key, node], index) => {
              const Icon = nodeIcons[key as keyof typeof nodeIcons] || Code2;
              return (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 hover:border-game-accent transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-game-accent/20 group-hover:text-game-accent transition-colors">
                      <Icon size={24} />
                    </div>
                    <h5 className="text-white font-bold">{node.name}</h5>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{node.desc}</p>
                  
                  {/* Visual Connection (Mock) */}
                  <div className="mt-4 flex items-center gap-1">
                     <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="w-1/3 h-full bg-gradient-to-r from-transparent via-game-accent to-transparent"
                        />
                     </div>
                     <GitMerge size={12} className="text-slate-600" />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Decorative Lines in background */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
             <svg width="100%" height="100%">
                <path d="M 100 100 L 400 300 M 500 100 L 200 400" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="100" cy="100" r="5" fill="white" />
                <circle cx="400" cy="300" r="5" fill="white" />
             </svg>
          </div>
        </div>

        {/* Right Column: Highlights & Performance */}
        <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-game-accent/20 to-transparent p-6 rounded-2xl border border-game-accent/30">
                <div className="flex items-center gap-3 mb-4 text-game-accent">
                    <Cpu size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">Engine Highlights</span>
                </div>
                <ul className="space-y-4">
                    {qs.highlights && qs.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-game-secondary mt-1 shrink-0" />
                            <span className="text-slate-300 text-sm leading-tight">{h}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex-1">
                 <div className="text-[10px] font-mono text-slate-500 uppercase mb-4">Technical Stack</div>
                 <div className="flex flex-wrap gap-2">
                    {["Factory Pattern", "Strategy Pattern", "MemoryPack", "Event-Driven", "Data-Oriented"].map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] rounded border border-slate-700">
                            {tag}
                        </span>
                    ))}
                 </div>
                 <div className="mt-6 pt-6 border-t border-slate-800">
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                        "The system handles 80,000+ lines of codebase efficiently, maintaining a clean separation between gameplay logic and task management."
                    </p>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuestSystemDetail;