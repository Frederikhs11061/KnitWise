import Link from "next/link";

const featuredPatterns = [
  {
    slug: "hygge-sweater",
    name: "Hygge Sweater",
    tagline: "En blød, oversize hverdagssweater",
    price: 55,
  },
  {
    slug: "havbrise-cardigan",
    name: "Havbrise Cardigan",
    tagline: "Let cardigan med strukturmønster",
    price: 60,
  },
  {
    slug: "lun-hue",
    name: "Lun hue & hals",
    tagline: "Perfekt begyndersæt til restegarn",
    price: 40,
  },
];

const painPoints = [
  {
    title: "Mit garnbudget eksploderer",
    description:
      "Opskriften bruger dyrt garn. KnitWise hjælper dig med at finde et billigere alternativ og beregner præcis hvor meget du skal købe.",
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
      {/* Hero */}
      <section className="px-4 py-14 sm:py-20 border-b border-beige-200 bg-cream-50">
        <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-charcoal-500 mb-3">
              Stitch of Care
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
              Strikkeopskrifter med omtanke – og en strikkeberegner der
              forhindrer fejlkøb af garn.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Find opskrifter du får lyst til at strikke igen og igen, og brug
              KnitWise til at regne på strikkefasthed, garn‑erstatning og
              garnforbrug, før du køber ind.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/opskrifter"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-charcoal-900 text-cream-50 text-sm font-semibold hover:bg-charcoal-800 transition-colors"
              >
                Se opskrifter
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-sage-300 text-charcoal-800 text-sm font-semibold bg-white/70 hover:bg-sage-100 transition-colors"
              >
                Brug strikkeberegneren
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-beige-200 bg-white/80 p-5 sm:p-6 shadow-sm">
            <p className="text-sm font-medium text-charcoal-700 mb-4">
              Udvalgte opskrifter
            </p>
            <ul className="space-y-3">
              {featuredPatterns.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-beige-200/80 bg-cream-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-charcoal-900">
                      {p.name}
                    </p>
                    <p className="text-xs text-charcoal-500">{p.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-charcoal-900">
                      {p.price} kr
                    </p>
                    <Link
                      href={`/opskrifter/${p.slug}`}
                      className="text-xs text-sage-400 hover:text-sage-300 font-medium"
                    >
                      Se opskrift
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="px-4 py-16 bg-cream-100/60 border-b border-beige-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-8 text-center">
            Kender du det her?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-beige-200"
              >
                <span className="text-2xl" aria-hidden>
                  {point.icon}
                </span>
                <h3 className="text-sm font-semibold text-charcoal-800">
                  {point.title}
                </h3>
                <p className="text-sm text-charcoal-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-charcoal-900">
              Fra bloggen
            </h2>
            <Link
              href="/blog"
              className="text-sm text-sage-400 hover:text-sage-300 font-medium"
            >
              Læs alle indlæg →
            </Link>
          </div>
          <p className="text-sm text-charcoal-600">
            Vi skriver om garnvalg, strikkefasthed og hvordan du kan bruge
            beregnerne til at spare penge på garn uden at gå på kompromis med
            udtrykket.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-beige-200">
        <p className="text-center text-sm text-charcoal-400">
          Stitch of Care — strikkeopskrifter, roligt tempo og gennemtænkte
          beregnere
        </p>
      </footer>
    </div>
  );
}
