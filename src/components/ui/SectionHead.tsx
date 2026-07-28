import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  titleClassName?: string;
}

export function SectionHead({ 
  title, 
  description, 
  className,
  titleClassName,
  ...props 
}: SectionHeadProps) {
  return (
    <div 
      className={cn(
        "flex justify-between items-end gap-10 mb-16 flex-wrap",
        className
      )}
      {...props}
    >
      <h2 className={cn("text-[clamp(30px,4vw,50px)] uppercase max-w-[640px] text-balance", titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className="max-w-[340px] text-ink/60 text-[15px] leading-[1.6]">
          {description}
        </p>
      )}
    </div>
  );
}
