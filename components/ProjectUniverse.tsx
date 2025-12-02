import React, { useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Stars, Float, Text } from '@react-three/drei';
import { PROJECT_UNIVERSE } from '../constants';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface ImageItemProps {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  onClick: (url: string) => void;
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

const FloatingImage = ({ url, position, rotation, index, onClick }: ImageItemProps) => {
  const ref = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    // Subtle float animation independent of the group
    if (ref.current) {
        ref.current.position.y += Math.sin(state.clock.elapsedTime + index * 100) * 0.002;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Image 
            ref={ref}
            url={url} 
            transparent 
            side={THREE.DoubleSide}
            scale={hovered ? [2.4, 1.35] : [2, 1.125]} 
            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
            onClick={(e) => {
                e.stopPropagation();
                onClick(url);
            }}
            toneMapped={false}
        />
      </Float>
    </group>
  );
};

const GalaxyScene = ({ onItemClick }: { onItemClick: (url: string) => void }) => {
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
        url: item.url,
        position: [x * 1.5, y * 1.5 + (Math.random() - 0.5) * 2, z] as [number, number, number],
        rotation: [0, -theta, 0] as [number, number, number]
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <fog attach="fog" args={['#0f172a', 5, 20]} />
        
        <group ref={groupRef}>
            {items.map((item, i) => (
               <ImageErrorBoundary 
                  key={i} 
                  fallback={<FallbackPlaceholder position={item.position} rotation={[0, Math.atan2(item.position[0], item.position[2]), 0]} />}
               >
                  <Suspense fallback={<FallbackPlaceholder position={item.position} rotation={[0, Math.atan2(item.position[0], item.position[2]), 0]} />}>
                    <FloatingImage 
                        index={i}
                        url={item.url}
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="project-universe" className="relative h-[80vh] w-full bg-slate-950 overflow-hidden border-t border-slate-900">
        <div className="absolute top-8 left-0 w-full z-10 text-center pointer-events-none">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 drop-shadow-lg">
                项目宇宙
            </h2>
            <p className="text-slate-400 text-sm mt-2 opacity-80">
                拖拽旋转视角 · 点击查看详情
            </p>
        </div>

        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 2]}>
            <GalaxyScene onItemClick={setSelectedImage} />
        </Canvas>

        {/* Lightbox Modal */}
        <AnimatePresence>
            {selectedImage && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-auto"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative max-w-5xl max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-game-accent transition z-50"
                        >
                            <X size={32} />
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Project Detail"
                            className="rounded-lg shadow-2xl border border-slate-700 max-h-[80vh] object-contain"
                            onError={(e) => {
                                e.currentTarget.src = "https://picsum.photos/800/600";
                            }}
                        />
                        <div className="mt-4 text-center">
                            <span className="text-slate-300 bg-slate-800/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-slate-700">
                                Project Detail
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
};

export default ProjectUniverse;