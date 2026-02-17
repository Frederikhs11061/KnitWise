/**
 * Central data file for all knitting patterns
 * Used across the shop pages
 */

export type PatternLevel = "Begynder" | "Let øvet" | "Øvet" | "Avanceret";
export type PatternCategory = "Sweater" | "Cardigan" | "Tilbehør" | "Sæt";

export interface Pattern {
  slug: string;
  name: string;
  level: PatternLevel;
  category: PatternCategory;
  description: string;
  price: number;
  image: string; // Path to image
  intro: string;
  construction: string;
  yarn: string;
  includes: string;
  featured?: boolean;
}

export const allPatterns: Pattern[] = [
  {
    slug: "hygge-sweater",
    name: "Hygge Sweater",
    level: "Let øvet",
    category: "Sweater",
    description:
      "En blød, oversize hverdagssweater med klassisk rund hals og ribkanter. Perfekt til sofa-strik og kolde dage.",
    price: 55,
    image: "/assets/patterns/hygge-sweater.jpg",
    intro:
      "Hygge Sweater er tænkt som din go‑to hverdagssweater – rummelig, blød og lige til at trække over hovedet.",
    construction:
      "Sweateren strikkes oppefra og ned med raglanudtagninger, så du nemt kan justere længde på krop og ærmer undervejs.",
    yarn:
      "Opskriften er skrevet til uldgarn i DK‑tykkelse. Du kan bruge vores garn‑erstatningsberegner til at finde et billigere alternativ.",
    includes:
      "Opskriften indeholder detaljeret vejledning, diagrammer til ribkanter og tips til at tilpasse længde og pasform.",
    featured: true,
  },
  {
    slug: "havbrise-cardigan",
    name: "Havbrise Cardigan",
    level: "Øvet",
    category: "Cardigan",
    description:
      "Let, åben cardigan med enkelt strukturmønster og let pasform. Strikkes oppefra og ned, så du kan justere længden undervejs.",
    price: 60,
    image: "/assets/patterns/havbrise-cardigan.jpg",
    intro:
      "En let cardigan med enkel struktur, der fungerer både åben og lukket – perfekt over kjoler og højtaljede bukser.",
    construction:
      "Cardiganen strikkes oppefra og ned, frem og tilbage på rundpind med bærestykke i strukturmønster.",
    yarn:
      "Designet til uld eller uld/silke. Brug gerne beregneren, hvis du vil vælge et andet garn end det anbefalede.",
    includes:
      "Opskriften indeholder diagrammer til mønster, forklaring af alle teknikker og forslag til længde på krop og ærmer.",
    featured: true,
  },
  {
    slug: "lun-hue",
    name: "Lun hue & hals",
    level: "Begynder",
    category: "Tilbehør",
    description:
      "Sæt med hue og halsedisse i tykt garn – et hurtigt projekt og perfekt til restegarn.",
    price: 40,
    image: "/assets/patterns/lun-hue.jpg",
    intro:
      "Et hurtigt sæt med hue og halsedisse i tykt garn – perfekt som første projekt eller som gave.",
    construction:
      "Begge dele strikkes rundt på rundpind. Hue med enkel indtagning i toppen, hals med blød rib.",
    yarn:
      "Strikkes i bulky‑garn eller to tråde lettere garn holdt sammen. Strikkefastheden er vigtig – tjek den med en lille prøve.",
    includes:
      "Opskriften gennemgår alle trin roligt og uden unødigt fagsprog, så nye strikkere kan være med.",
    featured: true,
  },
  {
    slug: "vinter-sweater",
    name: "Vinter Sweater",
    level: "Let øvet",
    category: "Sweater",
    description:
      "Varm, tætsiddende sweater med høj hals og ribkanter. Perfekt til kolde vinterdage med dansk vejr.",
    price: 65,
    image: "/assets/patterns/vinter-sweater.jpg",
    intro:
      "En klassisk vintersweater der holder dig varm og ser godt ud. Designet med dansk vinter i tankerne.",
    construction:
      "Strikkes oppefra og ned med raglanudtagninger. Høj hals med rib og ribkanter på ærmer og bund.",
    yarn:
      "Anbefalet til tykt uldgarn eller alpaca/uld blanding for maksimal varme.",
    includes:
      "Opskrift i flere størrelser, detaljerede diagrammer og tips til at tilpasse pasformen.",
  },
  {
    slug: "sommer-cardigan",
    name: "Sommer Cardigan",
    level: "Øvet",
    category: "Cardigan",
    description:
      "Let, åben cardigan i bomuld eller bomuld/uld blanding. Perfekt til danske sommerdage og kølige aftener.",
    price: 58,
    image: "/assets/patterns/sommer-cardigan.jpg",
    intro:
      "En let cardigan der fungerer året rundt. Perfekt til at have i tasken til danske sommerdage.",
    construction:
      "Strikkes oppefra og ned med åben struktur. Let pasform der flyder godt.",
    yarn:
      "Designet til bomuld eller bomuld/uld blanding. Let og luftig til varmere vejr.",
    includes:
      "Opskrift med flere størrelser, diagrammer og vejledning til at tilpasse længde.",
  },
  {
    slug: "hygge-sokker",
    name: "Hygge Sokker",
    level: "Begynder",
    category: "Tilbehør",
    description:
      "Bløde, varme sokker i tykt garn. Perfekt begynderprojekt og ideel til restegarn.",
    price: 35,
    image: "/assets/patterns/hygge-sokker.jpg",
    intro:
      "Et klassisk projekt der aldrig går af mode. Disse sokker er perfekte til at lære grundlæggende teknikker.",
    construction:
      "Strikkes rundt på strømpepinde fra tå til hæl. Enkel hælkonstruktion.",
    yarn:
      "Anbefalet til tykt garn eller to tråde lettere garn. Perfekt til restegarn.",
    includes:
      "Gennemgang af alle teknikker, størrelsesguide og tips til at få den perfekte pasform.",
  },
  {
    slug: "familie-sweater",
    name: "Familie Sweater",
    level: "Let øvet",
    category: "Sweater",
    description:
      "Klassisk sweater der passer til hele familien. Opskrift i størrelser fra 2 år til voksen XL.",
    price: 70,
    image: "/assets/patterns/familie-sweater.jpg",
    intro:
      "En sweater der kan strikkes til hele familien. Samme opskrift, forskellige størrelser.",
    construction:
      "Strikkes oppefra og ned med raglanudtagninger. Samme konstruktion til alle størrelser.",
    yarn:
      "Anbefalet til DK eller Aran garn. Let at finde billige alternativer.",
    includes:
      "Opskrift i alle størrelser, størrelsesguide og tips til at tilpasse til forskellige aldersgrupper.",
  },
  {
    slug: "vinter-sæt",
    name: "Vinter Sæt",
    level: "Begynder",
    category: "Sæt",
    description:
      "Komplet sæt med hue, hals og vanter. Perfekt til at holde varmen i dansk vinter.",
    price: 75,
    image: "/assets/patterns/vinter-sæt.jpg",
    intro:
      "Et komplet sæt der holder dig varm hele vinteren. Perfekt begynderprojekt.",
    construction:
      "Alle dele strikkes rundt på rundpind. Enkle teknikker der er lette at lære.",
    yarn:
      "Anbefalet til tykt garn for maksimal varme. Perfekt til at bruge samme garn til hele sættet.",
    includes:
      "Opskrifter til alle tre dele, størrelsesguide og tips til at matche farver.",
  },
  {
    slug: "elegant-cardigan",
    name: "Elegant Cardigan",
    level: "Avanceret",
    category: "Cardigan",
    description:
      "Elegant cardigan med fine detaljer og struktureret mønster. Perfekt til særlige lejligheder.",
    price: 85,
    image: "/assets/patterns/elegant-cardigan.jpg",
    intro:
      "En cardigan der skiller sig ud. Med fine detaljer og struktureret mønster er den perfekt til særlige lejligheder.",
    construction:
      "Strikkes oppefra og ned med komplekse mønstre. Kræver erfaring med avancerede teknikker.",
    yarn:
      "Anbefalet til finere garn som merino uld eller uld/silke blanding.",
    includes:
      "Detaljerede diagrammer, gennemgang af alle teknikker og tips til at få det perfekte resultat.",
  },
  {
    slug: "børne-sweater",
    name: "Børne Sweater",
    level: "Begynder",
    category: "Sweater",
    description:
      "Sjov og farverig sweater til børn. Let at strikke og perfekt til at lære grundlæggende teknikker.",
    price: 45,
    image: "/assets/patterns/børne-sweater.jpg",
    intro:
      "En sweater der både børn og voksne vil elske. Farverig og sjov, men stadig praktisk.",
    construction:
      "Strikkes oppefra og ned med enkle teknikker. Perfekt til begyndere.",
    yarn:
      "Anbefalet til børnevenligt garn der kan vaskes. Mange farver mulige.",
    includes:
      "Opskrift i flere størrelser, farveguide og tips til at lave det sjovt for børnene.",
  },
];

export const getPatternBySlug = (slug: string): Pattern | undefined => {
  return allPatterns.find((p) => p.slug === slug);
};

export const getFeaturedPatterns = (): Pattern[] => {
  return allPatterns.filter((p) => p.featured);
};

export const filterPatterns = (
  patterns: Pattern[],
  filters: {
    level?: PatternLevel;
    category?: PatternCategory;
    search?: string;
  }
): Pattern[] => {
  let filtered = [...patterns];

  if (filters.level) {
    filtered = filtered.filter((p) => p.level === filters.level);
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

export const sortPatterns = (
  patterns: Pattern[],
  sortBy: "price-asc" | "price-desc" | "name-asc" | "name-desc"
): Pattern[] => {
  const sorted = [...patterns];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "da"));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name, "da"));
    default:
      return sorted;
  }
};
