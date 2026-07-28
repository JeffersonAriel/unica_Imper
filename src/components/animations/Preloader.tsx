"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = "hidden";
    
    const timer1 = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = "";
    }, 1800); // Wait for animations to finish

    const timer2 = setTimeout(() => {
      setIsRemoved(true);
    }, 2600); // Wait for fade out to finish

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = "";
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="preloader"
      className={cn(
        "fixed inset-0 bg-ink z-[10000] flex flex-col items-center justify-center transition-all duration-800 ease-out",
        isDone ? "opacity-0 invisible" : "opacity-100 visible"
      )}
    >
      <svg viewBox="0 0 100 130" className="w-[70px] h-[90px]">
        <polygon 
          className="fill-none stroke-red stroke-[3px] animate-[draw_1.1s_ease_forwards]" 
          points="50,6 92,65 50,124 8,65"
          style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
        />
        <polygon 
          className="fill-red opacity-0 animate-[fillin_0.5s_ease_forwards_0.9s]" 
          points="50,20 84,65 50,110 16,65"
        />
      </svg>
      <p className="mt-8 text-paper/80 tracking-[0.25em] text-[12px] uppercase opacity-0 animate-[fillin_0.5s_ease_forwards_1.1s] font-semibold">
        BEM VINDO A ÚNICA
      </p>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes fillin { to { opacity: 1; } }
      `}} />
    </div>
  );
}
