"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Diamond } from "@/components/ui/Diamond";

export function Header() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[800] py-[26px] transition-all duration-400 ease-out border-b border-transparent",
        isScrolled && "bg-paper/90 backdrop-blur-[10px] py-4 border-ink/10"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Real Logo from public folder */}
            <div className="relative h-[42px] w-[140px] flex items-center shrink-0">
              <Image 
                src="/logo.png" 
                alt="Única Logo" 
                fill
                className={cn(
                  "object-contain object-left transition-all duration-400",
                  !isScrolled && "brightness-0 invert" // Make it white when at the top of the dark header
                )}
                priority
              />
            </div>
          </Link>

          <ul className="hidden md:flex gap-9">
            {["Especialidades", "Vídeo", "Serviços", "Portfólio", "Sobre nós"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase().replace(/ /g, "-").replace(/ó/g, "o")}`}
                  className={cn(
                    "text-[14px] font-medium relative py-1 transition-colors duration-400",
                    isScrolled ? "text-ink hover:text-red" : "text-paper/85 hover:text-paper",
                    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-red after:transition-all after:duration-300 hover:after:w-full"
                  )}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button variant={isScrolled ? "solid" : "ghost"} href="#contato">
              Fale Conosco
            </Button>
          </div>
          
          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={cn("w-6 h-0.5 transition-colors", isScrolled ? "bg-ink" : "bg-paper")} />
            <span className={cn("w-6 h-0.5 transition-colors", isScrolled ? "bg-ink" : "bg-paper")} />
          </button>
        </nav>
      </div>
    </header>
  );
}
