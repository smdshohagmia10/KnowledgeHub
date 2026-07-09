"use client"

import React from 'react';
import Link from 'next/link';
import { FiBook, FiCpu, FiAward, FiHeart, FiCompass, FiBriefcase } from 'react-icons/fi';

const TrendingCategories = () => {
  // ট্রেন্ডিং ক্যাটাগরির ডাটা (আইকন এবং কালারসহ)
  const categories = [
    {
      id: 1,
      title: "Fiction & Sci-Fi",
      count: "1,240 Books",
      icon: <FiCompass size={24} />,
      href: "/browse?page=1&category=fiction",
      bgClass: "bg-blue-50 dark:bg-blue-950/30 text-blue-500",
    },
    {
      id: 2,
      title: "Technology & Coding",
      count: "850 Books",
      icon: <FiCpu size={24} />,
      href: "/browse?page=1&category=technology",
      bgClass: "bg-orange-50 dark:bg-orange-950/30 text-orange-500",
    },
    {
      id: 3,
      title: "Self-Development",
      count: "930 Books",
      icon: <FiAward size={24} />,
      href: "/browse?page=1&category=self-development",
      bgClass: "bg-green-50 dark:bg-green-950/30 text-green-500",
    },
    {
      id: 4,
      title: "Business & Finance",
      count: "620 Books",
      icon: <FiBriefcase size={24} />,
      href: "/browse?page=1&category=business",
      bgClass: "bg-purple-50 dark:bg-purple-950/30 text-purple-500",
    },
    {
      id: 5,
      title: "Biography & History",
      count: "410 Books",
      icon: <FiBook size={24} />,
      href: "/browse?page=1&category=history",
      bgClass: "bg-amber-50 dark:bg-amber-950/30 text-amber-500",
    },
    {
      id: 6,
      title: "Romance & Poetry",
      count: "580 Books",
      icon: <FiHeart size={24} />,
      href: "/browse?page=1&category=romance",
      bgClass: "bg-pink-50 dark:bg-pink-950/30 text-pink-500",
    },
  ];

  return (
    <section className="w-full bg-background py-12 md:py-20">
      <div className="mx-auto px-6">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div >
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
              Trending <span className="text-orange-500">Categories</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Explore the most popular topics loved by readers.
            </p>
          </div>
          <Link 
            href="/browse?page=1" 
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            See All Categories &rarr;
          </Link>
        </div>

        {/* ক্যাটাগরি গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 shadow-sm hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* আইকন কন্টেইনার */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300 ${category.bgClass} group-hover:bg-orange-500 group-hover:text-white`}>
                {category.icon}
              </div>

              {/* টেক্সট কন্টেন্ট */}
              <div className="flex flex-col">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-orange-500 transition-colors duration-200">
                  {category.title}
                </span>
                <span className="text-xs text-zinc-400 mt-0.5">
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingCategories;