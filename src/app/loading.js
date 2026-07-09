"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCode } from "react-icons/fa";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const ringVariants = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1.4, ease: "linear" },
  },
};

const reverseRingVariants = {
  animate: {
    rotate: -360,
    transition: { repeat: Infinity, duration: 2.2, ease: "linear" },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.25, 1],
    opacity: [0.7, 1, 0.7],
    transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
  },
};

const dotVariants = {
  animate: (i) => ({
    opacity: [0.3, 1, 0.3],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      delay: i * 0.2,
      ease: "easeInOut",
    },
  }),
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function LoadingPage() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/85 backdrop-blur-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* ── Spinner Stack ── */}
        <motion.div variants={itemVariants} className="relative flex items-center justify-center">

          {/* Outermost ambient ring */}
          <motion.div
            className="absolute h-28 w-28 rounded-full border border-primary/10"
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          />

          {/* Outer slow reverse ring */}
          <motion.div
            className="absolute h-24 w-24 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "hsl(var(--heroui-primary) / 0.25)",
              borderLeftColor: "hsl(var(--heroui-primary) / 0.25)",
            }}
            variants={reverseRingVariants}
            animate="animate"
          />

          {/* Primary spinning ring */}
          <motion.div
            className="absolute h-20 w-20 rounded-full border-[3px] border-transparent"
            style={{
              borderTopColor: "hsl(var(--heroui-primary))",
              borderRightColor: "hsl(var(--heroui-primary) / 0.6)",
            }}
            variants={ringVariants}
            animate="animate"
          />

          {/* Static track ring */}
          <div className="absolute h-20 w-20 rounded-full border-[3px] border-primary/10" />

          {/* Inner decorative ring */}
          <motion.div
            className="absolute h-12 w-12 rounded-full border border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          />

          {/* Center icon */}
          <motion.div
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20"
            variants={pulseVariants}
            animate="animate"
          >
            <FaCode className="h-4 w-4 text-primary" aria-hidden="true" />
          </motion.div>
        </motion.div>

        {/* ── Text block ── */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <p className="text-base font-medium tracking-wide text-foreground">
            Loading
          </p>
          <p className="text-xs text-default-400">Please wait a moment…</p>
        </motion.div>

        {/* ── Animated dots ── */}
        <motion.div
          variants={itemVariants}
          className="mt-4 flex items-center gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={dotVariants}
              animate="animate"
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
          ))}
        </motion.div>

        {/* ── Progress bar ── */}
        <motion.div
          variants={itemVariants}
          className="mt-8 h-0.5 w-48 overflow-hidden rounded-full bg-default-100"
        >
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}