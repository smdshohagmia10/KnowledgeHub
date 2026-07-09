'use client';

import { useEffect } from 'react';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Apni chaile ekhane kono error logging service (like Sentry) integrate korte paren
    console.error('Caught an application error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-background text-foreground">
      {/* Animated Icon Wrapper */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center text-center max-w-md p-8 rounded-3xl border border-divider/50 bg-content1/50 backdrop-blur-md shadow-xl"
      >
        {/* Error Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="p-4 bg-danger-50 text-danger rounded-full text-4xl mb-6"
        >
          <FaExclamationTriangle />
        </motion.div>

        {/* Heading */}
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Something went wrong!
        </h2>
        
        {/* Description */}
        <p className="text-default-500 text-sm mb-8 leading-relaxed">
          An unexpected error occurred while processing your request. Our team has been notified, and we are working to fix this.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button
            color="primary"
            variant="solid"
            startContent={<FaRedo className="text-xs" />}
            className="font-medium shadow-lg shadow-primary/20"
            onPress={() => reset()}
          >
            Try Again
          </Button>
          
          <Button
            as={Link}
            href="/"
            color="default"
            variant="flat"
            startContent={<FaHome />}
            className="font-medium"
          >
            Go Back Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}