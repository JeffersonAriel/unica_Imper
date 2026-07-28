"use client";

import React, { useState } from "react";

export function RetapreneLogo() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span className="font-heading font-black text-[22px] text-red tracking-tighter">
        RETAPRENE
      </span>
    );
  }

  return (
    <img
      src="/logos/retaprene.png"
      alt="Logo Retaprene"
      className="h-6 object-contain"
      onError={() => setHasError(true)}
    />
  );
}
