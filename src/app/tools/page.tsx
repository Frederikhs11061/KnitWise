import type { Metadata } from "next";
import Link from "next/link";
import GaugeCalculator from "@/components/tools/GaugeCalculator";
import StitchWidthCalculator from "@/components/tools/StitchWidthCalculator";
import YarnSubstitutionCalculator from "@/components/tools/YarnSubstitutionCalculator";
import YarnUsageEstimator from "@/components/tools/YarnUsageEstimator";

export const metadata: Metadata = {
  title: "Værktøjer — Masketal, masker, garn-beregnere",
  description:
    "Masketal-beregner, maske-justering, garn-erstatning og garnforbrugsestimator.",
};

const tools = [
  {
    id: "gauge",
    title: "Masketal-beregner",
    description:
      "Dit masketal afviger fra opskriften? Få det korrekte antal masker.",
  },
  {
    id: "stitch-width",
    title: "Maskebredde-beregner",
    description: "Kender du antal masker og masketal? Se hvor bredt det bliver.",
  },
  {
    id: "yarn-substitution",
    title: "Garn-erstatning beregner",
    description: "Bruger du et andet garn? Find ud af hvor mange nøgler du skal bruge.",
  },
  {
    id: "yarn-usage",
    title: "Garnforbrugs-estimator",
    description: "Planlægger du et projekt? Estimer hvor meget garn du skal bruge.",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <Link
          href="/"
          className="text-charcoal-500 hover:text-charcoal-700 text-sm font-medium mb-4 inline-block"
        >
          ← Tilbage
        </Link>
        <h1 className="text-3xl font-bold text-charcoal-900">
          Strikke-værktøjer
        </h1>
        <p className="mt-2 text-charcoal-600">
          Fire simple beregnere til almindelig strikke-matematik.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Spring til værktøj">
          {tools.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="px-3 py-1.5 text-sm rounded-lg bg-beige-200/60 hover:bg-beige-200 text-charcoal-700 transition-colors"
            >
              {t.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="grid gap-12">
        {tools.map((tool, i) => (
          <section
            key={tool.id}
            id={tool.id}
            className="scroll-mt-24"
          >
            <h2 className="text-xl font-semibold text-charcoal-800 mb-2">
              {tool.title}
            </h2>
            <p className="text-charcoal-600 mb-6">{tool.description}</p>
            {tool.id === "gauge" && <GaugeCalculator />}
            {tool.id === "stitch-width" && <StitchWidthCalculator />}
            {tool.id === "yarn-substitution" && <YarnSubstitutionCalculator />}
            {tool.id === "yarn-usage" && <YarnUsageEstimator />}
          </section>
        ))}
      </div>
    </div>
  );
}
