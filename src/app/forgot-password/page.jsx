'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { FaClock, FaArrowLeft, FaTools } from 'react-icons/fa';
import Link from 'next/link';

const ForgetPasswordPage = () => {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 bg-background text-foreground relative overflow-hidden">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-warning/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="z-10 flex flex-col items-center text-center max-w-md p-8 rounded-3xl border border-divider/60 bg-content1/40 backdrop-blur-md shadow-xl"
      >
        {/* Animated Badge Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="p-4 bg-warning-50 text-warning rounded-2xl text-3xl mb-6 shadow-sm flex items-center justify-center"
        >
          <FaTools className="animate-pulse" />
        </motion.div>

        {/* Highlight Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-default-100 text-default-600 text-xs font-mono mb-4 border border-divider/30">
          <FaClock className="text-warning text-[10px]" />
          <span>UNDER CONSTRUCTION</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
          Coming Soon
        </h2>
        
        {/* Description */}
        <p className="text-default-500 text-sm mb-8 leading-relaxed">
          We are currently rebuilding our credential recovery architecture to provide maximum security. The <span className="font-semibold text-foreground">Password Reset</span> feature will be live shortly.
        </p>

        {/* Navigation Action */}
        <div className="w-full">
          <Link
            
            href="/login"
            color="primary"
            variant="flat"
            startContent={<FaArrowLeft className="text-xs" />}
            className="font-medium w-full sm:w-auto"
          >
            Back to Sign In
          </Link>
        </div>
      </motion.div>

      {/* Footer System Status Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-8 text-xs font-mono tracking-widest text-default-400 uppercase"
      >
        Security Upgrade v2.4.0
      </motion.p>
    </div>
  );
};

export default ForgetPasswordPage;