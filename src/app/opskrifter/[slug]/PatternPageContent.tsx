"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { getPatternBySlug } from "@/lib/patterns";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistHeart from "@/components/WishlistHeart";

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
          <div className="absolute top-4 right-4 z-10">
            <WishlistHeart patternSlug={pattern.slug} variant="icon" />
          </div>
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

      <PatternReviews slug={pattern.slug} />

      <p className="mt-6 text-xs text-charcoal-500">
        Når du køber, modtager du opskriften som PDF på mail umiddelbart efter
        betaling.
      </p>
    </div>
  );
}

type ReviewRow = {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

function PatternReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setLoading(false);
      });
    fetch("/api/user").then((r) => r.json()).then((data) => setUser(data?.user ?? null));
  }, [slug]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, rating, comment }),
      });
      if (res.ok) {
        const data = await fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`).then((r) => r.json());
        setReviews(data.reviews || []);
        setComment("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-beige-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-charcoal-900">Anmeldelser</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-amber-600 text-sm">
                {"★".repeat(Math.round(averageRating))}
                {"☆".repeat(5 - Math.round(averageRating))}
              </span>
              <span className="text-sm text-charcoal-600">
                {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "anmeldelse" : "anmeldelser"})
              </span>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <p className="text-charcoal-500 text-sm">Indlæser...</p>
      ) : (
        <>
          {reviews.length === 0 ? (
            <p className="text-charcoal-500 text-sm mb-4">Ingen anmeldelser endnu. Vær den første!</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {reviews.map((r) => (
                <li key={r.id} className="p-4 rounded-xl bg-cream-50 border border-beige-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-charcoal-900">Bruger</span>
                    <span className="text-amber-600">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    <span className="text-xs text-charcoal-500">
                      {new Date(r.created_at).toLocaleDateString("da-DK")}
                    </span>
                  </div>
                  {r.comment && <p className="text-sm text-charcoal-700">{r.comment}</p>}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={submitReview} className="space-y-3">
            <p className="text-sm font-medium text-charcoal-700">Skriv en anmeldelse</p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-charcoal-600">Bedømmelse:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="rounded-lg border border-beige-200 px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} stjerne{n > 1 ? "r" : ""}</option>
                ))}
              </select>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Din kommentar (valgfri)"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-beige-200 text-sm"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 disabled:opacity-50"
            >
              {submitting ? "Sender..." : user ? "Send anmeldelse" : "Log ind for at anmelde"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
