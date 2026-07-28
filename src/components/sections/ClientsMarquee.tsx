"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VivoLogo, ClaroLogo, TimLogo, OiLogo, EricssonLogo } from "@/components/icons/BrandIcons";

// Real SVG logos for telecom companies
const telecomClients = [
  { name: "VIVO", icon: <VivoLogo className="w-12 md:w-16 h-auto object-contain drop-shadow-sm" /> },
  { name: "CLARO", icon: <ClaroLogo className="w-20 md:w-28 h-auto object-contain drop-shadow-sm" /> },
  { name: "TIM", icon: <TimLogo className="w-12 md:w-16 h-auto object-contain drop-shadow-sm" /> },
  { name: "OI", icon: <OiLogo className="w-12 md:w-16 h-auto object-contain drop-shadow-sm" /> },
  { name: "ERICSSON", icon: <EricssonLogo className="w-12 md:w-16 h-auto object-contain drop-shadow-sm" /> },
];

const nbrStandards = [
  { code: "NBR 9575", desc: "Impermeabilização - Seleção e Projeto" },
  { code: "NBR 9574", desc: "Execução de Impermeabilização" },
  { code: "NBR 11905", desc: "Argamassa Polimérica Industrializada" },
  { code: "NBR 15487", desc: "Membrana de Poliuretano para Impermeabilização" },
  { code: "NBR 15575", desc: "Desempenho de Edificações Habitacionais" },
  { code: "NBR 16280", desc: "Reforma em Edificações e Diretrizes" },
];

import { UnicaSeal } from "@/components/ui/UnicaSeal";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
};

const abntLogoVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10, x: -30 },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    x: 0,
    transition: { 
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8 
    }
  },
};

export function ClientsMarquee() {
  // Duplicate items to ensure smooth infinite scroll
  const marqueeItems = [...telecomClients, ...telecomClients, ...telecomClients, ...telecomClients];

  return (
    <section className="py-14 bg-stone border-y border-ink/5 overflow-hidden flex flex-col justify-center">
      <div className="container-custom mb-10">
        <h3 className="text-[11px] tracking-[0.2em] font-bold text-ink/40 uppercase text-center">
          Empresas que confiam na nossa blindagem
        </h3>
      </div>
      
      <div className="relative w-full flex overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="inline-flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear" as const, repeat: Infinity }}
        >
          {marqueeItems.map((client, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center px-10 md:px-14 transition-transform duration-400 hover:scale-105"
            >
              {client.icon}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="bg-stone-50 py-16 md:py-24 border-t border-stone-200 overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Título da Seção */}
          <motion.div variants={itemVariants} className="text-center w-full mb-12">
            <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-stone-500 font-bold mb-2">
              Excelência Técnica
            </h3>
            <h4 className="text-xl md:text-2xl font-light text-ink">
              Atendemos rigorosamente as seguintes <span className="font-medium text-red-600">normas</span>:
            </h4>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-center">
            
            {/* Logos Animados */}
            <motion.div 
              variants={abntLogoVariants}
              className="flex flex-row items-center justify-center gap-8 md:gap-12 shrink-0"
            >
              <img src="/logos/abnt.svg" alt="Selo ABNT" className="h-32 md:h-44 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              
              {/* Divisor vertical em telas maiores */}
              <div className="hidden md:block w-px h-24 bg-stone-200"></div>
              
              <UnicaSeal />
            </motion.div>

            {/* Grid de Normas Animadas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-4xl">
              {nbrStandards.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <span className="font-bold text-red-600 text-sm md:text-base mb-1">{item.code}</span>
                  <span className="text-stone-600 text-xs md:text-sm leading-relaxed">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
