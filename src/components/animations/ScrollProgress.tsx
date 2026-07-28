"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the dashoffset for the diamond. Total length is approx 100.
  // When progress is 0, offset is 100. When progress is 1, offset is 0.
  const pathLength = 100;
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);

  return (
    <div className="fixed right-7 top-1/2 -translate-y-1/2 z-[900] w-[34px] h-[44px] hidden lg:block">
      <svg viewBox="0 0 40 52" className="w-full h-full">
        {/* Background outline */}
        <polygon 
          points="20,2 38,26 20,50 2,26" 
          fill="none" 
          stroke="rgba(18,15,14,0.2)" 
          strokeWidth="2"
        />
        {/* Progress outline */}
        <motion.polygon 
          points="20,2 38,26 20,50 2,26" 
          fill="none" 
          stroke="#E1261C" 
          strokeWidth="2"
          strokeDasharray={pathLength}
          style={{ strokeDashoffset }}
        />
      </svg>
    </div>
  );
}
