"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function HeroBanner() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Discover Your Next Great Adventure",
      subtitle: "Explore thousands of books, digital archives, and curated knowledge hubs right at your fingertips.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&auto=format&fit=crop", 
      ctaText: "Browse Books",
      ctaHref: "/browse?page=1",
    },
    {
      id: 2,
      title: "Your Cozy Sanctuary for Learning",
      subtitle: "Dive deep into specialized study materials, research papers, and modern literature in a distraction-free environment.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1920&auto=format&fit=crop",
      ctaText: "Browse Books",
      ctaHref: "/browse?page=1",
    },
    {
      id: 3,
      title: "Empower Your Mind, Step by Step",
      subtitle: "Join a community of passionate readers and lifelong learners. Track your progress and expand your expertise.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920&auto=format&fit=crop",
      ctaText: "Join for Free",
      ctaHref: "#",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 1.02,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    exit: (dir) => ({
      zIndex: 0,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full h-[70vh] md:h-[85vh] relative bg-zinc-950 overflow-hidden group">

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${currentSlide.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="mx-auto max-w-5xl w-full px-6 md:px-12 flex flex-col items-start gap-4 md:gap-6 pointer-events-auto">
          
          <motion.div 
            key={`badge-${currentIndex}`}
            initial="hidden" animate="visible" variants={contentVariants}
            className="flex items-center gap-2 bg-orange-500/20 text-orange-400 font-medium text-xs px-3 py-1.5 rounded-full border border-orange-500/30 backdrop-blur-md uppercase tracking-wider"
          >
            <FiBookOpen /> KnowledgeHub Library
          </motion.div>

          <motion.h1 
            key={`title-${currentIndex}`}
            initial="hidden" animate="visible" variants={contentVariants}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-2xl leading-tight select-none"
          >
            {currentSlide.title.split(" ").map((word, i) => 
              word === "Adventure" || word === "Sanctuary" || word === "Mind" ? (
                <span key={i} className="text-orange-500"> {word}</span>
              ) : ` ${word}`
            )}
          </motion.h1>

          <motion.p 
            key={`sub-${currentIndex}`}
            initial="hidden" animate="visible" variants={contentVariants}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 text-sm md:text-lg max-w-xl leading-relaxed"
          >
            {currentSlide.subtitle}
          </motion.p>

          <motion.div 
            key={`btns-${currentIndex}`}
            initial="hidden" animate="visible" variants={contentVariants}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mt-2"
          >
            <Link
             
              href={currentSlide.ctaHref}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-2 text-sm md:text-base"
            >
              {currentSlide.ctaText} <FiArrowRight />
            </Link>
            <Button
              as={Link}
              href="#"
              variant="bordered"
              className="border-white/30 text-white hover:bg-white/10 font-medium px-6 py-5 rounded-lg transition-all text-sm md:text-base"
            >
              Learn More
            </Button>
          </motion.div>

        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/20 hover:bg-black/50 text-white border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/20 hover:bg-black/50 text-white border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-350 ${
              index === currentIndex ? "w-6 bg-orange-500" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}