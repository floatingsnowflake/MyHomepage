
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn } from 'lucide-react';

interface LightboxProps {
  src: string | null;
  onClose: () => void;
  alt?: string;
}

const Lightbox: React.FC<LightboxProps> = ({ src, onClose, alt }) => {
  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-4 z-20">
             <a 
                href={src} 
                download 
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800/50 rounded-full text-white hover:bg-game-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
             >
                <Download size={24} />
             </a>
             <button 
                onClick={onClose}
                className="p-2 bg-slate-800/50 rounded-full text-white hover:bg-red-500 transition-colors"
             >
                <X size={24} />
             </button>
          </div>

          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            src={src}
            alt={alt || 'Full screen view'}
            className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
             <span className="bg-black/50 px-4 py-1 rounded-full text-xs text-slate-400 backdrop-blur-sm border border-slate-800">
                Press ESC to close
             </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
