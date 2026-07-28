"use client";

import React from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Portfolio() {
  const defaultItems = [
    { id: "g1", gradient: "from-[#c9c2b4] to-[#8f8570]", span: "col-span-2 row-span-2", image_url: null },
    { id: "g2", gradient: "from-[#aab6c4] to-[#5f6f80]", span: "col-span-2 row-span-1", image_url: null },
    { id: "g3", gradient: "from-[#c7a793] to-[#8a5a44]", span: "col-span-2 row-span-1", image_url: null },
    { id: "g4", gradient: "from-[#8f9c8a] to-[#4d5c49]", span: "col-span-2 row-span-2", image_url: null },
    { id: "g5", gradient: "from-[#b7a8b8] to-[#6f5b72]", span: "col-span-2 row-span-1", image_url: null },
    { id: "g6", gradient: "from-[#a9b8c2] to-[#57697a]", span: "col-span-2 row-span-1", image_url: null },
  ];

  const [items, setItems] = React.useState(defaultItems);
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  // Fecha o lightbox com a tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    // Tenta buscar as imagens da API do Laravel
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/gallery`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const apiItems = data.map((img: any, idx: number) => ({
            id: `api-${img.id}`,
            gradient: defaultItems[idx % defaultItems.length].gradient,
            span: img.span || defaultItems[idx % defaultItems.length].span,
            image_url: `${apiUrl}/storage/${img.image_path}`
          }));
          setItems(apiItems);
        }
      })
      .catch(err => console.error("Erro ao carregar galeria:", err));
  }, []);

  return (
    <section id="portfolio" className="py-[120px] relative bg-stone">
      <div className="container-custom">
        <RevealOnScroll>
          <SectionHead 
            title="Galeria de obras"
            description="Um retrato do que sai da prancheta e vira piso — clique para ampliar."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[auto] md:auto-rows-[110px] gap-3.5">
          {items.slice(0, visibleCount).map((item, index) => (
            <RevealOnScroll 
              key={item.id} 
              delay={index * 0.1}
              className={cn(
                "relative overflow-hidden rounded bg-stone cursor-pointer group",
                "aspect-square md:aspect-auto", // Square on mobile, grid row spans on desktop
                `md:${item.span.split(' ')[0]} md:${item.span.split(' ')[1]}`
              )}
            >
              <div 
                onClick={() => {
                  // Só abre o lightbox se tiver imagem real
                  if (item.image_url) setSelectedImage(item.image_url);
                }}
                className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-all duration-600 ease-out group-hover:scale-105 bg-cover bg-center",
                  "grayscale-[35%] group-hover:grayscale-0",
                  !item.image_url && item.gradient
                )}
                style={item.image_url ? { backgroundImage: `url(${item.image_url})` } : {}}
              />
              
              <div 
                onClick={() => {
                  if (item.image_url) setSelectedImage(item.image_url);
                }}
                className="absolute top-3 right-3 w-[30px] h-[30px] rounded-full bg-paper/90 flex items-center justify-center opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none"
              >
                <Search className="w-3.5 h-3.5 text-ink" strokeWidth={2} />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {items.length > visibleCount && (
          <RevealOnScroll className="mt-12 flex justify-center">
            <Button 
              variant="ghost" 
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              Ver mais obras
            </Button>
          </RevealOnScroll>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Obra ampliada"
              className="max-w-full max-h-full object-contain rounded"
              onClick={(e) => e.stopPropagation()} // Previne fechar se clicar na imagem
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
