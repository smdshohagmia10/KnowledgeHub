'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';

const LOADING_STATUSES = [
  "Securing server handshake...",
  "Loading global modules...",
  "Optimizing layout resources...",
  "Finalizing interface elements..."
];

export default function Loading() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % LOADING_STATUSES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Neo-Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Futuristic Scanner Ring Container */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          
          {/* Outer Ring: Slow Clockwise Rotate */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
          />

          {/* Middle Glow Ring: Counter-Clockwise Rotate */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border border-gradient-to-r from-primary via-secondary/50 to-transparent rounded-full opacity-80"
            style={{
              borderImage: 'linear-gradient(to right, var(--tw-gradient-stops)) 1',
              borderRadius: '50%'
            }}
          />

          {/* Inner Fast Scanning Pulsing Ring */}
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-[2px]"
          />

          {/* Core Branding/Shield Icon */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 text-3xl text-primary"
          >
            <FaShieldAlt />
          </motion.div>
        </div>

        {/* Dynamic Loading Status Messages */}
        <div className="h-14 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-default-700 font-medium text-base tracking-wide"
            >
              {LOADING_STATUSES[statusIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Percentage Progress Simulation (Subtle Detail) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-xs text-default-400 mt-2 font-mono"
          >
            SYSTEM STATUS: RUNNING
          </motion.p>
        </div>
      </div>
    </div>
  );
}