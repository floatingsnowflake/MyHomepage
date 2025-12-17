
import React, { useState, useEffect } from 'react';
import { ASSETS, INTERESTS_DATA as DEFAULT_DATA } from '../constants';
import { motion } from 'framer-motion';
import { Heart, Gamepad2, Tv, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import Lightbox from './Lightbox';

// Shared Minimalist Fallback
const GalleryFallback = ({ icon: Icon }: { icon: any }) => (
    <div className="w-full h-full bg-slate-800/50 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-500 to-transparent" />
        <div className="border border-slate-600 rounded p-4 mb-2">
            <Icon className="w-8 h-8 text-slate-500" />
        </div>
        <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">NO ASSET DATA</div>
        <div className="absolute bottom-2 right-2 flex gap-1">
             <div className="w-1 h-1 bg-red-500/50 rounded-full animate-pulse" />
             <div className="w-1 h-1 bg-slate-600 rounded-full" />
        </div>
    </div>
);

const Gallery: React.FC = () => {
  const { content, lang } = useLanguage();
  const [data, setData] = useState(DEFAULT_DATA);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Fetch dynamic text content
  useEffect(() => {
    const fetchData = async () => {
        try {
            const url = `${ASSETS.data.interests}_${lang}.json`;
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                if (json && typeof json === 'object') {
                    setData(json);
                }
            }
        } catch (error) {
            console.log("Using default interests data (Network/Parse error)");
        }
    };
    fetchData();
  }, [lang]);

  if (!data) return null;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
       <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

       {/* Background decorative elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-game-accent rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-game-secondary rounded-full blur-[100px]" />
       </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Heart className="text-red-500 fill-red-500 animate-pulse" />
                <span>{data.title || 'Interests'}</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
                {data.description}
            </p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                {data.tags && data.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-game-secondary">
                        # {tag}
                    </span>
                ))}
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-96">
           {/* Main Highlight Image */}
           <GalleryItem 
              className="md:col-span-2 aspect-video md:aspect-auto"
              src={ASSETS.placeholders.interests[0]}
              fallbackIcon={Tv}
              overlayText="Anime & Game Culture"
              onClick={() => setLightboxSrc(ASSETS.placeholders.interests[0])}
           />
           
           {/* Side Stack */}
           <div className="flex flex-col gap-6">
              <GalleryItem 
                className="flex-1 min-h-[150px]"
                src={ASSETS.placeholders.interests[1]}
                fallbackIcon={Gamepad2}
                overlayText="Indie Game Dev"
                isSideItem
                onClick={() => setLightboxSrc(ASSETS.placeholders.interests[1])}
              />

              <GalleryItem 
                className="flex-1 min-h-[150px]"
                src={ASSETS.placeholders.interests[2]}
                fallbackIcon={AlertTriangle}
                overlayText="El Psy Kongroo"
                isSideItem
                onClick={() => setLightboxSrc(ASSETS.placeholders.interests[2])}
              />
           </div>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-slate-500 italic text-sm">
              {content?.gallery?.quote}
            </p>
        </div>
      </div>
    </section>
  );
};

interface GalleryItemProps {
    src: string;
    fallbackIcon: any;
    overlayText: string;
    className?: string;
    isSideItem?: boolean;
    onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, fallbackIcon, overlayText, className, isSideItem, onClick }) => {
    const [error, setError] = useState(false);

    return (
        <motion.div 
            whileHover={isSideItem ? { x: 5 } : { scale: 1.01 }}
            className={`relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 cursor-pointer ${className}`}
            onClick={onClick}
        >
             {!error ? (
                 <>
                    {!isSideItem && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-black/40 z-10 transition-opacity duration-300 group-hover:opacity-0">
                            <Tv size={48} className="mb-2 text-slate-400" />
                            <span className="px-4 py-2 rounded text-lg font-bold text-white tracking-widest uppercase">{overlayText}</span>
                        </div>
                    )}
                    <img 
                        src={src} 
                        onError={() => setError(true)}
                        alt={overlayText}
                        className={`w-full h-full object-cover transition duration-500 ${isSideItem ? 'opacity-60 group-hover:opacity-90' : ''}`}
                    />
                    {isSideItem && (
                         <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
                            <span className="text-white font-bold flex items-center gap-2">
                                <Gamepad2 size={16} /> {overlayText}
                            </span>
                        </div>
                    )}
                 </>
             ) : (
                 <GalleryFallback icon={fallbackIcon} />
             )}
        </motion.div>
    );
};

export default Gallery;
