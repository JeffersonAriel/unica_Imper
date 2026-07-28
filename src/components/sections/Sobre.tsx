"use client";

import React, { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { CountUp } from "@/components/animations/CountUp";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function Sobre() {
  const lampRef = useRef<HTMLDivElement>(null);
  const isLampInView = useInView(lampRef, { once: true, margin: "-20% 0px" });

  return (
    <section id="sobre-nos" className="py-[120px] bg-stone">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-20 items-center">
          
          {/* Left Column: Wall Lamp */}
          <div className="relative w-full min-h-[350px] lg:h-full flex flex-col items-start lg:items-center justify-center gap-10">
            
            {/* The Wall-Mounted Lamp SVG */}
            <div 
              ref={lampRef}
              className={cn(
                "relative w-[120px] md:w-[160px] transition-all duration-[1.5s] ease-out z-10",
                isLampInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
            >
              <svg viewBox="0 0 160 260" className="w-full drop-shadow-2xl">
                <defs>
                  <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF9D00" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#F2622E" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#F2622E" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFDD55" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF9D00" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* The Animated Flame and Glow */}
                <g className={cn("transition-opacity duration-[2s] delay-[800ms]", isLampInView ? "opacity-100" : "opacity-0")}>
                  {/* Realistic Gradient Glow - Removed screen blend mode for light background compatibility */}
                  <circle cx="85" cy="155" r="90" fill="url(#fireGlow)" className="animate-[firepulse_3s_infinite_ease-in-out]" opacity="0.4" />
                  <circle cx="85" cy="155" r="40" fill="url(#coreGlow)" className="animate-[firepulse_2s_infinite_ease-in-out_0.5s]" />
                  {/* Core Flame Shape */}
                  <path d="M 85 140 Q 95 160 85 170 Q 75 160 85 140 Z" fill="#FFFFFF" className="animate-[flameflicker_0.3s_infinite_alternate]" />
                </g>

                {/* Wall Bracket (Bronze) */}
                <rect x="0" y="20" width="12" height="70" fill="#5c3a21" rx="2" />
                <circle cx="6" cy="30" r="3" fill="#2d1c10" />
                <circle cx="6" cy="80" r="3" fill="#2d1c10" />

                {/* Curved Arm (Bronze) */}
                <path d="M 10 40 Q 60 40 85 80" fill="none" stroke="#5c3a21" strokeWidth="8" strokeLinecap="round" />
                <circle cx="85" cy="85" r="6" fill="#4a2e1a" />
                <path d="M 85 90 L 85 105" stroke="#5c3a21" strokeWidth="4" />

                {/* Lamp Cap (Bronze) */}
                <path d="M 65 110 Q 85 95 105 110 Z" fill="#7a4d2c" />
                <rect x="60" y="110" width="50" height="8" fill="#5c3a21" rx="3" />

                {/* Glass Globe */}
                <path d="M 65 118 Q 50 155 65 185 L 105 185 Q 120 155 105 118 Z" fill="rgba(255,255,255,0.05)" stroke="#a38268" strokeWidth="2" />
                
                {/* Wire Guards (Bronze) */}
                <path d="M 60 114 Q 85 155 60 185" fill="none" stroke="#4a2e1a" strokeWidth="3" />
                <path d="M 110 114 Q 85 155 110 185" fill="none" stroke="#4a2e1a" strokeWidth="3" />
                <path d="M 55 150 L 115 150" fill="none" stroke="#4a2e1a" strokeWidth="2" />

                {/* Base Tank (Bronze) */}
                <rect x="60" y="185" width="50" height="10" fill="#7a4d2c" rx="2" />
                <path d="M 65 195 L 105 195 L 115 215 L 55 215 Z" fill="#5c3a21" strokeLinejoin="round" />
                <rect x="50" y="215" width="70" height="6" fill="#3d2616" rx="3" />
              </svg>
            </div>

            {/* Selo Impermeabilização */}
            <RevealOnScroll delay={0.6} className="pl-4 lg:pl-0">
              <div className="flex flex-col items-start lg:items-center border-l-2 lg:border-l-0 lg:border-t-2 border-red/30 pl-4 lg:pl-0 lg:pt-4">
                <span className="text-[10px] tracking-[0.2em] font-bold text-ink/50 uppercase mb-1">
                  Blindagem Especializada
                </span>
                <span className="font-heading font-black text-red text-[18px] uppercase tracking-wide">
                  Impermeabilização
                </span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Text Content */}
          <div>
            <RevealOnScroll>
              <Eyebrow>Sobre a única</Eyebrow>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.1}>
              <h2 className="font-heading font-black text-[clamp(30px,4vw,50px)] leading-[0.98] tracking-[-0.02em] uppercase mb-[22px]">
                Tradição técnica,<br/>acabamento atual.
              </h2>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <p className="text-[16px] leading-[1.8] text-ink/70 mb-5 max-w-[520px]">
                A Única nasceu para resolver um problema simples de enunciar e difícil de executar bem: proteger construções da água e da abrasão, com um acabamento que também valoriza o espaço.
              </p>
              <p className="text-[16px] leading-[1.8] text-ink/70 mb-5 max-w-[520px]">
                Com mais de duas décadas de atuação, nossa engenharia não foca apenas na durabilidade bruta, mas na fusão entre resistência industrial e estética arquitetônica.
              </p>
            </RevealOnScroll>

            {/* Stats */}
            <RevealOnScroll delay={0.3}>
              <div className="flex gap-14 mt-11 flex-wrap">
                <div>
                  <b className="font-heading font-black text-[38px] block text-red mb-1">
                    <CountUp end={25} suffix="+" />
                  </b>
                  <span className="text-[12px] tracking-[0.1em] uppercase text-ink/55">Anos de mercado</span>
                </div>
                <div>
                  <b className="font-heading font-black text-[38px] block text-red mb-1">
                    <CountUp end={8} suffix="k+" />
                  </b>
                  <span className="text-[12px] tracking-[0.1em] uppercase text-ink/55">Obras Entregues</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes firepulse {
          0%, 100% { opacity: 0.7; transform: scale(0.95); transform-origin: center; }
          50% { opacity: 1; transform: scale(1.05); transform-origin: center; }
        }
        @keyframes flameflicker {
          0% { transform: skewX(-2deg) scaleY(1); transform-origin: bottom center; opacity: 0.9; }
          100% { transform: skewX(2deg) scaleY(1.1); transform-origin: bottom center; opacity: 1; }
        }
      `}} />
    </section>
  );
}
