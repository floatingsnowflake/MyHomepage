
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ASSETS, MINGHAI_FEATURES as DEFAULT_FEATURES, PERSONAL_INFO } from '../constants';
import { ExternalLink, Zap } from 'lucide-react';

// Reusable Fallback Component
const MinimalistFallback = ({ label }: { label?: string }) => (
  <div className="w-full h-full bg-slate-900 flex items-center justify-center border border-slate-800 relative overflow-hidden group">
    <div className="absolute inset-0 opacity-10">
       <svg width="100%" height="100%">
         <pattern id="grid_mini" width="20" height="20" patternUnits="userSpaceOnUse">
           <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
         </pattern>
         <rect width="100%" height="100%" fill="url(#grid_mini)" />
       </svg>
    </div>
    <div className="z-10 flex flex-col items-center text-slate-600 group-hover:text-slate-500 transition-colors">
      <div className="relative w-10 h-10 border border-slate-700 group-hover:border-slate-500 rounded-sm flex items-center justify-center transition-colors">
         <div className="w-px h-12 bg-slate-700 group-hover:bg-slate-500 rotate-45 absolute transition-colors" />
         <div className="w-px h-12 bg-slate-700 group-hover:bg-slate-500 -rotate-45 absolute transition-colors" />
      </div>
      <span className="mt-2 text-[10px] font-mono tracking-widest uppercase">{label || "NO SIGNAL"}</span>
    </div>
  </div>
);

const ProjectMinghai: React.FC = () => {
  const [videoError, setVideoError] = useState(false);
  const [features, setFeatures] = useState<string[]>(DEFAULT_FEATURES);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(ASSETS.data.minghaiFeatures);
        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json) && json.length > 0) {
            setFeatures(json);
          }
        }
      } catch (e) {
        // Silent fail
      }
    };
    fetchFeatures();
  }, []);

  return (
    <section id="minghai" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-violet-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-game-secondary font-mono text-sm uppercase tracking-widest mb-2">Flagship Project</h2>
          <h3 className="text-4xl font-bold text-white">命骸 (Ming Hai)</h3>
          <div className="w-24 h-1 bg-game-accent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Media Column - Video Slot */}
          <div className="space-y-6">
            <div className="relative group rounded-xl overflow-hidden border-2 border-slate-700/50 bg-black shadow-2xl aspect-video">
               {!videoError ? (
                 <video 
                    className="w-full h-full object-cover"
                    poster={ASSETS.minghai.mainImage}
                    controls
                    muted
                    loop
                    onError={() => setVideoError(true)}
                  >
                    <source src={ASSETS.minghai.pv} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
               ) : (
                 <MinimalistFallback label="VIDEO SOURCE OFFLINE" />
               )}
              
              {!videoError && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                  PV 展示
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {ASSETS.minghai.gallery.map((src, index) => (
                <Thumbnail key={index} src={src} index={index} />
              ))}
            </div>
          </div>

          {/* Info Column */}
          <div>
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 backdrop-blur-sm">
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                作为项目<b>总程序</b>，编写超过<b>8万行代码</b>。负责从底层架构到上层玩法的全方位实现。
                这是一个复杂的 3D 横版 RPG，核心包含连击战斗系统、MemoryPack 高性能存档、高度模块化的任务与对话系统。
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-slate-700 text-violet-300 text-sm rounded-full">Unity 2021+</span>
                <span className="px-3 py-1 bg-slate-700 text-violet-300 text-sm rounded-full">C#</span>
                <span className="px-3 py-1 bg-slate-700 text-violet-300 text-sm rounded-full">MemoryPack</span>
                <span className="px-3 py-1 bg-slate-700 text-violet-300 text-sm rounded-full">Cinemachine</span>
                <span className="px-3 py-1 bg-slate-700 text-violet-300 text-sm rounded-full">UGUI</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="mt-1 min-w-[16px]">
                      <Zap size={16} className="text-game-secondary" />
                    </div>
                    <span className="text-slate-300 text-sm font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <motion.a 
                href={PERSONAL_INFO.steamLink}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                在 Steam 上查看命骸
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Thumbnail: React.FC<{src: string, index: number}> = ({ src, index }) => {
    const [error, setError] = useState(false);
    
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            className="aspect-video rounded-lg overflow-hidden border border-slate-700 cursor-pointer relative group bg-slate-900"
        >
            {!error ? (
                <img 
                    src={src} 
                    onError={() => setError(true)}
                    alt={`Screenshot ${index + 1}`} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                />
            ) : (
                <MinimalistFallback label="N/A" />
            )}
        </motion.div>
    );
};

export default ProjectMinghai;
