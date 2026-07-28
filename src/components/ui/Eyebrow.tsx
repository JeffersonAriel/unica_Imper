import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <p 
      className={cn(
        "flex items-center gap-2.5 mb-[18px]",
        "font-sans font-semibold text-[12px] tracking-[0.18em] uppercase text-red",
        "before:content-[''] before:block before:w-[22px] before:h-[1px] before:bg-red",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
