"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/animations/TextReveal";
import { UnicaSeal } from "@/components/ui/UnicaSeal";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] bg-ink text-paper flex flex-col justify-center pt-[140px] pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 64px)'
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr] gap-[60px] items-center">
          {/* Text Content */}
          <div>
            <h1 className="font-heading font-black text-[clamp(46px,6.2vw,92px)] leading-[0.98] tracking-[-0.02em] uppercase mb-[26px]">
              <TextReveal text="Impermeabilização" delay={0.35} />
              <TextReveal text="Definitiva." delay={0.48} className="text-red" />
            </h1>
            
            <motion.p 
              className="max-w-[440px] text-[17px] leading-[1.7] text-paper/70 mb-9"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: "easeOut" }}
            >
              Protegendo o que importa com tecnologia de ponta e acabamento premium para residências e empresas exigentes.
            </motion.p>
            
            <motion.div 
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: "easeOut" }}
            >
              <Button variant="solid" href="#contato">
                Falar com especialista
              </Button>
              <Button variant="ghost" href="#servicos">
                Nossos serviços
              </Button>
            </motion.div>
          </div>

          {/* Visual / Seal */}
          <motion.div 
            className="relative flex items-center justify-center lg:order-last order-first max-w-[220px] lg:max-w-none mx-auto"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.1, ease: "easeOut" }}
          >
            <div className="relative w-full flex justify-center lg:justify-end drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
              <UnicaSeal className="text-red scale-110 lg:scale-[1.6] origin-center" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-7 left-10 flex items-center gap-2.5 text-[11px] tracking-[0.14em] uppercase text-paper/55 z-10 hidden md:flex">
        <span>Scroll</span>
        <div className="w-[1px] h-[34px] bg-paper/30 relative overflow-hidden">
          <motion.div 
            className="absolute top-[-100%] left-0 w-full h-full bg-red"
            animate={{ top: ["-100%", "0%", "100%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
