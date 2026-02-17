"use client";

import Link from "next/link";
import { getCurrentUser } from "@/lib/user";
import CartButton from "./CartButton";

export default function Navigation() {
  const user = getCurrentUser();

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
