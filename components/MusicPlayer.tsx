
import React, { useState, useRef, useEffect } from 'react';
import { ASSETS, DEFAULT_MUSIC_PLAYLIST } from '../constants';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Music, 
  ChevronsRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch playlist on mount and Auto-Play
  useEffect(() => {
    const fetchPlaylist = async () => {
        let list = DEFAULT_MUSIC_PLAYLIST;
        try {
            const response = await fetch(ASSETS.data.music);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    list = data;
                }
            }
        } catch (e) {
            console.warn("Failed to load remote music playlist, using default.");
        }
        setPlaylist(list);
        // Intent: Auto-play immediately upon loading
        setIsPlaying(true);
    };
    fetchPlaylist();
  }, []);

  // Centralized Playback Control with Policy Handling
  useEffect(() => {
    if (!audioRef.current || playlist.length === 0) return;

    // Ensure volume
    if (audioRef.current.volume !== 0.3) audioRef.current.volume = 0.3;

    if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
           playPromise.catch(e => {
               // If blocked by browser policy (NotAllowedError), we revert UI to paused
               // BUT we attach a one-time listener to the document to start it on first user interaction
               if (e.name === 'NotAllowedError') {
                   console.warn("Auto-play blocked. Waiting for user interaction.");
                   setIsPlaying(false);
                   
                   const handleInteraction = () => {
                       // Resume playback state on first click/key/touch
                       setIsPlaying(true);
                       // Clean up listeners
                       document.removeEventListener('click', handleInteraction);
                       document.removeEventListener('keydown', handleInteraction);
                       document.removeEventListener('touchstart', handleInteraction);
                   };

                   // Listen for any interaction
                   document.addEventListener('click', handleInteraction);
                   document.addEventListener('keydown', handleInteraction);
                   document.addEventListener('touchstart', handleInteraction);
               } else {
                   // Other errors (e.g. load interrupt) are ignored to prevent UI flickering
                   console.debug("Playback interrupted", e);
               }
           });
        }
    } else {
        audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex, playlist]);

  const handleTrackEnd = () => {
    playNext();
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    setLoadError(false);
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleError = () => {
      if (playlist.length === 0) return;
      console.warn(`Failed to load track: ${playlist[currentTrackIndex]}`);
      setLoadError(true);
      // Optional: Auto-skip on error
      // setTimeout(() => playNext(), 1000); 
  };

  const getTrackName = (url: string) => {
    try {
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        return decodeURIComponent(filename.split('.')[0]) || `Track ${currentTrackIndex + 1}`;
    } catch (e) {
        return `Track ${currentTrackIndex + 1}`;
    }
  };

  if (playlist.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={handleTrackEnd}
        onError={handleError}
      />

      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized State */
          <motion.button
            key="minimized"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMinimized(false)}
            className={`w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all ${
              isPlaying ? 'bg-game-accent/20 border-game-accent' : 'bg-slate-900'
            }`}
          >
            {isPlaying ? (
              <div className="relative">
                <Music size={20} className="text-game-secondary animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
              </div>
            ) : (
              <Music size={20} className="text-slate-500" />
            )}
          </motion.button>
        ) : (
          /* Expanded Player */
          <motion.div
            key="expanded"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-full p-2 pr-6 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          >
            {/* Visualizer / Art */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 border ${isPlaying ? 'border-game-secondary bg-game-secondary/10' : 'border-slate-700 bg-slate-800'}`}>
                {isPlaying ? (
                     <div className="flex gap-[2px] items-end h-4">
                        {[1,2,3,4].map(i => (
                             <motion.div 
                                key={i}
                                animate={{ height: [4, 12, 6, 16, 8] }}
                                transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "linear" }}
                                className="w-1 bg-game-secondary rounded-t-sm"
                             />
                        ))}
                     </div>
                ) : (
                    <Music size={18} className="text-slate-500" />
                )}
            </div>

            {/* Controls */}
            <div className="flex flex-col mr-4 min-w-[120px]">
                <div className="flex items-center justify-between mb-1">
                     <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase truncate max-w-[100px]">
                        {loadError ? "ERR_LOAD" : getTrackName(playlist[currentTrackIndex])}
                     </span>
                </div>
                
                <div className="flex items-center gap-2">
                    <button onClick={togglePlay} className="text-white hover:text-game-accent transition">
                        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                    </button>
                    <button onClick={playNext} className="text-slate-400 hover:text-white transition">
                        <SkipForward size={16} />
                    </button>
                    <div className="w-px h-3 bg-slate-700 mx-1" />
                    <button onClick={toggleMute} className="text-slate-400 hover:text-white transition">
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                </div>
            </div>

            {/* Minimize */}
            <button 
                onClick={() => setIsMinimized(true)}
                className="p-1.5 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition"
            >
                <ChevronsRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
