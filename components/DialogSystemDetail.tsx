
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Settings, Workflow, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const DialogSystemDetail: React.FC = () => {
  const { content } = useLanguage();
  const ds = content?.minghai?.dialogSystem;

  if (!ds) return null;

  const nodeIcons = {
    config: Users,
    logic: MessageSquare,
    action: Zap,
    eval: Workflow
  };

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h4 className="text-2xl font-bold text-white mb-2">{ds.title}</h4>
        <p className="text-game-secondary font-mono text-sm tracking-wide uppercase">{ds.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Flow Diagram visualization */}
        <div className="lg:col-span-2 bg-slate-800/20 rounded-2xl p-8 border border-slate-700/30 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <MessageSquare size={200} />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fix: Explicitly cast Object.entries to provide typing for 'node' properties */}
            {(Object.entries(ds.nodes) as [string, { name: string; desc: string }][]).map(([key, node], index) => {
              const Icon = nodeIcons[key as keyof typeof nodeIcons] || Settings;
              return (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/80 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:text-game-secondary group-hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all">
                      <Icon size={20} />
                    </div>
                    <h5 className="text-white font-bold tracking-tight">{node.name}</h5>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{node.desc}</p>
                  
                  {index < 3 && (
                    <div className="mt-4 hidden md:block">
                      <div className="h-[2px] w-full bg-gradient-to-r from-game-secondary/20 via-game-secondary/50 to-transparent" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Condition Evaluator Highlight */}
          <div className="mt-8 p-6 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center gap-6">
            <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-full border-2 border-dashed border-slate-700 items-center justify-center text-slate-500">
               <Workflow size={32} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-game-secondary uppercase tracking-[0.2em] mb-1">Core Logic Utility</div>
              <h6 className="text-white font-bold mb-1">CondGroup&lt;T&gt; Evaluation Engine</h6>
              <p className="text-xs text-slate-400">
                A robust generic logic solver supporting nested AND/OR/NOT operations. 
                Used by both Quest and Dialog systems for complex prerequisites evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Highlights */}
        <div className="space-y-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 text-game-secondary">
                    <CheckCircle2 size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">Functional Highlights</span>
                </div>
                <div className="space-y-6 flex-1">
                    {ds.highlights.map((h, i) => (
                        <div key={i} className="relative pl-6 border-l border-slate-800">
                            <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-game-secondary rounded-full shadow-[0_0_8px_#06b6d4]" />
                            <p className="text-slate-300 text-sm leading-normal">
                                {h}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                    <span>STATUS: OPTIMIZED</span>
                    <span>VER: 2.4.0</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DialogSystemDetail;