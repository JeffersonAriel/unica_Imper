"use client";

import React from "react";
import { motion } from "framer-motion";

export function MarqueeStrip() {
  const items = [
    "Impermeabilização com garantia",
    "Pisos industriais de alta resistência",
    "Revitalização premium",
    "Qualidade Única desde 1999",
    "Soluções definitivas",
  ];

  // Duplicate items to ensure smooth infinite scroll
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-red text-paper py-4 overflow-hidden whitespace-nowrap">
      <motion.div 
        className="inline-flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {marqueeItems.map((item, index) => (
          <span 
            key={index}
            className="font-heading font-bold text-[15px] uppercase tracking-[0.04em] px-7 inline-flex items-center gap-7 after:content-['◆'] after:text-[10px] after:opacity-70"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
