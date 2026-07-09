'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  // Stagger animation setups
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0.3 },
    animate: {
      y: [-6, 6, -6],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background px-4">
      
      {/* Central Card Layout with Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm p-6 rounded-2xl bg-content1 border border-divider/40 flex flex-col items-center shadow-sm"
      >
        {/* Animated Bar Grid - Simulating content loading */}
        <div className="w-full space-y-3 mb-6">
          <div className="h-3 w-1/3 bg-default-200/50 rounded-full animate-pulse" />
          <div className="h-2 w-full bg-default-100/70 rounded-full animate-pulse" />
          <div className="h-2 w-5/6 bg-default-100/70 rounded-full animate-pulse" />
        </div>

        <div className="flex flex-col items-center gap-2">
          {/* Custom Staggered Text Loader */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex items-center gap-1.5"
          >
            <span className="text-sm font-semibold tracking-wider text-default-600 uppercase">
              Loading
            </span>
            
            {/* 3 Bouncing Dots */}
            <div className="flex gap-1 items-center h-3 pt-1">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  variants={dotVariants}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
              ))}
            </div>
          </motion.div>

          <p className="text-xs text-default-400">Please wait a moment</p>
        </div>
      </motion.div>

      {/* Subtle bottom brand text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 text-xs tracking-widest text-default-400 font-mono"
      >
        SECURE DATA PROCEEDING...
      </motion.div>
    </div>
  );
}