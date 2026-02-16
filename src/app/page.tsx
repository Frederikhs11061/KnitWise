import Link from "next/link";

/**
 * KnitWise landing page.
 * Clear headline, pain points, CTA.
 */

const painPoints = [
  {
    title: "Mit masketal matcher ikke opskriften",
    description:
      "Din spænding afviger fra designeren. Vores masketal-beregner fortæller dig præcis, hvor mange masker du skal slå op i stedet.",
    icon: "🧶",
  },
  {
    title: "Hvor mange masker skal jeg slå op?",
    description:
      "Du kender dit masketal og ønsket bredde — men ikke antal masker. Vores beregner finder svaret for dig.",
    icon: "📐",
  },
  {
    title: "Kan jeg bruge et andet garn?",
    description:
      "Opskriften kræver et garn du ikke har. Vores garn-erstatning viser, hvor mange nøgler af dit garn du skal bruge.",
    icon: "🧵",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-4 py-16 sm:py-24 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
          Stop med at gætte på din strikke-matematik.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-charcoal-600 leading-relaxed">
          Simple værktøjer der hjælper dig med at justere opskrifter, erstatte
          garn og beregne masker korrekt.
        </p>
        <Link
          href="/tools"
          className="mt-10 inline-block px-8 py-3.5 bg-sage-300 text-charcoal-800 font-semibold rounded-xl hover:bg-sage-400 transition-colors shadow-sm"
        >
          Prøv værktøjerne
        </Link>
      </section>

      {/* Pain points */}
      <section className="px-4 py-16 bg-cream-100/50 border-t border-beige-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-10 text-center">
            Lyder det bekendt?
          </h2>
          <div className="space-y-8">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 rounded-2xl bg-white border border-beige-200"
              >
                <span className="text-3xl flex-shrink-0" aria-hidden>
                  {point.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal-800">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-charcoal-600">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/tools"
              className="text-sage-400 font-medium hover:text-sage-300 transition-colors"
            >
              Brug værktøjerne →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-beige-200">
        <p className="text-center text-sm text-charcoal-400">
          KnitWise — rolig, simpel strikke-matematik
        </p>
      </footer>
    </div>
  );
}
