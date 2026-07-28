"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  client_name: string | null;
  image_url: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar os depoimentos cadastrados no painel administrativo Laravel (Filament)
    fetch("http://127.0.0.1:8000/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar depoimentos", err);
        setLoading(false);
      });
  }, []);

  // Dados falsos / placeholders caso o painel ainda esteja vazio
  const displayItems = testimonials.length > 0 ? testimonials : [
    { id: 1, client_name: "João Silva", image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop" },
    { id: 2, client_name: "Construtora Alfa", image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" },
    { id: 3, client_name: "Condomínio Flores", image_url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=600&auto=format&fit=crop" },
    { id: 4, client_name: "Condomínio Flores", image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 bg-paper relative overflow-hidden" id="depoimentos">
      <div className="container-custom relative z-10 mb-16 text-center">
        <motion.h3 
          className="text-xs md:text-sm tracking-[0.2em] uppercase text-red font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experiência Comprovada
        </motion.h3>
        <motion.h2 
          className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter text-ink"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          O Que Nossos Clientes Dizem
        </motion.h2>
        <motion.p
          className="text-stone-500 mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Resultados reais e satisfação garantida em cada metro quadrado impermeabilizado.
        </motion.p>
      </div>

      <div className="w-full relative overflow-hidden pb-10">
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 md:gap-8 whitespace-nowrap px-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
          style={{ width: "fit-content" }}
        >
          {/* Duplicamos os itens para garantir o efeito infinito perfeito */}
          {[...displayItems, ...displayItems, ...displayItems].map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="relative w-[280px] md:w-[360px] h-[400px] md:h-[500px] shrink-0 rounded-2xl overflow-hidden shadow-xl border border-stone-100 group"
            >
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img 
                src={item.image_url} 
                alt={item.client_name || "Depoimento do Cliente"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {item.client_name && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/90 to-transparent z-20">
                  <p className="text-paper font-semibold text-sm md:text-base">{item.client_name}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
