"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatsAppFab({ className }: { className?: string }) {
  const whatsappNumber = "5511999999999"; // Default placeholder
  const message = "Olá, gostaria de solicitar um orçamento.";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-[700] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110",
        className
      )}
      aria-label="Contato via WhatsApp"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30" />
      <MessageCircle size={28} className="relative z-10" />
    </a>
  );
}
