/**
 * Reusable card component for Stitch of Care tools and sections.
 * Soft, calm styling with optional animation.
 */

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Optional subtle animation on mount */
  animate?: boolean;
}

export default function Card({ children, className = "", animate }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-white border border-beige-200
        shadow-sm overflow-hidden
        ${animate ? "animate-fade-in" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
