import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ink text-paper/70 pt-20 pb-[30px]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-[60px] border-b border-paper/15">
          {/* Brand Col */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-[18px]">
              <div className="relative h-[36px] w-[120px] flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity">
                <Image 
                  src="/logo.png" 
                  alt="Única Logo" 
                  fill
                  className="object-contain object-left brightness-0 invert" 
                />
              </div>
            </Link>
            <p className="text-[14px] leading-relaxed max-w-[280px]">
              Soluções definitivas em impermeabilização e pisos especiais de alto padrão para residências e empresas.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="foot-col">
            <h4 className="text-[12px] tracking-[0.12em] uppercase text-paper/40 mb-5 font-semibold">
              Empresa
            </h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#sobre-nos" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">Sobre nós</Link></li>
              <li><Link href="#portfolio" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">Obras Realizadas</Link></li>
              <li><Link href="#contato" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">Contato</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="foot-col">
            <h4 className="text-[12px] tracking-[0.12em] uppercase text-paper/40 mb-5 font-semibold">
              Serviços
            </h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#servicos" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">Impermeabilização</Link></li>
              <li><Link href="#servicos" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">Pisos Industriais</Link></li>
              <li><Link href="#servicos" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">Revitalização</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="foot-col">
            <h4 className="text-[12px] tracking-[0.12em] uppercase text-paper/40 mb-5 font-semibold">
              Fale Conosco
            </h4>
            <ul className="flex flex-col gap-3">
              <li><a href="mailto:contato@unicaimper.com.br" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">contato@unicaimper.com.br</a></li>
              <li><a href="tel:+5511999999999" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1">(11) 99999-9999</a></li>
              <li className="mt-2"><Link href="/politica-privacidade" className="text-[14px] transition-all duration-250 hover:text-paper hover:pl-1 text-red">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>

        {/* Credentials / Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-12 gap-y-6 pt-10 pb-6 border-b border-paper/15">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span className="font-heading font-black text-[24px] text-paper tracking-tighter">CREA</span>
            <span className="text-[10px] uppercase text-paper/70 leading-tight w-[120px]">
              Conselho Regional de Engenharia
            </span>
          </div>
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span className="font-heading font-black text-[24px] text-paper tracking-tighter">IBI</span>
            <span className="text-[10px] uppercase text-paper/70 leading-tight w-[120px]">
              Instituto Brasil. de Impermeabilização
            </span>
          </div>
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span className="font-heading font-black text-[24px] text-paper tracking-tighter">ISO 9001</span>
            <span className="text-[10px] uppercase text-paper/70 leading-tight w-[120px]">
              Gestão de Qualidade Certificada
            </span>
          </div>
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span className="font-heading font-black text-[22px] text-red tracking-tighter">RETAPRENE</span>
            <span className="text-[10px] uppercase text-paper/70 leading-tight w-[120px]">
              Aplicador Oficial Autorizado
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-7 pb-4 text-[12px] text-paper/35 gap-4 text-center lg:text-left">
          <p>&copy; {new Date().getFullYear()} Única Impermeabilização. Todos os direitos reservados.</p>
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>
              Desenvolvido por <span className="text-paper/70 font-semibold">Jefferson Santos</span>
            </p>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <a 
                href="https://www.linkedin.com/in/jefferson-ariel-santos/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-paper transition-colors underline decoration-paper/20 underline-offset-4"
              >
                LinkedIn
              </a>
              <a 
                href="https://wa.me/5511940112438?text=Ol%C3%A1%20vim%20do%20site%20da%20Unica%2C%20tenho%20duvidas." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-paper transition-colors underline decoration-paper/20 underline-offset-4"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
