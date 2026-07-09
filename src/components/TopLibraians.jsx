"use client";

import React from 'react';
import Image from 'next/image';
import { FiBookOpen, FiAward } from 'react-icons/fi';
import { Surface } from "@heroui/react";
import { motion } from "framer-motion";

const TopLibrarians = () => {
  const librarians = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Chief Archivist",
      booksManaged: "4,500+ Books",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "David Miller",
      role: "Digital Content Curator",
      booksManaged: "3,200+ Books",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Research Specialist",
      booksManaged: "2,800+ Books",
      rating: "5.0",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Marcus Thorne",
      role: "Library Director",
      booksManaged: "5,100+ Books",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const duplicatedLibrarians = [...librarians, ...librarians, ...librarians];

  return (
    <section className="w-full bg-background py-12 md:py-20 overflow-hidden">
      <div className="mx-auto px-6">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <FiAward /> Expert Curators
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Meet Our Top <span className="text-orange-500">Librarians</span>
          </h2>
          <p className="text-muted text-sm mt-2 max-w-md mx-auto">
            Those who are continuously contributing to organizing our platform's information and books perfectly.
          </p>
        </div>
        <div className="relative w-full overflow-hidden mask-gradient">
          
          <motion.div 
            className="flex gap-6 w-max py-4"
            animate={{
              x: ["0%", "-33.33%"] 
            }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedLibrarians.map((librarian, index) => (
              <motion.div
                key={`${librarian.id}-${index}`}
                whileHover={{ y: -5 }} 
                className="w-[280px] sm:w-[300px] flex-shrink-0"
              >
                <Surface 
                  variant="default" 
                  className="group relative flex flex-col items-center text-center p-6 rounded-3xl border border-divider shadow-sm hover:shadow-md hover:border-orange-500/30 transition-colors duration-300"
                >
                  <span className="absolute top-4 right-4 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 font-bold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                    ★ {librarian.rating}
                  </span>

                  <div className="relative w-24 h-24 rounded-full p-1 border-2 border-divider group-hover:border-orange-500 transition-colors duration-300 mb-4 overflow-hidden">
                    <Image
                      src={librarian.image}
                      alt={librarian.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-full"
                      unoptimized
                    />
                  </div>

                  <h3 className="font-bold text-lg text-foreground group-hover:text-orange-500 transition-colors duration-200">
                    {librarian.name}
                  </h3>
                  <p className="text-xs font-medium text-orange-500/80 dark:text-orange-400/80 mt-0.5">
                    {librarian.role}
                  </p>

                  <div className="flex items-center gap-1.5 text-muted text-xs mt-4 bg-zinc-100 dark:bg-zinc-800/60 px-3 py-1.5 rounded-full w-fit">
                    <FiBookOpen size={13} className="text-orange-500" />
                    <span>{librarian.booksManaged}</span>
                  </div>
                </Surface>
              </motion.div>
            ))}
          </motion.div>
          
        </div>

      </div>
    </section>
  );
};

export default TopLibrarians;