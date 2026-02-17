"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

interface AddToCartButtonProps {
  patternSlug: string;
  size?: "small" | "medium" | "large";
}

export default function AddToCartButton({ patternSlug, size = "medium" }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(patternSlug, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const sizeClasses = {
    small: "text-xs px-3 py-1.5 rounded-full",
    medium: "text-sm px-6 py-2.5 rounded-xl",
    large: "text-base px-8 py-3 rounded-xl",
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${sizeClasses[size]} bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors disabled:opacity-50`}
    >
      {isAdding ? "Tilføjer..." : "Læg i kurv"}
    </button>
  );
}
