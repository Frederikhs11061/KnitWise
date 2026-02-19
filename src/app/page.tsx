import Link from "next/link";
import Image from "next/image";
import { getFeaturedPatterns } from "@/lib/patterns";
import HomeReviews from "@/components/HomeReviews";

// Get featured patterns - limit to 3 for homepage
const featuredPatterns = getFeaturedPatterns().slice(0, 3);

const painPoints = [
  {
    title: "Mit garnbudget eksploderer",
    description:
      "Opskriften bruger dyrt garn. Vores beregnere hjælper dig med at finde et billigere alternativ og beregner præcis hvor meget du skal købe.",
    icon: "💸",
  },
  {
    title: "Min strikkefasthed matcher ikke opskriften",
    description:
      "Din strikkefasthed er anderledes end designerens. Beregnerne viser hvor mange masker du skal slå op for at ramme samme størrelse.",
    icon: "🧶",
  },
  {
    title: "Jeg er i tvivl om hvilket garn der passer",
    description:
      "Med garn‑sammenligneren kan du hurtigt se, om to garner ligner hinanden nok til at blive byttet ud.",
    icon: "📏",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero - Lovable style */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-rose-100 to-amber-100" />
          <Image
            src="/assets/hero-knitting.jpg"
            alt="Strikkeopskrifter"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(345_35%_48%_/_0.4)] via-[hsl(345_35%_48%_/_0.2)] to-[hsl(38_65%_55%_/_0.3)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-sm font-light uppercase tracking-[0.3em] text-white/90 mb-4">
            Strik med glæde
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Din guide til
            <br />
            <span className="text-[hsl(345_35%_65%)] font-normal italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              smukke masker
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Brug vores gratis strikkeberegner til at beregne garnmængde og maskeantal – og find
            din næste yndlingsopskrift i vores shop.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[hsl(345_35%_48%)] text-white text-base font-semibold hover:bg-[hsl(345_35%_42%)] transition-colors shadow-lg hover:shadow-xl"
            >
              Prøv beregneren gratis
            </Link>
            <Link
              href="/opskrifter"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[hsl(38_30%_95%)] text-[hsl(25_30%_25%)] text-base font-semibold hover:bg-[hsl(38_30%_98%)] transition-colors border-2 border-[hsl(38_20%_85%)]"
            >
              Se alle opskrifter →
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-light">
            Scroll ned
          </p>
        </div>
      </section>

      {/* Featured Patterns */}
      <section className="px-4 py-16 bg-white border-b border-beige-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-charcoal-900 mb-10 text-center">
            Udvalgte opskrifter
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPatterns.map((p) => (
              <Link
                key={p.slug}
                href={`/opskrifter/${p.slug}`}
                className="group flex flex-col rounded-2xl border-2 border-beige-200 bg-cream-50 hover:border-[hsl(345_35%_48%)] transition-all shadow-sm hover:shadow-lg overflow-hidden"
              >
                  <div className="relative w-full h-48 bg-gradient-to-br from-rose-100 to-sage-100">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-charcoal-400">
                      <span className="text-4xl">🧶</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-[hsl(345_35%_48%)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-charcoal-600 mb-4 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-charcoal-900">{p.price} kr</span>
                    <span className="text-sm text-[hsl(345_35%_48%)] font-medium group-hover:underline">
                      Se opskrift →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="px-4 py-16 bg-gradient-to-b from-[hsl(150_18%_95%)] to-cream-50 border-b border-beige-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-charcoal-900 mb-10 text-center">
            Kender du det her?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-6 rounded-2xl bg-white border-2 border-[hsl(150_18%_88%)] hover:border-[hsl(150_18%_75%)] transition-colors shadow-sm hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden>
                  {point.icon}
                </span>
                <h3 className="text-base font-semibold text-charcoal-800">
                  {point.title}
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <HomeReviews />

      {/* Blog teaser */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-3xl font-bold text-charcoal-900">
              Fra bloggen
            </h2>
            <Link
              href="/blog"
              className="text-sm text-[hsl(345_35%_48%)] hover:text-[hsl(345_35%_42%)] font-medium transition-colors"
            >
              Læs alle indlæg →
            </Link>
          </div>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Vi skriver om garnvalg, strikkefasthed og hvordan du kan bruge
            beregnerne til at spare penge på garn uden at gå på kompromis med
            udtrykket.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-beige-200 bg-[hsl(38_35%_96%)]">
        <p className="text-center text-sm text-charcoal-500">
          Stitch of Care — strikkeopskrifter, roligt tempo og gennemtænkte
          beregnere
        </p>
      </footer>
    </div>
  );
}
