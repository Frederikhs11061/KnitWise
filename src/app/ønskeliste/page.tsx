"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPatternBySlug } from "@/lib/patterns";
import { formatPrice } from "@/lib/pricing";
import { getLocalWishlist, clearLocalWishlist } from "@/lib/wishlist-local";
import WishlistHeart from "@/components/WishlistHeart";

export default function ØnskelistePage() {
  const [user, setUser] = useState<{ id: string } | null | undefined>(undefined);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/user", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const u = data?.user ?? null;
        setUser(u);

        if (u) {
          const localSlugs = getLocalWishlist();
          if (localSlugs.length > 0) {
            setSyncing(true);
            fetch("/api/wishlist/sync", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slugs: localSlugs }),
            })
              .then((res) => {
                if (res.ok) clearLocalWishlist();
              })
              .finally(() => {
                if (!cancelled) setSyncing(false);
              });
          }
          return fetch("/api/wishlist", { credentials: "include" })
            .then((res) => res.json())
            .then((d) => {
              if (!cancelled) setWishlist(d?.wishlist ?? []);
            });
        }
        setWishlist(getLocalWishlist());
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setWishlist(getLocalWishlist());
        }
      });

    const onUpdate = () => {
      if (user === null || user === undefined) {
        setWishlist(getLocalWishlist());
      }
    };
    window.addEventListener("wishlist-updated", onUpdate);
    return () => {
      cancelled = true;
      window.removeEventListener("wishlist-updated", onUpdate);
    };
  }, []);

  useEffect(() => {
    if (user === null) setWishlist(getLocalWishlist());
  }, [user]);

  useEffect(() => {
    if (!user || syncing) return;
    fetch("/api/wishlist", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setWishlist(d?.wishlist ?? []));
  }, [user, syncing]);

  const loading = user === undefined;
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-charcoal-600">Indlæser ønskeliste...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Ønskeliste</h1>
      <p className="text-charcoal-600 mb-8">
        {user
          ? "Her er de opskrifter du har gemt. Log ind for at have dem på tværs af enheder."
          : "Gemte opskrifter (gemmes lokalt – log ind for at synkronisere på tværs af enheder)."}
      </p>

      {syncing && (
        <p className="text-sm text-sage-600 mb-4">
          Overfører dine gemte opskrifter til din konto...
        </p>
      )}

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-charcoal-600 mb-4">Din ønskeliste er tom</p>
          <Link
            href="/opskrifter"
            className="inline-block px-6 py-3 rounded-xl bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors"
          >
            Se opskrifter
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((slug) => {
            const pattern = getPatternBySlug(slug);
            if (!pattern) return null;
            return (
              <div
                key={slug}
                className="p-4 rounded-xl border border-beige-200 bg-white hover:border-rose-300 transition-colors"
              >
                <Link href={`/opskrifter/${slug}`} className="block">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-rose-100 to-sage-100 mb-3">
                    <Image
                      src={pattern.image}
                      alt={pattern.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    {!pattern.image && (
                      <div className="absolute inset-0 flex items-center justify-center text-charcoal-400">
                        <span className="text-4xl">🧶</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-charcoal-900 mb-1">{pattern.name}</h3>
                  <p className="text-sm text-charcoal-500">{formatPrice(pattern.price)}</p>
                </Link>
                <div className="mt-3 flex items-center gap-2">
                  <WishlistHeart patternSlug={slug} variant="button" />
                  <Link
                    href={`/opskrifter/${slug}`}
                    className="text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    Læs mere
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
