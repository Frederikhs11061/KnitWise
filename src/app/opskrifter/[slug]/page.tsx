import type { Metadata } from "next";
import Link from "next/link";
import type { FC } from "react";

const patterns = [
  {
    slug: "hygge-sweater",
    name: "Hygge Sweater",
    level: "Let øvet",
    price: 55,
    intro:
      "Hygge Sweater er tænkt som din go‑to hverdagssweater – rummelig, blød og lige til at trække over hovedet.",
    construction:
      "Sweateren strikkes oppefra og ned med raglanudtagninger, så du nemt kan justere længde på krop og ærmer undervejs.",
    yarn:
      "Opskriften er skrevet til uldgarn i DK‑tykkelse. Du kan bruge KnitWise’ garn‑erstatningsberegner til at finde et billigere alternativ.",
    includes:
      "Opskriften indeholder detaljeret vejledning, diagrammer til ribkanter og tips til at tilpasse længde og pasform.",
  },
  {
    slug: "havbrise-cardigan",
    name: "Havbrise Cardigan",
    level: "Øvet",
    price: 60,
    intro:
      "En let cardigan med enkel struktur, der fungerer både åben og lukket – perfekt over kjoler og højtaljede bukser.",
    construction:
      "Cardiganen strikkes oppefra og ned, frem og tilbage på rundpind med bærestykke i strukturmønster.",
    yarn:
      "Designet til uld eller uld/silke. Brug gerne beregneren, hvis du vil vælge et andet garn end det anbefalede.",
    includes:
      "Opskriften indeholder diagrammer til mønster, forklaring af alle teknikker og forslag til længde på krop og ærmer.",
  },
  {
    slug: "lun-hue",
    name: "Lun hue & hals",
    level: "Begynder",
    price: 40,
    intro:
      "Et hurtigt sæt med hue og halsedisse i tykt garn – perfekt som første projekt eller som gave.",
    construction:
      "Begge dele strikkes rundt på rundpind. Hue med enkel indtagning i toppen, hals med blød rib.",
    yarn:
      "Strikkes i bulky‑garn eller to tråde lettere garn holdt sammen. Strikkefastheden er vigtig – tjek den med en lille prøve.",
    includes:
      "Opskriften gennemgår alle trin roligt og uden unødigt fagsprog, så nye strikkere kan være med.",
  },
];

type Params = { slug: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const pattern = patterns.find((p) => p.slug === params.slug);
  if (!pattern) {
    return {
      title: "Opskrift ikke fundet | Stitch of Care",
    };
  }
  return {
    title: `${pattern.name} | Stitch of Care`,
    description: pattern.intro,
  };
}

const PatternPage: FC<{ params: Params }> = ({ params }) => {
  const pattern = patterns.find((p) => p.slug === params.slug);

  if (!pattern) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-charcoal-600">Opskriften blev ikke fundet.</p>
        <Link
          href="/opskrifter"
          className="mt-4 inline-block text-sage-400 hover:text-sage-300 text-sm font-medium"
        >
          Tilbage til alle opskrifter
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/opskrifter"
        className="text-charcoal-500 hover:text-charcoal-700 text-sm font-medium mb-6 inline-block"
      >
        ← Tilbage til opskrifter
      </Link>

      <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
        {pattern.name}
      </h1>
      <p className="text-sm uppercase tracking-[0.18em] text-charcoal-500 mb-4">
        {pattern.level}
      </p>

      <p className="text-charcoal-700 mb-4">{pattern.intro}</p>

      <div className="space-y-3 text-sm text-charcoal-700 mb-6">
        <p>
          <span className="font-semibold">Konstruktion: </span>
          {pattern.construction}
        </p>
        <p>
          <span className="font-semibold">Garn: </span>
          {pattern.yarn}
        </p>
        <p>
          <span className="font-semibold">Det får du: </span>
          {pattern.includes}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mt-6">
        <p className="text-lg font-semibold text-charcoal-900">
          {pattern.price} kr
        </p>
        <button
          type="button"
          className="px-6 py-2.5 rounded-xl bg-charcoal-900 text-cream-50 text-sm font-semibold hover:bg-charcoal-800 transition-colors"
          disabled
        >
          Læg i kurv (kommer snart)
        </button>
      </div>

      <p className="mt-4 text-xs text-charcoal-500">
        Når vi har tilføjet betaling, modtager du opskriften som PDF på mail
        umiddelbart efter køb.
      </p>
    </div>
  );
};

export default PatternPage;

