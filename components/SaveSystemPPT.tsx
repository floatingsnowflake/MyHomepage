
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Search,
  Zap,
  Box
} from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const SaveSystemPPT: React.FC = () => {
  const { content } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const ss = content?.minghai?.saveSystem;

  if (!ss) return null;

  const totalSlides = ss.slides.length;

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const getSlideIcon = (index: number) => {
    const icons = [Save, Zap, Box, Search, Layers, Cpu, Lock, CheckCircle2];
    const IconComp = icons[index] || Save;
    return <IconComp className="w-8 h-8 text-game-secondary" />;
  };

  return (
    <div className="mt-24 relative">
      {/* Header Info */}
      <div className="text-center mb-12">
        <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">{ss.title}</h4>
        <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-game-accent"></span>
            <p className="text-game-secondary font-mono text-sm tracking-widest uppercase">{ss.subtitle}</p>
            <span className="h-px w-8 bg-game-accent"></span>
        </div>
      </div>

      {/* PPT Container */}
      <div className="relative max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] bg-slate-800/20 border border-slate-700/50 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl group">
        
        {/* Slide Counter */}
        <div className="absolute top-6 left-8 z-10 flex items-center gap-4">
             <div className="px-3 py-1 bg-slate-900/80 rounded-full border border-slate-700 text-[10px] font-mono text-slate-400">
                SLIDE {currentSlide + 1} / {totalSlides}
             </div>
             {ss.slides[currentSlide].techTag && (
                <div className="px-3 py-1 bg-game-accent/10 rounded-full border border-game-accent/30 text-[10px] font-mono text-game-accent uppercase tracking-tighter">
                   {ss.slides[currentSlide].techTag}
                </div>
             )}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-4 z-20 flex items-center">
            <button 
                onClick={handlePrev}
                className="p-2 bg-slate-900/50 hover:bg-game-accent rounded-full text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
            >
                <ChevronLeft size={24} />
            </button>
        </div>
        <div className="absolute inset-y-0 right-4 z-20 flex items-center">
            <button 
                onClick={handleNext}
                className="p-2 bg-slate-900/50 hover:bg-game-accent rounded-full text-white transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
            >
                <ChevronRight size={24} />
            </button>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full p-8 md:p-16 flex flex-col md:flex-row items-center gap-12"
          >
            {/* Visual Side */}
            <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="relative">
                    {/* Animated Glow Background */}
                    <div className="absolute inset-0 bg-game-secondary/20 blur-[60px] rounded-full animate-pulse" />
                    
                    <div className="relative w-48 h-48 md:w-64 md:h-64 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center bg-slate-900/40 backdrop-blur-md">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                          className="absolute inset-4 border border-game-accent/30 rounded-full border-t-game-accent" 
                        />
                        <div className="flex flex-col items-center">
                            {getSlideIcon(currentSlide)}
                            <div className="mt-4 font-mono text-[8px] text-slate-500 tracking-[0.3em] uppercase">Security Level: High</div>
                        </div>
                    </div>

                    {/* Orbital Nodes (Mock Architecture) */}
                    {[0, 1, 2].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ 
                                x: [Math.cos(i * 2) * 100, Math.cos(i * 2 + 1) * 110, Math.cos(i * 2) * 100],
                                y: [Math.sin(i * 2) * 100, Math.sin(i * 2 + 1) * 90, Math.sin(i * 2) * 100]
                            }}
                            transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 w-3 h-3 bg-game-secondary rounded-full shadow-[0_0_10px_#06b6d4]"
                        />
                    ))}
                </div>
            </div>

            {/* Text Side */}
            <div className="flex-1 space-y-6">
                <motion.h5 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold text-white"
                >
                    {ss.slides[currentSlide].title}
                </motion.h5>
                
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 text-sm md:text-base leading-relaxed"
                >
                    {ss.slides[currentSlide].desc}
                </motion.p>

                <ul className="space-y-4 pt-4">
                    {ss.slides[currentSlide].points.map((p, i) => (
                        <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <CheckCircle2 className="w-5 h-5 text-game-secondary shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{p}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
            <motion.div 
                className="h-full bg-game-secondary shadow-[0_0_10px_#06b6d4]"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
        </div>
      </div>

      {/* Control Hint */}
      <div className="mt-8 flex justify-center gap-8">
          <button 
             onClick={handlePrev}
             className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white transition group"
          >
             <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {ss.nav.prev}
          </button>
          <div className="flex gap-2 items-center">
             {ss.slides.map((_, idx) => (
                 <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-6 bg-game-secondary' : 'bg-slate-700'}`}
                 />
             ))}
          </div>
          <button 
             onClick={handleNext}
             className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white transition group"
          >
             {ss.nav.next} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
      </div>
    </div>
  );
};

export default SaveSystemPPT;
