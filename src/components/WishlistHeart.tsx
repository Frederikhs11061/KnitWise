"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Props = { patternSlug: string; variant?: "button" | "icon" };

export default function WishlistHeart({ patternSlug, variant = "button" }: Props) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/wishlist", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.wishlist)) {
          setIsInWishlist(data.wishlist.includes(patternSlug));
        }
      })
      .catch(() => {});
  }, [patternSlug]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      if (isInWishlist) {
        const res = await fetch(
          `/api/wishlist?slug=${encodeURIComponent(patternSlug)}`,
          { method: "DELETE", credentials: "include" }
        );
        if (res.status === 401) {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
          return;
        }
        if (res.ok) setIsInWishlist(false);
      } else {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: patternSlug }),
        });
        if (res.status === 401) {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
          return;
        }
        if (res.ok) setIsInWishlist(true);
      }
    } catch (_) {}
    setLoading(false);
  };

  const icon = (
    <span className={isInWishlist ? "text-rose-500" : "text-charcoal-400"}>
      {isInWishlist ? "❤️" : "🤍"}
    </span>
  );

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={loading}
        aria-label={isInWishlist ? "Fjern fra ønskeliste" : "Tilføj til ønskeliste"}
        className="p-2 rounded-full hover:bg-rose-50 transition-colors disabled:opacity-60"
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-beige-200 text-charcoal-800 hover:border-rose-300 hover:text-rose-600 transition-colors text-xs font-medium disabled:opacity-60"
    >
      {icon}
      <span>{isInWishlist ? "I ønskeliste" : "Ønskeliste"}</span>
    </button>
  );
}

export function WishlistLink() {
  return (
    <Link
      href="/profil"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-beige-200 text-charcoal-800 hover:border-rose-300 hover:text-rose-600 transition-colors text-xs font-medium"
    >
      <span>🤍</span>
      <span>Se ønskeliste</span>
    </Link>
  );
}
