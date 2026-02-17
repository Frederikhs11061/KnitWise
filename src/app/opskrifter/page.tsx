"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  allPatterns,
  type Pattern,
  type PatternLevel,
  type PatternCategory,
} from "@/lib/patterns";

const levels: PatternLevel[] = ["Begynder", "Let øvet", "Øvet", "Avanceret"];
const categories: PatternCategory[] = ["Sweater", "Cardigan", "Tilbehør", "Sæt"];

export default function OpskrifterPage() {
  const [selectedLevel, setSelectedLevel] = useState<PatternLevel | "Alle">("Alle");
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory | "Alle">("Alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc" | "name-desc">("name-asc");

  const filteredAndSorted = useMemo(() => {
    let filtered = allPatterns;

    // Apply filters
    if (selectedLevel !== "Alle") {
      filtered = filtered.filter((p) => p.level === selectedLevel);
    }
    if (selectedCategory !== "Alle") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "da"));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name, "da"));
        break;
    }

    return sorted;
  }, [selectedLevel, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
          Strikkeopskrifter
        </h1>
        <p className="text-charcoal-600 max-w-2xl">
          Alle opskrifter er digitale PDF'er. Når du køber, får du en mail med
          download-link – og kan strikke i dit eget tempo derhjemme.
        </p>
      </header>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Søg efter opskrifter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Level Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-charcoal-600 mb-2">
              Sværhedsgrad
            </label>
            <select
              value={selectedLevel}
              onChange={(e) =>
                setSelectedLevel(e.target.value as PatternLevel | "Alle")
              }
              className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300"
            >
              <option value="Alle">Alle niveauer</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-charcoal-600 mb-2">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as PatternCategory | "Alle")
              }
              className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300"
            >
              <option value="Alle">Alle kategorier</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-charcoal-600 mb-2">
              Sorter efter
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "price-asc"
                    | "price-desc"
                    | "name-asc"
                    | "name-desc"
                )
              }
              className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300"
            >
              <option value="name-asc">Navn (A-Å)</option>
              <option value="name-desc">Navn (Å-A)</option>
              <option value="price-asc">Pris (lav-høj)</option>
              <option value="price-desc">Pris (høj-lav)</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-charcoal-500">
          {filteredAndSorted.length} opskrift{filteredAndSorted.length !== 1 ? "er" : ""} fundet
        </p>
      </div>

      {/* Patterns Grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-charcoal-600 mb-4">
            Ingen opskrifter matcher dine filtre.
          </p>
          <button
            onClick={() => {
              setSelectedLevel("Alle");
              setSelectedCategory("Alle");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg bg-sage-200 text-charcoal-800 hover:bg-sage-300 transition-colors"
          >
            Nulstil filtre
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((pattern) => (
            <PatternCard key={pattern.slug} pattern={pattern} />
          ))}
        </div>
      )}
    </div>
  );
}

function PatternCard({ pattern }: { pattern: Pattern }) {
  return (
    <article className="flex flex-col rounded-2xl border border-beige-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative w-full h-64 bg-gradient-to-br from-rose-100 to-sage-100">
        <Image
          src={pattern.image}
          alt={pattern.name}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
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

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal-500">
              {pattern.level}
            </p>
            <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-sage-700">
              {pattern.category}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-charcoal-900">
            {pattern.name}
          </h2>
        </div>
        <p className="text-sm text-charcoal-600 flex-1 mb-4">
          {pattern.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-beige-100">
          <p className="text-lg font-semibold text-charcoal-900">
            {pattern.price} kr
          </p>
          <div className="flex gap-2">
            <Link
              href={`/opskrifter/${pattern.slug}`}
              className="text-xs px-3 py-1.5 rounded-full border border-beige-200 text-charcoal-800 hover:border-forest-800 hover:text-forest-800 transition-colors"
            >
              Læs mere
            </Link>
            <AddToCartButton patternSlug={pattern.slug} size="small" />
          </div>
        </div>
      </div>
    </article>
  );
}

import AddToCartButton from "@/components/AddToCartButton";
