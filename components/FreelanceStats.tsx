import React from 'react';
import { FREELANCE_STATS } from '../constants';
import { motion } from 'framer-motion';

const FreelanceStats: React.FC = () => {
  return (
    <section id="freelance" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-violet-900/20 to-blue-900/20 rounded-2xl p-8 md:p-16 border border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">
                闲鱼 <span className="text-yellow-400">Unity 外包战士</span>
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                自2024年以来，我在闲鱼平台累计处理超过 3,800+ 单 Unity 相关问题。
                这不仅是数字，更是处理过数千个不同项目架构、不同Bug类型的经验积累。
                无论是大语言模型对接、无人机仿真，还是传统的2D/3D游戏开发，我都拥有极速定位问题和解决问题的能力。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-400">数据可视化</span>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-400">3D钓鱼</span>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-400">车企UI交互</span>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-400">人脸识别</span>
              </div>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              {FREELANCE_STATS.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center shadow-xl"
                >
                  <stat.icon className="w-8 h-8 mx-auto text-game-accent mb-3" />
                  <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelanceStats;