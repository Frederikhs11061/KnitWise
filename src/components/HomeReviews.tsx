"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPatternBySlug } from "@/lib/patterns";

type Review = {
  id: string;
  pattern_slug: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export default function HomeReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews?limit=6")
      .then((r) => r.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-16 bg-white border-b border-beige-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-charcoal-500 text-sm">Indlæser anmeldelser...</p>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-16 bg-white border-b border-beige-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
              Hvad siger vores kunder?
            </h2>
            <p className="text-sm text-charcoal-600">
              Læs hvad andre strikkere siger om vores opskrifter
            </p>
          </div>
          <Link
            href="/opskrifter"
            className="text-sm text-sage-400 hover:text-sage-300 font-medium"
          >
            Se alle opskrifter →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => {
            const pattern = getPatternBySlug(review.pattern_slug);
            return (
              <Link
                key={review.id}
                href={`/opskrifter/${review.pattern_slug}`}
                className="block p-4 rounded-xl bg-cream-50 border border-beige-200 hover:border-rose-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-600 text-sm">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                  <span className="text-xs text-charcoal-500">
                    {new Date(review.created_at).toLocaleDateString("da-DK", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {pattern && (
                  <p className="text-xs font-medium text-charcoal-700 mb-1">
                    {pattern.name}
                  </p>
                )}
                {review.comment && (
                  <p className="text-sm text-charcoal-600 line-clamp-2">
                    {review.comment}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
