"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  // Smooth cursor following state
  const mousePosition = useRef({ x: -100, y: -100 });
  const dotPosition = useRef({ x: -100, y: -100 });
  const ringPosition = useRef({ x: -100, y: -100 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Media query to check if device supports hover
    const matchMedia = window.matchMedia("(hover: hover)");
    if (!matchMedia.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      // Instantly move dot to prevent lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
    };

    const updateRingPosition = () => {
      // Lerp for smooth ring follow
      ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * 0.15;
      ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ringPosition.current.x}px - 50%), calc(${ringPosition.current.y}px - 50%), 0)`;
      }

      requestRef.current = requestAnimationFrame(updateRingPosition);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    requestRef.current = requestAnimationFrame(updateRingPosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // If device doesn't support hover (mobile/tablet), don't render cursor
  if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
    return null;
  }

  return (
    <>
      <div 
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full w-[6px] h-[6px] bg-red transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />
      <div 
        ref={ringRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-red transition-all duration-250 ease-out",
          isVisible ? "opacity-70" : "opacity-0",
          isHovering 
            ? "w-[64px] h-[64px] bg-[rgba(225,38,28,0.08)]" 
            : "w-[34px] h-[34px] bg-transparent"
        )}
      />
    </>
  );
}
