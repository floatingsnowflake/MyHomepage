
import React, { useState, useEffect } from 'react';
import { FREELANCE_STATS, ASSETS, FREELANCE_SHOWCASE_DATA } from '../constants';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/LanguageContext';
import { FreelanceItem } from '../types';
import Lightbox from './Lightbox';
import { ZoomIn } from 'lucide-react';

// Mecha-style fallback component for missing images
const MechaFallback = () => (
  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden border border-slate-700">
    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-20">
       <svg width="100%" height="100%">
         <defs>
            <pattern id="mech_grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5"/>
            </pattern>
         </defs>
         <rect width="100%" height="100%" fill="url(#mech_grid)" />
       </svg>
    </div>
    {/* Crosshair / Tech Symbol */}
    <div className="relative z-10 w-12 h-12 border-2 border-slate-600 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute top-0 w-[1px] h-3 bg-slate-600 -translate-y-full" />
        <div className="absolute bottom-0 w-[1px] h-3 bg-slate-600 translate-y-full" />
        <div className="absolute left-0 h-[1px] w-3 bg-slate-600 -translate-x-full" />
        <div className="absolute right-0 h-[1px] w-3 bg-slate-600 translate-x-full" />
    </div>
    <span className="mt-3 text-[10px] font-mono text-slate-500 tracking-[0.2em]">NO SIGNAL</span>
  </div>
);

const ShowcaseItem = ({ item, onClick }: { item: FreelanceItem, onClick: () => void }) => {
    const [error, setError] = useState(false);
    
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700 relative group cursor-pointer"
            onClick={onClick}
        >
            {!error ? (
                <>
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={() => setError(true)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                        <ZoomIn className="text-white w-8 h-8" />
                    </div>
                </>
            ) : (
                <MechaFallback />
            )}
            
            <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2 text-xs text-center text-white truncate z-20">
                {item.title}
            </div>
        </motion.div>
    )
}

const FreelanceStats: React.FC = () => {
  const { content, lang } = useLanguage();
  const [showcaseItems, setShowcaseItems] = useState<FreelanceItem[]>(FREELANCE_SHOWCASE_DATA);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const response = await fetch(`${ASSETS.data.freelanceShowcase}_${lang}.json`);
        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json) && json.length > 0) {
             setShowcaseItems(json);
          }
        }
      } catch (e) {
         console.log("No remote freelance showcase data, using default.");
      }
    };
    fetchShowcase();
  }, [lang]);

  return (
    <section id="freelance" className="py-20 bg-slate-950 border-t border-slate-900">
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-violet-900/20 to-blue-900/20 rounded-2xl p-8 md:p-16 border border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.freelance.title} <span className="text-yellow-400">{content.freelance.title_highlight}</span>
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {content.freelance.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {content.freelance.tags.map((tag, i) => (
                   <span key={i} className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-400 border border-slate-700">
                     {tag}
                   </span>
                ))}
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

          {/* Showcase Carousel / Grid */}
          {showcaseItems.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-700/50">
               <h3 className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-6 text-center">Project Showcase & Reviews</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {showcaseItems.map((item, i) => (
                     <ShowcaseItem 
                        key={i} 
                        item={item} 
                        onClick={() => setLightboxSrc(item.image)} 
                     />
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreelanceStats;
