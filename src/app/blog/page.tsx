import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog om strik | Stitch of Care",
  description:
    "Lær om strikkefasthed, garnvalg og garn-erstatning. Blogindlæg der understøtter KnitWise strikkeberegneren.",
};

const posts = [
  {
    slug: "forsta-strikkefasthed",
    title: "Forstå strikkefasthed – uden at få ondt i hovedet",
    intro:
      "Strikkefasthed handler ikke om at være perfekt, men om at vide, hvad du siger ja til. Her gennemgår vi det helt roligt.",
    tag: "Strikkefasthed",
  },
  {
    slug: "skift-til-billigere-garn",
    title: "Sådan skifter du til billigere garn uden at gamble",
    intro:
      "Originalgarnet er dyrt, men du vil stadig ramme samme pasform. Vi viser, hvordan du bruger beregneren til at vælge alternativ.",
    tag: "Garn-erstatning",
  },
  {
    slug: "kalkuler-garnforbrug",
    title: "Hvor meget garn skal jeg købe? Brug tal i stedet for mavefornemmelse",
    intro:
      "Et par simple tal kan spare dig for både spild og garnpanik. Her er guiden, der matcher vores garnforbrugs-beregner.",
    tag: "Garnforbrug",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
          Blog om strik
        </h1>
        <p className="text-charcoal-600 max-w-2xl">
          Korte, konkrete indlæg om garnvalg, strikkefasthed og hvordan du får
          mest muligt ud af KnitWise‑beregnerne.
        </p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-beige-200 bg-white px-5 py-4 hover:border-charcoal-800 transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal-500 mb-1">
              {post.tag}
            </p>
            <h2 className="text-lg font-semibold text-charcoal-900 mb-1">
              {post.title}
            </h2>
            <p className="text-sm text-charcoal-600 mb-2">{post.intro}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm text-sage-400 hover:text-sage-300 font-medium"
            >
              Læs indlæg →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

