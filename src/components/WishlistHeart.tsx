"use client";

import { useState, useEffect } from "react";

type Props = { patternSlug: string; className?: string };

export default function WishlistHeart({ patternSlug, className = "" }: Props) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.wishlist)) {
          setIsInWishlist(data.wishlist.includes(patternSlug));
        }
      })
      .catch(() => {});
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(!!data?.user))
      .catch(() => setIsLoggedIn(false));
  }, [patternSlug]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading || isLoggedIn === false) return;
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    setLoading(true);
    try {
      if (isInWishlist) {
        await fetch(`/api/wishlist?slug=${encodeURIComponent(patternSlug)}`, { method: "DELETE" });
        setIsInWishlist(false);
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: patternSlug }),
        });
        setIsInWishlist(true);
      }
    } catch (_) {}
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isInWishlist ? "Fjern fra ønskeliste" : "Tilføj til ønskeliste"}
      className={`p-2 rounded-full transition-colors ${className}`}
    >
      <span
        className={`text-xl ${isInWishlist ? "text-rose-500" : "text-charcoal-400 hover:text-rose-400"}`}
      >
        {isInWishlist ? "❤️" : "🤍"}
      </span>
    </button>
  );
}
