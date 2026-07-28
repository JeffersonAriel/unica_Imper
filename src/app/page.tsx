"use client";

import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { VideoSection } from "@/components/sections/VideoSection";
import { Servicos } from "@/components/sections/Servicos";
import { Comparativo } from "@/components/sections/Comparativo";
import { Portfolio } from "@/components/sections/Portfolio";
import { Sobre } from "@/components/sections/Sobre";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { CtaStrip } from "@/components/sections/CtaStrip";
import { Contato } from "@/components/sections/Contato";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/animations/CustomCursor').then(mod => mod.CustomCursor), { ssr: false });
const Preloader = dynamic(() => import('@/components/animations/Preloader').then(mod => mod.Preloader), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/animations/ScrollProgress').then(mod => mod.ScrollProgress), { ssr: false });
const WhatsAppFab = dynamic(() => import('@/components/ui/WhatsAppFab').then(mod => mod.WhatsAppFab), { ssr: false });
const ConsentBanner = dynamic(() => import('@/components/ui/ConsentBanner').then(mod => mod.ConsentBanner), { ssr: false });
import { SkipLink } from "@/components/layout/SkipLink";
import { Providers } from "@/components/layout/Providers";

export default function Home() {
  return (
    <Providers>
      <SkipLink />
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      
      <Header />
      
      <main id="main-content">
        <Hero />
        <MarqueeStrip />
        <Diferenciais />
        <VideoSection />
        <Servicos />
        <Comparativo />
        <Portfolio />
        <Sobre />
        <Testimonials />
        <ClientsMarquee />
        <CtaStrip />
        <Contato />
      </main>
      
      <Footer />
      
      <WhatsAppFab />
      <ConsentBanner />
    </Providers>
  );
}
