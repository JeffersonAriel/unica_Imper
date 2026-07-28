"use client";

import React from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { QuoteWizard } from "@/components/forms/QuoteWizard";

export function Contato() {
  return (
    <section id="contato" className="py-[120px] bg-stone-50 relative">
      <div className="container-custom">
        <RevealOnScroll>
          <SectionHead 
            title="Solicitar Orçamento Técnico"
            description="Preencha os detalhes da sua obra no nosso assistente. Nossa equipe técnica analisará suas informações e entrará em contato rapidamente com uma proposta definitiva."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="mt-12">
          <QuoteWizard />
        </RevealOnScroll>
      </div>
    </section>
  );
}
