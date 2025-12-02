import React from 'react';
import { ASSETS, INTERESTS_DATA } from '../constants';
import { motion } from 'framer-motion';
import { Heart, Gamepad2, Tv } from 'lucide-react';

const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
       {/* Background decorative elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-game-accent rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-game-secondary rounded-full blur-[100px]" />
       </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Heart className="text-red-500 fill-red-500 animate-pulse" />
                <span>{INTERESTS_DATA.title}</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
                {INTERESTS_DATA.description}
            </p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                {INTERESTS_DATA.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-game-secondary">
                        # {tag}
                    </span>
                ))}
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-96">
           {/* Main Highlight Image */}
           <motion.div 
             whileHover={{ scale: 1.01 }}
             className="md:col-span-2 relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 aspect-video md:aspect-auto"
           >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-black/40 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <Tv size={48} className="mb-2 text-slate-400" />
                <span className="px-4 py-2 rounded text-lg font-bold text-white tracking-widest uppercase">Anime & Game Culture</span>
              </div>
              <img 
                src={ASSETS.placeholders.interests[0]} 
                onError={(e) => {
                    // Fallback visual if image not found
                    e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070";
                }}
                alt="Anime Culture"
                className="w-full h-full object-cover transition duration-500"
              />
           </motion.div>
           
           {/* Side Stack */}
           <div className="flex flex-col gap-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex-1 relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 min-h-[150px]"
              >
                 <img 
                  src={ASSETS.placeholders.interests[1]} 
                  onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=2070"}
                  alt="Gaming Setup"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition duration-500"
                 />
                 <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
                     <span className="text-white font-bold flex items-center gap-2">
                         <Gamepad2 size={16} /> 独立游戏开发
                     </span>
                 </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex-1 relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 min-h-[150px]"
              >
                 <img 
                  src={ASSETS.placeholders.interests[2]} 
                  onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1614726365723-49cfa0950ecb?auto=format&fit=crop&q=80&w=1965"}
                  alt="Collection"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition duration-500"
                 />
                 <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
                     <span className="text-white font-bold">El Psy Kongroo</span>
                 </div>
              </motion.div>
           </div>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-slate-500 italic text-sm">
              "Everything is connected to the choice of Steins;Gate."
            </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;