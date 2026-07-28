import React from "react";
import { motion } from "framer-motion";

export const UnicaSeal = ({ className = "text-red-600" }: { className?: string }) => {
  return (
    <div className={`relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center ${className}`}>
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full text-current"
        viewBox="0 0 100 100"
      >
        <path
          id="textPath"
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          fill="none"
        />
        <text className="text-[10.5px] font-bold uppercase tracking-[0.15em]" fill="currentColor">
          <textPath href="#textPath" startOffset="0%">
            • SELO ÚNICA DE QUALIDADE • PADRÃO DE EXCELÊNCIA
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center text-current">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </div>
    </div>
  );
};
