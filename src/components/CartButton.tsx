"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartItemCount } from "@/lib/cart";

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setItemCount(getCartItemCount());
    };

    updateCount();
    window.addEventListener("cart-updated", updateCount);
    return () => window.removeEventListener("cart-updated", updateCount);
  }, []);

  return (
    <Link
      href="/kurv"
      className="ml-2 px-3 py-1.5 rounded-full bg-rose-400 text-white hover:bg-rose-500 transition-colors font-semibold relative"
    >
      Kurv {itemCount > 0 && `(${itemCount})`}
    </Link>
  );
}
