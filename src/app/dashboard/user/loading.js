'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smoothly incremental variable steps
        const randomStep = Math.floor(Math.random() * 12) + 4;
        return Math.min(prev + randomStep, 100);
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background px-6">
      
      {/* Decorative Core Glow Behind */}
      <div className="absolute w-64 h-64 bg-gradient-to-tr from-primary/10 to-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col gap-4 relative z-10">
        
        {/* Top bar info setup */}
        <div className="flex items-center justify-between border-b border-divider/40 pb-3">
          <div className="flex items-center gap-2 text-default-500">
            <FaTerminal className="text-xs text-primary animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase">Loading.data()</span>
          </div>
          <span className="text-xs font-mono font-bold text-primary">{progress}%</span>
        </div>

        {/* Custom Progress Bar Tracking System */}
        <div className="h-[6px] w-full bg-default-100 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-linear-to-r from-primary to-secondary-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Bottom Interactive Feedback Grid */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex items-center gap-1.5">
            {/* Blinking Status Indicator Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-xs text-default-400 font-mono tracking-tight">
              {progress < 40 && "Fetching database stack..."}
              {progress >= 40 && progress < 80 && "Compiling assets..."}
              {progress >= 80 && "Mounting architecture..."}
            </span>
          </div>
          
          {/* Subtle spinning accent */}
          <div className="w-3 h-3 rounded-full border border-default-300 border-t-primary animate-spin" />
        </div>

      </div>
    </div>
  );
}