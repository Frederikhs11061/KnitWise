"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";
import { getLocalWishlist } from "@/lib/wishlist-local";

function getWishlistCount(user: { id: string } | null, setCount: (n: number) => void) {
  if (user) {
    fetch("/api/wishlist", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCount(Array.isArray(d?.wishlist) ? d.wishlist.length : 0))
      .catch(() => setCount(0));
  } else if (typeof window !== "undefined") {
    setCount(getLocalWishlist().length);
  }
}

export default function Navigation() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  useEffect(() => {
    fetch("/api/user", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const u = data?.user ?? null;
        setUser(u);
        getWishlistCount(u, setWishlistCount);
      })
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const onUpdate = () => getWishlistCount(user, setWishlistCount);
    window.addEventListener("wishlist-updated", onUpdate);
    return () => window.removeEventListener("wishlist-updated", onUpdate);
  }, [user]);

  return (
    <nav className="flex items-center gap-6 text-sm font-medium text-charcoal-700">
      <Link
        href="/opskrifter"
        className="hover:text-forest-800 transition-colors"
      >
        Opskrifter
      </Link>
      <Link
        href="/tools"
        className="hover:text-forest-800 transition-colors"
      >
        Strikkeberegner
      </Link>
      <Link
        href="/blog"
        className="hover:text-forest-800 transition-colors"
      >
        Blog
      </Link>
      <Link
        href="/om-os"
        className="hover:text-forest-800 transition-colors"
      >
        Om os
      </Link>
      <Link
        href="/ønskeliste"
        className="hover:text-forest-800 transition-colors"
      >
        Ønskeliste{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
      </Link>
      {user ? (
        <Link
          href="/profil"
          className="px-3 py-1.5 rounded-full border border-sage-300 hover:border-sage-400 hover:bg-sage-50 transition-colors"
        >
          Min profil
        </Link>
      ) : (
        <Link
          href="/login"
          className="px-3 py-1.5 rounded-full border border-sage-300 hover:border-sage-400 hover:bg-sage-50 transition-colors"
        >
          Log ind
        </Link>
      )}
      <CartButton />
    </nav>
  );
}
