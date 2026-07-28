"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.9,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  return (
    <span ref={ref} className={cn("block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "115%" }}
        animate={isInView ? { y: 0 } : { y: "115%" }}
        transition={{
          duration,
          delay,
          ease: [0.2, 0.9, 0.2, 1],
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}
