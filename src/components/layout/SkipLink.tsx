import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:rounded-md focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </a>
  );
}
