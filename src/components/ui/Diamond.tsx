import React from "react";
import { cn } from "@/lib/utils";

interface DiamondProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  outlineColor?: string;
  fillColor?: string;
}

export function Diamond({ 
  className, 
  outlineColor = "currentColor", 
  fillColor = "transparent",
  ...props 
}: DiamondProps) {
  return (
    <svg 
      viewBox="0 0 40 52" 
      className={cn("w-6 h-auto", className)} 
      {...props}
    >
      <polygon 
        points="20,2 38,26 20,50 2,26" 
        fill={fillColor} 
        stroke={outlineColor} 
        strokeWidth="2"
      />
    </svg>
  );
}
