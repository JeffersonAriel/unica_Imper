"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import Link from "next/link";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem("unica_lgpd_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("unica_lgpd_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-ink text-paper p-6 border-t border-line-invert shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-[14px] text-paper/80 leading-relaxed max-w-[800px]">
          Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
          Ao continuar navegando, você concorda com a nossa{" "}
          <Link href="/politica-privacidade" className="text-red hover:underline">
            Política de Privacidade
          </Link>.
        </div>
        <div className="flex gap-4 shrink-0">
          <Button variant="ghost" onClick={handleAccept} className="text-paper border-paper/30 hover:bg-paper/10">
            Rejeitar Não Essenciais
          </Button>
          <Button variant="solid" onClick={handleAccept}>
            Aceitar Todos
          </Button>
        </div>
      </div>
    </div>
  );
}
