"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { getPatternBySlug } from "@/lib/patterns";
import AddToCartButton from "@/components/AddToCartButton";

export default function PatternPageContent() {
  const params = useParams();
  const rawSlug = params?.slug;
  let slug: string | undefined;
  if (typeof rawSlug === "string") {
    try {
      slug = decodeURIComponent(rawSlug);
    } catch {
      slug = rawSlug;
    }
  } else {
    slug = undefined;
  }

  const pattern = useMemo(() => (slug ? getPatternBySlug(slug) : undefined), [slug]);

  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-charcoal-600">Indlæser...</p>
        <Link
          href="/opskrifter"
          className="mt-4 inline-block text-sage-600 hover:text-sage-700 text-sm font-medium"
        >
          Tilbage til alle opskrifter
        </Link>
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-charcoal-600">Opskriften blev ikke fundet.</p>
        <Link
          href="/opskrifter"
          className="mt-4 inline-block text-sage-600 hover:text-sage-700 text-sm font-medium"
        >
          Tilbage til alle opskrifter
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/opskrifter"
        className="text-charcoal-500 hover:text-charcoal-700 text-sm font-medium mb-6 inline-block"
      >
        ← Tilbage til opskrifter
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 to-sage-100">
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
              <span className="text-6xl">🧶</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal-500">
              {pattern.level}
            </p>
            <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-sage-700">
              {pattern.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-charcoal-900 mb-4">
            {pattern.name}
          </h1>
          <p className="text-charcoal-700 mb-6">{pattern.intro}</p>

          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-rose-50 border border-rose-200 mb-6">
            <div>
              <p className="text-sm text-charcoal-600">Pris</p>
              <p className="text-2xl font-bold text-charcoal-900">
                {pattern.price} kr
              </p>
            </div>
            <AddToCartButton patternSlug={pattern.slug} />
          </div>
        </div>
      </div>

      <div className="space-y-4 text-sm text-charcoal-700">
        <div className="p-4 rounded-xl bg-cream-50 border border-beige-200">
          <p className="font-semibold text-charcoal-900 mb-1">Konstruktion</p>
          <p>{pattern.construction}</p>
        </div>
        <div className="p-4 rounded-xl bg-cream-50 border border-beige-200">
          <p className="font-semibold text-charcoal-900 mb-1">Garn</p>
          <p>{pattern.yarn}</p>
        </div>
        <div className="p-4 rounded-xl bg-cream-50 border border-beige-200">
          <p className="font-semibold text-charcoal-900 mb-1">Det får du</p>
          <p>{pattern.includes}</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-charcoal-500">
        Når du køber, modtager du opskriften som PDF på mail umiddelbart efter
        betaling.
      </p>
    </div>
  );
}
