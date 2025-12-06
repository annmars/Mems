import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface PolaroidMemoryProps {
  image: string;
  caption: string;
  onClose: () => void;
}

export function PolaroidMemory({ image, caption, onClose }: PolaroidMemoryProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', duration: 0.7 }}
      className="relative max-w-sm w-full"
    >
      {/* Polaroid frame */}
      <div className="bg-white p-4 pb-16 shadow-2xl rounded-sm relative">
        {/* Image */}
        <div className="w-full aspect-square bg-gray-100 overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            src={image}
            alt={caption}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-4 right-4 text-center"
        >
          <p className="text-gray-700 italic">{caption}</p>
        </motion.div>

        {/* Tape effect on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm rotate-0" />
      </div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onClose}
        className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-6 h-6 text-gray-700" />
      </motion.button>
    </motion.div>
  );
}
