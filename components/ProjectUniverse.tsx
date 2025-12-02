import React, { useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Stars, Float, Sparkles, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { PROJECT_UNIVERSE } from '../constants';
import { X, Tag, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface ImageItemProps {
  data: typeof PROJECT_UNIVERSE[0];
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  onClick: (data: typeof PROJECT_UNIVERSE[0]) => void;
}

// --- Error Boundary for 3D Content ---
class ImageErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// --- 3D Components ---

const FallbackPlaceholder = ({ position, rotation }: { position: any, rotation: any }) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={[2, 1.125]} />
    <meshStandardMaterial color="#334155" wireframe />
  </mesh>
);

const FloatingImage = ({ data, position, rotation, index, onClick }: ImageItemProps) => {
  const ref = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    // Subtle float animation
    if (ref.current) {
        ref.current.position.y += Math.sin(state.clock.elapsedTime + index * 100) * 0.002;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Glow Frame */}
        <mesh position={[0, 0, -0.05]} scale={hovered ? 1.05 : 1}>
           <planeGeometry args={[2.1, 1.2]} />
           <meshBasicMaterial color={hovered ? "#8b5cf6" : "#334155"} transparent opacity={0.5} />
        </mesh>

        <Image 
            ref={ref}
            url={data.url} 
            transparent 
            side={THREE.DoubleSide}
            scale={hovered ? [2.2, 1.23] : [2, 1.125]} 
            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
            onClick={(e) => {
                e.stopPropagation();
                onClick(data);
            }}
            toneMapped={false} // Important for bloom
        />
      </Float>
    </group>
  );
};

const GalaxyScene = ({ onItemClick }: { onItemClick: (data: typeof PROJECT_UNIVERSE[0]) => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create random spherical positions
  const items = useMemo(() => {
    return PROJECT_UNIVERSE.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / PROJECT_UNIVERSE.length);
      const theta = Math.sqrt(PROJECT_UNIVERSE.length * Math.PI) * phi;
      
      const radius = 6;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return {
        data: item,
        position: [x * 1.5, y * 1.5 + (Math.random() - 0.5) * 2, z] as [number, number, number],
        rotation: [0, -theta, 0] as [number, number, number]
      };
    });
  }, []);

  return (
    <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Particle Effects */}
        <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#8b5cf6" />
        
        <group ref={groupRef}>
            {items.map((item, i) => (
               <ImageErrorBoundary 
                  key={i} 
                  fallback={<FallbackPlaceholder position={item.position} rotation={[0, Math.atan2(item.position[0], item.position[2]), 0]} />}
               >
                  <Suspense fallback={<FallbackPlaceholder position={item.position} rotation={[0, Math.atan2(item.position[0], item.position[2]), 0]} />}>
                    <FloatingImage 
                        index={i}
                        data={item.data}
                        position={item.position}
                        rotation={[0, Math.atan2(item.position[0], item.position[2]), 0]} 
                        onClick={onItemClick}
                    />
                  </Suspense>
               </ImageErrorBoundary>
            ))}
        </group>
    </>
  );
};

// --- Main Component ---

const ProjectUniverse: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECT_UNIVERSE[0] | null>(null);

  return (
    <section id="project-universe" className="relative h-[85vh] w-full bg-slate-950 overflow-hidden border-t border-slate-900">
        <div className="absolute top-8 left-0 w-full z-10 text-center pointer-events-none">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 drop-shadow-lg">
                项目宇宙
            </h2>
            <p className="text-slate-400 text-sm mt-2 opacity-80">
                拖拽旋转 · 点击查看详情
            </p>
        </div>

        <Canvas camera={{ position: [0, 0, 14], fov: 45 }} dpr={[1, 2]}>
            <OrbitControls 
                makeDefault
                enablePan={false} 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
            />
            <GalaxyScene onItemClick={setSelectedProject} />
            
            {/* Post Processing Effects */}
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0} mipmapBlur intensity={0.5} radius={0.4} />
            </EffectComposer>
        </Canvas>

        {/* Detail Modal */}
        <AnimatePresence>
            {selectedProject && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 text-white/70 hover:text-game-accent transition z-50 bg-black/20 p-2 rounded-full backdrop-blur-sm"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Side */}
                        <div className="md:w-3/5 bg-black relative">
                            <img 
                                src={selectedProject.url} 
                                alt={selectedProject.title}
                                className="w-full h-full object-contain md:object-cover bg-slate-950"
                                onError={(e) => {
                                    e.currentTarget.src = "https://picsum.photos/800/600";
                                }}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
                        </div>

                        {/* Content Side */}
                        <div className="md:w-2/5 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                            
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {selectedProject.date && (
                                  <span className="flex items-center text-xs text-slate-400 font-mono">
                                    <Calendar size={12} className="mr-1" />
                                    {selectedProject.date}
                                  </span>
                                )}
                                <div className="h-4 w-px bg-slate-700"></div>
                                {selectedProject.tags?.map((tag, i) => (
                                    <span key={i} className="flex items-center text-xs text-game-secondary bg-game-secondary/10 px-2 py-1 rounded border border-game-secondary/20">
                                        <Tag size={10} className="mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="w-12 h-1 bg-game-accent mb-6" />

                            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                {selectedProject.description || "暂无详细描述..."}
                            </p>

                            <div className="mt-8">
                                <button className="text-sm font-mono text-slate-500 hover:text-white transition-colors cursor-not-allowed">
                                    // VIEW_SOURCE_CODE (Private)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
};

export default ProjectUniverse;