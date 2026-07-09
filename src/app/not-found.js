"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaArrowLeft, FaHome, FaRegQuestionCircle } from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center  px-4 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] bg-secondary/10 rounded-full blur-[60px] -z-10 pointer-events-none" />

      <div className="max-w-xl text-center z-10 ">
        {/* Animated Icon */}
        <div className="flex justify-center ">
          <div className="relative h-28 w-28 rounded-full bg-default-100 dark:bg-default-50 flex items-center justify-center border border-default-200/50 shadow-xl group">
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <FaRegQuestionCircle className="text-5xl text-primary animate-pulse" />
          </div>
        </div>

        {/* Big 404 Text */}
        <div className="relative inline-block select-none">
          <h1 className="text-9xl md:text-[12rem] font-black tracking-tighter bg-linear-to-b from-blue-400 via-red-400 to-secondary bg-clip-text text-transparent opacity-95 leading-none">
            404
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent blur-sm" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Oops! Page Not Found
          </h2>
          <p className="max-w-md mx-auto text-default-500 text-sm md:text-base leading-relaxed">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={"/"}>
          HOME
          </Link>

          <Button
            variant="bordered"
            size="lg"
            radius="full"
            className="w-full sm:w-auto font-medium backdrop-blur-md border-default-300 hover:bg-default-100 transition-all"
            startContent={<FaArrowLeft className="text-sm" />}
            onPress={() => router.back()}
          >
            Go Back
          </Button>
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-default-100 max-w-xs mx-auto">
          <p className="text-xs tracking-wider uppercase text-default-400 font-semibold">
            Error Code: 404_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
}