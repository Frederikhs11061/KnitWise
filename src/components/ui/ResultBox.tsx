"use client";

/**
 * Soft highlighted box for calculator results.
 * Fade-in animation when result appears.
 */

import type { ReactNode } from "react";

interface ResultBoxProps {
  children: ReactNode;
  className?: string;
}

export default function ResultBox({ children, className = "" }: ResultBoxProps) {
  return (
    <div
      className={`
        mt-6 p-6 rounded-xl bg-sage-100/80 border border-sage-200
        text-charcoal-800
        animate-fade-in
        ${className}
      `}
    >
      {children}
    </div>
  );
}
