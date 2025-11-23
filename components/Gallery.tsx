import React from 'react';
import { ASSETS } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">个人爱好 & 更多作品</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
           {/* Left large slot */}
           <div className="md:col-span-2 relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                <span className="z-10 bg-black/50 px-4 py-2 rounded">Anime & Game Culture</span>
              </div>
              <img 
                src="https://picsum.photos/id/54/800/600" 
                alt="Anime Culture"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition duration-500"
              />
           </div>
           
           {/* Right stacked slots */}
           <div className="flex flex-col gap-4">
              <div className="flex-1 relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                 <img 
                  src="https://picsum.photos/id/96/400/300" 
                  alt="Tooling"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition duration-500"
                 />
                 <div className="absolute bottom-2 left-2 text-white text-sm font-bold shadow-black drop-shadow-md">Editor Tools</div>
              </div>
              <div className="flex-1 relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                 <img 
                  src="https://picsum.photos/id/122/400/300" 
                  alt="Shaders"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition duration-500"
                 />
                 <div className="absolute bottom-2 left-2 text-white text-sm font-bold shadow-black drop-shadow-md">Shader FX</div>
              </div>
           </div>
        </div>
        
        <p className="text-center text-slate-500 mt-8 italic">
          "El Psy Kongroo" - Steins;Gate
        </p>
      </div>
    </section>
  );
};

export default Gallery;