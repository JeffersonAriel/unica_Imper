"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function WaterTestAnimation() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden relative mt-16 mb-24"
    >
      {/* Test Header */}
      <div className="bg-stone-50 border-b border-stone-100 p-6 text-center">
        <h3 className="font-heading font-black text-xl md:text-2xl text-ink uppercase tracking-tight">
          Teste de Estresse: Inundação
        </h3>
        <p className="text-sm text-stone-500 uppercase tracking-widest mt-1 font-bold">
          Manta Asfáltica vs Poliuretano (PU)
        </p>
      </div>

      <div className="grid grid-cols-2 relative h-[400px] md:h-[500px]">
        {/* === LEFT SIDE: MANTA ASFÁLTICA === */}
        <div className="relative border-r border-stone-200 bg-stone-50 overflow-hidden flex flex-col">
          {/* Label */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-ink text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              Manta Asfáltica
            </span>
          </div>

          {/* Top Section (Water Accumulation) */}
          <div className="flex-1 relative overflow-hidden flex items-end">
            <motion.div
              initial={{ height: "0%" }}
              animate={isInView ? { height: "70%" } : { height: "0%" }}
              transition={{ duration: 3, ease: "easeInOut" as const }}
              className="absolute bottom-0 left-0 w-full bg-[#0284c7]/20 backdrop-blur-[2px]"
            >
              {/* Wave SVG */}
              <motion.svg
                className="absolute -top-[20px] left-0 w-[200%] h-[40px] text-[#0284c7]/20"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" as const }}
              >
                <path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,120 L0,120 Z" fill="currentColor"></path>
              </motion.svg>
            </motion.div>
          </div>

          {/* The Barrier (Manta) - Clean minimalist design */}
          <div className="h-10 relative z-10 flex items-center justify-center border-y-2 border-stone-900 bg-stone-800">
            {/* Cracks Animation */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <motion.path
                d="M 20,0 L 25,10 L 15,20 L 30,40"
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="transparent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.5, delay: 3 }}
              />
              <motion.path
                d="M 70,0 L 65,15 L 75,25 L 60,40"
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="transparent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.5, delay: 3.5 }}
              />
              <motion.path
                d="M 120,0 L 130,12 L 110,22 L 125,40"
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="transparent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.5, delay: 4 }}
              />
            </svg>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Emendas</span>
          </div>

          {/* Bottom Section (Leaking) */}
          <div className="flex-[1.2] relative bg-stone-100 flex items-end justify-center pb-8">
            {/* Leaking Drops (Elegant simple shapes) */}
            <div className="absolute top-0 left-0 w-full h-full">
              {[28, 65, 122].map((x, i) => (
                <div key={i} className="absolute h-full" style={{ left: `${x}px`, top: 0 }}>
                  <motion.div
                    className="w-2 h-3 bg-[#0284c7]/80 rounded-full"
                    initial={{ y: 0, opacity: 0, scale: 0 }}
                    animate={isInView ? { y: [0, 160], opacity: [0, 1, 0], scale: [0, 1, 1] } : {}}
                    transition={{ 
                      duration: 1.1, 
                      repeat: Infinity, 
                      delay: 4.5 + (i * 0.3),
                      ease: "easeIn" as const
                    }}
                  />
                  {/* Splash Ring (Subtle) */}
                  <motion.div
                    className="absolute bottom-10 -ml-1 w-4 h-1 border border-[#0284c7]/40 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: [0, 1, 0], scale: [0, 1, 3] } : {}}
                    transition={{ 
                      duration: 0.6, 
                      repeat: Infinity, 
                      delay: 5.5 + (i * 0.3),
                      ease: "easeOut" as const
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Puddle */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 4, delay: 5 }}
              className="w-[80%] h-12 bg-[#0284c7]/20 rounded-[100%] blur-[2px] absolute bottom-2"
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 6 }}
              className="absolute bottom-1/2 translate-y-1/2 text-center"
            >
              <span className="text-red font-bold uppercase tracking-widest text-xs md:text-sm bg-red/10 px-4 py-2 rounded-lg border border-red/20">
                FALHA E INFILTRAÇÃO
              </span>
            </motion.div>
          </div>
        </div>

        {/* === RIGHT SIDE: POLIURETANO === */}
        <div className="relative bg-stone-50 overflow-hidden flex flex-col">
          {/* Label */}
          <div className="absolute top-4 right-4 z-20">
            <span className="bg-red text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg">
              Poliuretano Única
            </span>
          </div>

          {/* Top Section (Water Accumulation) */}
          <div className="flex-1 relative overflow-hidden flex items-end">
             <motion.div
              initial={{ height: "0%" }}
              animate={isInView ? { height: "70%" } : { height: "0%" }}
              transition={{ duration: 3, ease: "easeInOut" as const }}
              className="absolute bottom-0 left-0 w-full bg-[#0284c7]/20 backdrop-blur-[2px]"
            >
              {/* Wave SVG */}
              <motion.svg
                className="absolute -top-[20px] left-0 w-[200%] h-[40px] text-[#0284c7]/20"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" as const }}
              >
                <path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,120 L0,120 Z" fill="currentColor"></path>
              </motion.svg>
            </motion.div>
          </div>

          {/* The Barrier (PU) - Clean minimalist design */}
          <div className="h-10 bg-red relative z-10 flex items-center justify-center border-y-2 border-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <span className="text-[10px] text-white uppercase tracking-widest font-black relative z-10">Monolítico</span>
          </div>

          {/* Bottom Section (100% Dry) */}
          <div className="flex-[1.2] relative bg-stone-100 flex items-center justify-center">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-600 font-bold uppercase tracking-widest text-xs md:text-sm">
                100% SECO E SEGURO
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
