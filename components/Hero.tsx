import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, ASSETS } from '../constants';
import { Github, Mail, ExternalLink } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Layer - Simulated Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950 z-10" />
        <img 
          src={ASSETS.placeholders.heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-game-secondary font-mono text-lg mb-4 tracking-widest uppercase">
            Senior Unity Engineer
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            <span className="block">{PERSONAL_INFO.title}</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
            {PERSONAL_INFO.tagline}
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-base text-slate-400 leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a 
              href="#minghai"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-none bg-game-accent hover:bg-violet-600 text-white transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.8)]"
            >
              查看核心项目 (命骸)
            </a>
            <a 
              href="#contact"
              className="px-8 py-3 border border-slate-500 text-base font-medium rounded-none text-slate-300 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              联系我
            </a>
          </div>

          <div className="mt-12 flex justify-center space-x-6">
             {/* Placeholder social links */}
             <div className="p-2 bg-slate-800/50 rounded-full hover:bg-game-accent/50 transition cursor-pointer">
                <Github className="w-6 h-6 text-white" />
             </div>
             <div className="p-2 bg-slate-800/50 rounded-full hover:bg-game-accent/50 transition cursor-pointer">
                <Mail className="w-6 h-6 text-white" />
             </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 w-full flex justify-center z-20">
         <motion.div 
           animate={{ y: [0, 10, 0] }} 
           transition={{ repeat: Infinity, duration: 1.5 }}
           className="text-slate-500"
         >
           SCROLL
         </motion.div>
      </div>
    </section>
  );
};

export default Hero;