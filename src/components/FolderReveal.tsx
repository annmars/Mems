import { motion } from 'motion/react';
import { Folder } from 'lucide-react';

interface FolderRevealProps {
  onFolderClick: () => void;
}

export function FolderReveal({ onFolderClick }: FolderRevealProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className="cursor-pointer"
        onClick={onFolderClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Folder icon with glow effect */}
          <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-50 rounded-full" />
          <Folder 
            className="relative w-32 h-32 sm:w-40 sm:h-40 text-yellow-100 drop-shadow-2xl"
            strokeWidth={1.5}
            fill="rgba(251, 191, 36, 0.3)"
          />
          
          {/* Tap hint */}
          <motion.p
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white whitespace-nowrap"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to open
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
