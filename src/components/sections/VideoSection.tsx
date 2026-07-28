"use client";

import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper function to extract embed URL
function getEmbedUrl(url: string, type: string): string {
  if (type === 'youtube') {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : url;
  }
  if (type === 'vimeo') {
    const regExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
    const match = url.match(regExp);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : url;
  }
  return url;
}

export function VideoSection() {
  const [videos, setVideos] = useState<any[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { clientWidth, scrollLeft } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/videos`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setVideos(data);
        }
      })
      .catch(err => console.error("Erro ao carregar vídeos:", err));
  }, []);

  const hasVideos = videos.length > 0;

  return (
    <section id="video" className="py-[120px] bg-ink text-paper relative">
      <div className="container-custom relative group/section">
        <RevealOnScroll>
          <SectionHead 
            title={<TextReveal text="Alguns de nossos vídeos" />} 
            titleClassName="whitespace-nowrap max-w-none !text-balance-none"
            className="mb-12"
          />
        </RevealOnScroll>
        <RevealOnScroll>
          {videos.length > 1 && (
            <>
              <button 
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red transition-colors md:-left-6"
                aria-label="Vídeo anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red transition-colors md:-right-6"
                aria-label="Próximo vídeo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 items-center" 
            style={{ scrollbarWidth: 'none' /* Firefox */ }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              .container-custom ::-webkit-scrollbar { display: none; }
            `}} />

            {hasVideos ? videos.map((video) => {
              const isPlaying = playingId === video.id;
              
              return (
                <div 
                  key={video.id}
                  className="flex-shrink-0 w-full md:w-[85%] snap-center relative aspect-video rounded flex items-center justify-center overflow-hidden cursor-pointer border border-paper/15 bg-gradient-to-br from-[#232323] to-[#0b0b0b] group"
                  onClick={() => setPlayingId(video.id)}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'repeating-linear-gradient(100deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 5px)' }}
                  />

                  {!isPlaying ? (
                    <>
                      <div className="relative w-[88px] h-[88px] rounded-full bg-red flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 rounded-full border border-red animate-[pulse_2.4s_ease-out_infinite]" />
                        <div className="absolute inset-0 rounded-full border border-red animate-[pulse_2.4s_ease-out_infinite_1.2s]" />
                        <Play fill="currentColor" strokeWidth={0} className="w-5 h-5 relative z-10 ml-1" />
                      </div>
                      <div className="absolute bottom-5 left-5 text-[11px] tracking-[0.14em] uppercase text-paper/60 bg-black/40 px-3.5 py-2 rounded-full">
                        {video.title || 'Assista ao vídeo'}
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      {video.type === 'mp4' ? (
                        <video 
                          src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${video.file_path}`} 
                          autoPlay 
                          controls 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <iframe 
                          src={getEmbedUrl(video.video_url, video.type)}
                          className="w-full h-full"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            }) : (
              // Placeholder if no videos in database
              <div 
                className="flex-shrink-0 w-full snap-center relative aspect-video rounded flex items-center justify-center overflow-hidden cursor-pointer border border-paper/15 bg-gradient-to-br from-[#232323] to-[#0b0b0b] group"
                onClick={() => setPlayingId(-1)}
              >
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'repeating-linear-gradient(100deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 5px)' }}
                />

                {playingId !== -1 ? (
                  <>
                    <div className="relative w-[88px] h-[88px] rounded-full bg-red flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <div className="absolute inset-0 rounded-full border border-red animate-[pulse_2.4s_ease-out_infinite]" />
                      <div className="absolute inset-0 rounded-full border border-red animate-[pulse_2.4s_ease-out_infinite_1.2s]" />
                      <Play fill="currentColor" strokeWidth={0} className="w-5 h-5 relative z-10 ml-1" />
                    </div>
                    <div className="absolute bottom-5 left-5 text-[11px] tracking-[0.14em] uppercase text-paper/60 bg-black/40 px-3.5 py-2 rounded-full">
                      Assista ao manifesto Única
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <p className="text-paper/50">Nenhum vídeo cadastrado no Painel.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}} />
    </section>
  );
}
