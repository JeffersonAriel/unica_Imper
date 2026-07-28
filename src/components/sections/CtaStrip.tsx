"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function CtaStrip() {
  return (
    <section className="bg-red text-paper text-center relative overflow-hidden py-[110px]">
      {/* Background Diamonds Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'radial-gradient(circle at 20px 20px, var(--color-paper) 2px, transparent 0)' // Simple fallback pattern, would use SVG in prod
        }}
      />
      
      <div className="container-custom relative z-10">
        <RevealOnScroll>
          <h2 className="font-heading font-black text-[clamp(30px,5vw,58px)] leading-[0.98] tracking-[-0.02em] uppercase max-w-[760px] mx-auto mb-[34px]">
            Pronto para uma solução definitiva?
          </h2>
          <Button 
            href="#contato" 
            className="bg-paper text-red border-paper hover:bg-paper/90 hover:border-paper/90"
          >
            Solicitar orçamento técnico
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
