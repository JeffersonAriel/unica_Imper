import React from "react";
import { cn } from "@/lib/utils";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, type = "text", ...props }, ref) => {
    return (
      <div className={cn("relative mb-[26px]", className)}>
        <input
          type={type}
          className="peer w-full border-none border-b border-ink/10 bg-transparent py-3.5 pb-2.5 text-base text-ink transition-colors duration-300 focus:outline-none focus:border-red placeholder-transparent"
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label
          className="pointer-events-none absolute left-0 top-3.5 text-base text-ink/45 transition-all duration-250
            peer-focus:-translate-y-5 peer-focus:text-[11px] peer-focus:tracking-[0.06em] peer-focus:uppercase peer-focus:text-red
            peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:tracking-[0.06em] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:text-red"
        >
          {label}
        </label>
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

export interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className={cn("relative mb-[26px]", className)}>
        <textarea
          className="peer w-full min-h-[90px] border-none border-b border-ink/10 bg-transparent py-3.5 pb-2.5 text-base text-ink transition-colors duration-300 focus:outline-none focus:border-red resize-none placeholder-transparent"
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label
          className="pointer-events-none absolute left-0 top-3.5 text-base text-ink/45 transition-all duration-250
            peer-focus:-translate-y-5 peer-focus:text-[11px] peer-focus:tracking-[0.06em] peer-focus:uppercase peer-focus:text-red
            peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:tracking-[0.06em] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:text-red"
        >
          {label}
        </label>
      </div>
    );
  }
);
FloatingTextarea.displayName = "FloatingTextarea";
