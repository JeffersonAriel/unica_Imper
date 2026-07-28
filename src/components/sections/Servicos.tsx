"use client";

import React from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ArrowRight } from "lucide-react";

export function Servicos() {
  const defaultServicos = [
    {
      id: "01",
      title: "Injeção\nQuímica",
      slug: "injecao-quimica",
      tag: "Sistemas de Alta Performance",
      gradient: "from-[#3a3f4c] to-[#121620]",
      image_url: null,
    },
    {
      id: "02",
      title: "Poliuretano, industrial\ne antiderrapante",
      slug: "poliuretano",
      tag: "Pisos Especiais",
      gradient: "from-[#5c2420] to-[#2b110f]",
      image_url: null,
    },
  ];

  const [servicos, setServicos] = React.useState(defaultServicos);

  React.useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/services`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const apiServicos = data.map((srv: any, idx: number) => {
            const fallbackGradient = defaultServicos[idx % defaultServicos.length]?.gradient || "from-[#3a3f4c] to-[#121620]";
            return {
              id: `0${idx + 1}`.slice(-2),
              title: srv.title,
              slug: srv.slug,
              tag: "Especialidade",
              gradient: fallbackGradient,
              image_url: srv.image_path ? `${apiUrl}/storage/${srv.image_path}` : null,
            };
          });
          setServicos(apiServicos);
        }
      })
      .catch(err => console.error("Erro ao carregar serviços:", err));
  }, []);

  return (
    <section id="servicos" className="py-[120px] relative">
      <div className="container-custom">
        <RevealOnScroll>
          <SectionHead 
            title="Especialidades"
            description="Soluções rigorosas para ambientes onde falhar não é uma opção."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicos.map((serv, index) => (
            <RevealOnScroll key={index} delay={index * 0.15}>
              <a href="#contato" className="group relative block aspect-[4/5] md:aspect-[4/4] lg:aspect-[4/5] overflow-hidden rounded bg-stone">
                {/* Image Placeholder with Gradient matching prototype */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110 ${!serv.image_url ? `bg-gradient-to-br ${serv.gradient}` : ''}`}
                  style={serv.image_url ? { backgroundImage: `url(${serv.image_url})` } : {}}
                />
                
                {/* Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                
                {/* Content */}
                <div className="absolute left-0 right-0 bottom-0 p-8 text-paper">
                  <span className="block text-[11px] tracking-[0.14em] uppercase text-red mb-2.5">
                    {serv.id} — {serv.tag}
                  </span>
                  <h3 className="font-heading font-black text-[26px] uppercase mb-3.5 whitespace-pre-line leading-tight">
                    {serv.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold translate-y-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    Saiba mais <ArrowRight className="w-3.5 h-auto" strokeWidth={2} />
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
