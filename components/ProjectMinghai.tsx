import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS, MINGHAI_FEATURES, PERSONAL_INFO } from '../constants';
import { Play, ExternalLink, Cpu, Database, ShieldCheck, Zap } from 'lucide-react';

const ProjectMinghai: React.FC = () => {
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
               {/* 
                 VIDEO SLOT: 
                 Logic checks for video file. If fails, falls back to image.
               */}
              <video 
                className="w-full h-full object-cover"
                poster={ASSETS.minghai.mainImage || ASSETS.placeholders.minghaiFallback}
                controls
                muted
                loop
              >
                <source src={ASSETS.minghai.pv} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                PV 展示
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {ASSETS.minghai.gallery.map((src, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-video rounded-lg overflow-hidden border border-slate-700 cursor-pointer relative group"
                >
                   <img 
                    src={src} 
                    onError={(e) => {
                      // Fallback if specific asset not found
                      e.currentTarget.src = `https://picsum.photos/seed/minghai${index}/300/200`;
                    }}
                    alt={`Screenshot ${index + 1}`} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                   />
                </motion.div>
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
                {MINGHAI_FEATURES.map((feat, idx) => (
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

export default ProjectMinghai;