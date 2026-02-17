import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om Stitch of Care",
  description:
    "Stitch of Care er et lille strikkeunivers med roligt tempo, gennemtænkte opskrifter og hjælpsomme beregnere.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-4">Om os</h1>
      <p className="text-charcoal-700 text-sm leading-relaxed mb-4">
        Stitch of Care er født ud af følelsen af, at strik skal være rart – ikke
        stressende. Vi vil gerne gøre det nemmere at vælge garn, forstå
        strikkefasthed og komme i mål med projekter, du har lyst til at bruge
        igen og igen.
      </p>
      <p className="text-charcoal-700 text-sm leading-relaxed mb-4">
        KnitWise‑beregnerne er bygget, fordi vi selv har prøvet at købe for dyrt
        garn, tre nøgler for meget eller strikke en hel sweater, der endte to
        størrelser forkert. Det kan vi gøre bedre – særligt når man ikke gider
        sidde med hovedregning efter en lang dag.
      </p>
      <p className="text-charcoal-700 text-sm leading-relaxed">
        På sigt vil vi gerne udvide med flere opskrifter, guides og
        hjælpeværktøjer, så Stitch of Care kan være dit rolige sted at lande,
        når du vil planlægge næste projekt. Indtil da er vi glade for, at du er
        her – og håber du får glæde af både opskrifter og beregnere.
      </p>
    </div>
  );
}

