import type { Metadata } from "next";
import Link from "next/link";
import type { FC } from "react";

const posts = [
  {
    slug: "forsta-strikkefasthed",
    title: "Forstå strikkefasthed – uden at få ondt i hovedet",
    tag: "Strikkefasthed",
    body: [
      "Strikkefasthed er antallet af masker og pinde på 10 cm. Det lyder teknisk, men i praksis handler det bare om, hvor tæt eller løst du strikker.",
      "Når en opskrift fx siger 20 masker = 10 cm, betyder det, at designeren har strikket en prøve med 20 masker og målt, at den blev 10 cm bred.",
      "Hvis du strikker løsere og kun får 18 masker på 10 cm, bliver dit færdige arbejde større end designet. Strikker du strammere og får 22 masker, bliver det mindre.",
      "Derfor er strikkefasthed vigtigst i bluser, sweatre og huer – alt det, der skal passe nogenlunde i størrelsen. I sjaler og tæpper kan du ofte slappe lidt mere af.",
      "Vores maskeberegnere hjælper dig med at omsætte forskellen i strikkefasthed til konkrete tal: hvor mange masker du skal slå op, og hvor meget garn du cirka skal bruge.",
    ],
  },
  {
    slug: "skift-til-billigere-garn",
    title: "Sådan skifter du til billigere garn uden at gamble",
    tag: "Garn-erstatning",
    body: [
      "Mange opskrifter er skrevet til garn til 70–130 kr pr. nøgle. Det er lækkert – men en sweater kan hurtigt ende på 1.200–1.500 kr.",
      "I stedet for at opgive opskriften kan du finde et alternativt garn, der har samme nogenlunde tykkelse og strikkefasthed. Det er her garn‑erstatning kommer ind i billedet.",
      "Start med at kigge på: meter pr. nøgle, strikkefasthed og anbefalet pindestørrelse. Brug derefter den avancerede garn‑erstatningsberegner til at regne på, hvor mange nøgler du skal bruge – justeret for din egen strikkefasthed.",
      "På den måde slipper du for at købe tre nøgler for meget “for en sikkerheds skyld”, og du kan bruge dit garnbudget dér, hvor det giver mest mening for dig.",
    ],
  },
  {
    slug: "kalkuler-garnforbrug",
    title: "Hvor meget garn skal jeg købe? Brug tal i stedet for mavefornemmelse",
    tag: "Garnforbrug",
    body: [
      "Vi kender alle følelsen af at stå i garnbutikken og gætte: er fire nøgler nok – eller burde jeg tage seks?",
      "Opskrifter angiver heldigvis typisk et cirka forbrug i gram eller nøgler. Ved at omsætte det til meter og kombinere det med din egen strikkefasthed, kan du komme meget tættere på det reelle forbrug.",
      "Vores garnforbrugs‑beregner bruger erfarings‑tabel for forskellige typer projekter (sweater, cardigan, hue osv.) og garnvægte. Det giver dig et udgangspunkt, som du kan tilpasse med de andre værktøjer.",
      "Målet er ikke at ramme på meteren – men at du køber garn med ro i maven og undgår store mængder spildgarn.",
    ],
  },
];

type Params = { slug: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Blogindlæg ikke fundet | Stitch of Care",
    };
  }
  return {
    title: `${post.title} | Stitch of Care`,
    description: post.body[0],
  };
}

const BlogPostPage: FC<{ params: Params }> = ({ params }) => {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-charcoal-600">Indlægget blev ikke fundet.</p>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sage-400 hover:text-sage-300 text-sm font-medium"
        >
          Tilbage til bloggen
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-charcoal-500 hover:text-charcoal-700 text-sm font-medium mb-6 inline-block"
      >
        ← Tilbage til bloggen
      </Link>

      <p className="text-xs uppercase tracking-[0.18em] text-charcoal-500 mb-2">
        {post.tag}
      </p>
      <h1 className="text-3xl font-bold text-charcoal-900 mb-4">
        {post.title}
      </h1>

      <div className="space-y-4 text-sm text-charcoal-700 leading-relaxed">
        {post.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogPostPage;

