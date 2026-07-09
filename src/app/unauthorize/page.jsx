"use client";

import Link from "next/link";
import { Card, Button, Chip, Separator } from "@heroui/react";
import { motion } from "framer-motion";
import { FaLock, FaHome, FaBookOpen, FaSignInAlt } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const iconVariants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.35, ease: "easeOut" },
  }),
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-background">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border border-default-100 shadow-sm rounded-2xl bg-content1">
          <div className="p-8 flex flex-col items-center text-center gap-0">

            {/* ── Lock icon with ping ring ── */}
            <motion.div
              className="relative flex items-center justify-center w-[72px] h-[72px] mb-6"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-danger/10 flex items-center justify-center z-10 relative">
                <FaLock size={26} className="text-danger" aria-hidden="true" />
              </div>
              <span className="absolute inset-0 rounded-full border border-danger/30 animate-ping opacity-40" />
            </motion.div>

            {/* ── 403 badge ── */}
            <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
              <Chip
                size="sm"
                variant="flat"
                color="danger"
                className="mb-4 font-mono font-semibold tracking-widest text-[11px]"
              >
                403 Forbidden
              </Chip>
            </motion.div>

            {/* ── Heading ── */}
            <motion.h1
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2"
            >
              Access denied
            </motion.h1>

            {/* ── Description ── */}
            <motion.p
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-sm text-default-500 leading-relaxed max-w-xs mb-6"
            >
              Your account doesn&apos;t have permission to view this page.
              Sign in with an authorized account to continue.
            </motion.p>

            <Separator className="mb-6" />

            {/* ── Action buttons ── */}
            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3 w-full justify-center"
            >
              <Link
                href="/"
                color="primary"
                variant="solid"
                radius="lg"
                size="md"
                startContent={<FaHome size={13} />}
                className="font-semibold"
              >
                Go to home
              </Link>

              <Link 
                href="/browse?page=1"
                color="default"
                variant="flat"
                radius="lg"
                size="md"
                startContent={<FaBookOpen size={13} />}
                className="font-semibold"
              >
                Browse books
              </Link>
            </motion.div>

          </div>
        </Card>
      </motion.div>
    </div>
  );
}