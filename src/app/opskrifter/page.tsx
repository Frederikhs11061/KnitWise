import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strikkeopskrifter | Stitch of Care",
  description:
    "Køb håndtegnede strikkeopskrifter fra Stitch of Care. Sweaters, cardigans og tilbehør i et roligt, skandinavisk udtryk.",
};

const patterns = [
  {
    slug: "hygge-sweater",
    name: "Hygge Sweater",
    level: "Let øvet",
    description:
      "En blød, oversize hverdagssweater med klassisk rund hals og ribkanter. Perfekt til sofa-strik og kolde dage.",
    price: 55,
  },
  {
    slug: "havbrise-cardigan",
    name: "Havbrise Cardigan",
    level: "Øvet",
    description:
      "Let, åben cardigan med enkelt strukturmønster og let pasform. Strikkes oppefra og ned, så du kan justere længden undervejs.",
    price: 60,
  },
  {
    slug: "lun-hue",
    name: "Lun hue & hals",
    level: "Begynder",
    description:
      "Sæt med hue og halsedisse i tykt garn – et hurtigt projekt og perfekt til restegarn.",
    price: 40,
  },
];

export default function OpskrifterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
          Strikkeopskrifter
        </h1>
        <p className="text-charcoal-600 max-w-2xl">
          Alle opskrifter er digitale PDF’er. Når du køber, får du en mail med
          download-link (kommer i næste version) – og kan strikke i dit eget
          tempo derhjemme.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((p) => (
          <article
            key={p.slug}
            className="flex flex-col rounded-2xl border border-beige-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3">
              <p className="text-xs uppercase tracking-[0.18em] text-charcoal-500 mb-1">
                {p.level}
              </p>
              <h2 className="text-lg font-semibold text-charcoal-900">
                {p.name}
              </h2>
            </div>
            <p className="text-sm text-charcoal-600 flex-1">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-charcoal-900">
                {p.price} kr
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/opskrifter/${p.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full border border-beige-200 text-charcoal-800 hover:border-charcoal-900 hover:text-charcoal-900 transition-colors"
                >
                  Læs mere
                </Link>
                <button
                  type="button"
                  className="text-xs px-3 py-1.5 rounded-full bg-charcoal-900 text-cream-50 hover:bg-charcoal-800 transition-colors"
                  disabled
                >
                  Læg i kurv
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

