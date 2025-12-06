import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PolaroidMemory } from './components/PolaroidMemory';

const memories = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1672855134530-636c3fe6476a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBtZW1vcnl8ZW58MXx8fHwxNzY1MDA2MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Adventure awaits',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1647962431451-d0fdaf1cf21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjQ5NDEwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Sunset moments',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1640195280260-63f11c5a5e87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2NTAwNjExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'City lights',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1692311428417-7a21a82b1a68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBoaWtpbmd8ZW58MXx8fHwxNzY0OTA5NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Into the wild',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1682496039948-ab599c31a8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlubmVyfGVufDF8fHx8MTc2NTAwNjExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Dinner for two',
  },
];

export default function App() {
  const [stage, setStage] = useState<'intro' | 'preview' | 'polaroid'>('intro');
  const [selectedMemories, setSelectedMemories] = useState<typeof memories>([]);
  const [finalMemory, setFinalMemory] = useState<typeof memories[0] | null>(null);

  const handleFolderClick = () => {
    // Select 3 random memories
    const shuffled = [...memories].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    setSelectedMemories(selected);
    setStage('preview');

    // After 1 second, show one random Polaroid
    setTimeout(() => {
      const randomMemory = selected[Math.floor(Math.random() * selected.length)];
      setFinalMemory(randomMemory);
      setStage('polaroid');
    }, 1000);
  };

  const handleReset = () => {
    setStage('intro');
    setSelectedMemories([]);
    setFinalMemory(null);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-green-400 via-blue-400 to-green-400 relative">
      {/* Animated wave background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 w-full h-full opacity-40"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="#ffffff"
            fillOpacity="0.4"
            d="M0,200L1440,200L1440,400L0,350Z"
            animate={{
              d: [
                'M0,200L1440,200L1440,400L0,350Z',
                'M0,250L1440,180L1440,380L0,400Z',
                'M0,200L1440,200L1440,400L0,350Z',
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center pt-32 min-h-screen px-6"
          >
            {/* Yellow Folder Icon */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFolderClick}
              className="flex flex-col items-center gap-4"
            >
              {/* Folder shape */}
              <div className="relative">
                {/* Folder tab */}
                <div className="absolute -top-4 left-8 w-24 h-6 bg-yellow-400 rounded-t-lg shadow-md" />
                {/* Folder body */}
                <div className="w-56 h-44 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg shadow-2xl" />
              </div>
              
              {/* Label */}
              <div className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg">
                daily ann &amp; clement memories
              </div>
            </motion.button>
          </motion.div>
        )}

        {stage === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12"
          >
            {/* Yellow Folder in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8">
              <div className="relative">
                <div className="absolute -top-4 left-8 w-24 h-6 bg-yellow-400 rounded-t-lg shadow-md" />
                <div className="w-56 h-44 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg shadow-2xl" />
              </div>
            </div>

            {/* Polaroids coming out horizontally */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-32 flex items-center justify-center">
              {selectedMemories.map((memory, index) => {
                const positions = [
                  { x: -100, rotate: -15 },
                  { x: 0, rotate: 0 },
                  { x: 100, rotate: 15 },
                ];
                return (
                  <motion.div
                    key={memory.id}
                    initial={{ y: 150, x: 0, opacity: 0, rotate: 0, scale: 0.5 }}
                    animate={{ 
                      y: 0,
                      x: positions[index].x,
                      opacity: 1, 
                      rotate: positions[index].rotate,
                      scale: 1,
                    }}
                    transition={{ 
                      delay: index * 0.08, 
                      duration: 0.4,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="absolute bg-white p-3 shadow-2xl"
                    style={{ 
                      width: '140px',
                      zIndex: index === 1 ? 3 : 2,
                    }}
                  >
                    <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={memory.image}
                        alt={memory.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Label */}
            <div className="absolute bottom-32 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg">
              daily ann &amp; clement memories
            </div>
          </motion.div>
        )}

        {stage === 'polaroid' && finalMemory && (
          <motion.div
            key="polaroid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12"
          >
            <PolaroidMemory
              image={finalMemory.image}
              caption={finalMemory.caption}
              onClose={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}