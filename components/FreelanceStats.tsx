
import React, { useState, useEffect } from 'react';
import { FREELANCE_STATS, ASSETS, FREELANCE_SHOWCASE_DATA } from '../constants';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/LanguageContext';
import { FreelanceItem } from '../types';
import Lightbox from './Lightbox';
import { ZoomIn } from 'lucide-react';

const FreelanceStats: React.FC = () => {
  const { content } = useLanguage();
  const [showcaseItems, setShowcaseItems] = useState<FreelanceItem[]>(FREELANCE_SHOWCASE_DATA);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const response = await fetch(ASSETS.data.freelanceShowcase);
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
  }, []);

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
                     <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700 relative group cursor-pointer"
                        onClick={() => setLightboxSrc(item.image)}
                     >
                        <img 
                           src={item.image} 
                           alt={item.title} 
                           className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                            <ZoomIn className="text-white w-8 h-8" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2 text-xs text-center text-white truncate">
                           {item.title}
                        </div>
                     </motion.div>
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
