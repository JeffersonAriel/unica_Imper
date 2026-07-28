"use client";

import React from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { WaterTestAnimation } from "@/components/animations/WaterTestAnimation";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Estrutura do Sistema",
    pu: "Membrana contínua e monolítica",
    manta: "Placas com emendas e sobreposições",
  },
  {
    feature: "Risco de Infiltração",
    pu: "Zero percolação (100% aderido à base)",
    manta: "Água caminha por baixo se houver falha",
  },
  {
    feature: "Resistência a Movimentação",
    pu: "Altíssima elasticidade (não trinca)",
    manta: "Pode romper com grandes dilatações",
  },
  {
    feature: "Peso na Estrutura",
    pu: "Leve (não exige proteção mecânica pesada)",
    manta: "Pesado (exige contrapiso de concreto)",
  },
  {
    feature: "Manutenção",
    pu: "Fácil e pontual (sem quebra-quebra)",
    manta: "Transtorno (exige quebrar o piso atual)",
  },
];

export function Comparativo() {
  return (
    <section className="py-32 bg-stone relative overflow-hidden">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-heading font-black text-[clamp(30px,4vw,50px)] uppercase tracking-tighter mb-6 leading-none">
              A Evolução da <span className="text-red">Blindagem</span>
            </h2>
            <p className="text-[16px] leading-[1.8] text-ink/70">
              O mercado evoluiu. Entenda por que a engenharia de ponta está substituindo a ultrapassada manta asfáltica pelos sistemas líquidos de Poliuretano (PU) de alta performance.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <WaterTestAnimation />
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1.3fr] gap-6 lg:gap-0 max-w-6xl mx-auto items-center">
          {/* Header Row (Desktop Only) */}
          <div className="hidden lg:block pr-8">
            <div className="h-[90px]" /> {/* Spacer for headers */}
            {comparisonData.map((row, i) => (
              <div key={i} className="h-[80px] flex items-center border-b border-ink/5">
                <span className="text-[13px] tracking-[0.1em] font-bold text-ink/40 uppercase">
                  {row.feature}
                </span>
              </div>
            ))}
          </div>

          {/* Manta Asfáltica (Loser) */}
          <RevealOnScroll delay={0.1}>
            <div className="bg-paper border border-ink/5 rounded-t-xl lg:rounded-none lg:rounded-l-xl p-8 lg:p-10 relative opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-400">
              <div className="mb-8 lg:h-[60px] flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.2em] font-bold text-ink/40 uppercase mb-2 block lg:hidden">
                  Tecnologia Antiga
                </span>
                <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-ink/70">
                  Manta Asfáltica
                </h3>
              </div>

              <div className="flex flex-col">
                {comparisonData.map((row, i) => (
                  <div key={i} className="h-auto lg:h-[80px] py-4 lg:py-0 flex flex-col justify-center border-b border-ink/5">
                    <span className="lg:hidden text-[11px] tracking-[0.1em] font-bold text-ink/30 uppercase mb-3">
                      {row.feature}
                    </span>
                    <div className="flex items-start gap-4">
                      <X className="w-5 h-5 text-red shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-[14px] text-ink/60 leading-snug">
                        {row.manta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Poliuretano (Winner) */}
          <RevealOnScroll delay={0.2}>
            <div className="bg-ink rounded-b-xl lg:rounded-xl p-8 lg:p-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-100 lg:scale-[1.05] z-10 border-t-4 border-red">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red text-paper px-6 py-2 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase whitespace-nowrap shadow-xl">
                O Padrão Única
              </div>
              
              <div className="mb-8 lg:h-[60px] flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.2em] font-bold text-paper/40 uppercase mb-2 block lg:hidden">
                  Tecnologia de Ponta
                </span>
                <h3 className="font-heading font-black text-3xl uppercase tracking-tighter text-paper">
                  Poliuretano (PU)
                </h3>
              </div>

              <div className="flex flex-col">
                {comparisonData.map((row, i) => (
                  <div key={i} className="h-auto lg:h-[80px] py-4 lg:py-0 flex flex-col justify-center border-b border-paper/10">
                    <span className="lg:hidden text-[11px] tracking-[0.1em] font-bold text-paper/30 uppercase mb-3">
                      {row.feature}
                    </span>
                    <div className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-red flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </div>
                      <span className="text-[15px] font-medium text-paper/90 leading-snug">
                        {row.pu}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
