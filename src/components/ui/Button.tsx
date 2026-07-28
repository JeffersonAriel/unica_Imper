import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // I'll need to create this utility

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({ variant = "solid", href, className, children, ...props }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 text-[13px] font-semibold px-[26px] py-[13px] rounded-full border border-red transition-transform duration-250 relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98]";
  
  const variantClasses = {
    solid: "bg-red text-paper",
    ghost: "border-current bg-transparent",
  };

  const combinedClasses = cn(baseClasses, variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
