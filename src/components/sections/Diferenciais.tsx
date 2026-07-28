"use client";

import React from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { ShieldCheck, Droplets, Wrench, Clock } from "lucide-react";

export function Diferenciais() {
  const diffs = [
    {
      num: "01",
      title: "Garantia Estendida",
      desc: "Nossos processos garantem uma vida útil superior à média do mercado. Nós assinamos embaixo do que fazemos.",
      icon: <ShieldCheck strokeWidth={1.5} className="w-[30px] h-[38px] mb-[22px] text-ink" />,
    },
    {
      num: "02",
      title: "Materiais Nobres",
      desc: "Trabalhamos com os polímeros e resinas mais avançados, certificados para alto tráfego e resistência química.",
      icon: <Droplets strokeWidth={1.5} className="w-[30px] h-[38px] mb-[22px] text-ink" />,
    },
    {
      num: "03",
      title: "Equipe Técnica",
      desc: "Mão de obra própria, treinada e uniformizada, com supervisão constante de engenheiro responsável em cada obra.",
      icon: <Wrench strokeWidth={1.5} className="w-[30px] h-[38px] mb-[22px] text-ink" />,
    },
    {
      num: "04",
      title: "Prazos Cumpridos",
      desc: "Respeito rigoroso ao cronograma, evitando paralisações desnecessárias na sua rotina, casa ou indústria.",
      icon: <Clock strokeWidth={1.5} className="w-[30px] h-[38px] mb-[22px] text-ink" />,
    },
  ];

  return (
    <section className="py-[120px] relative">
      <div className="container-custom">
        <RevealOnScroll>
          <SectionHead 
            title={<>Por que a <span className="text-red">Única</span>?</>}
            description="Diferenciais que nos consolidaram como referência técnica em projetos de alto nível."
          />
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-ink/10 border border-ink/10">
          {diffs.map((diff, index) => (
            <StaggerItem key={index}>
              <div className="bg-paper p-10 px-[30px] transition-colors duration-350 hover:bg-stone h-full">
                <span className="font-heading font-black text-[13px] text-red mb-[34px] block">
                  {diff.num}
                </span>
                {diff.icon}
                <h3 className="font-heading font-black text-[19px] uppercase mb-2.5 tracking-[-0.01em]">
                  {diff.title}
                </h3>
                <p className="text-[14px] text-ink/60 leading-[1.6]">
                  {diff.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
