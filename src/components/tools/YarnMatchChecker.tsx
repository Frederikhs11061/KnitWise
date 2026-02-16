"use client";

/**
 * Garn-sammenligning — tjek om to garn er kompatible.
 * Tykkelse, masketal, pindestørrelse, meter pr. 50g.
 */

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ResultBox from "@/components/ui/ResultBox";

export default function YarnMatchChecker() {
  const [g1Gauge, setG1Gauge] = useState("");
  const [g1Meters50, setG1Meters50] = useState("");
  const [g1Needle, setG1Needle] = useState("");
  const [g2Gauge, setG2Gauge] = useState("");
  const [g2Meters50, setG2Meters50] = useState("");
  const [g2Needle, setG2Needle] = useState("");

  const gg1 = parseFloat(g1Gauge);
  const m1 = parseFloat(g1Meters50);
  const n1 = g1Needle.trim();
  const gg2 = parseFloat(g2Gauge);
  const m2 = parseFloat(g2Meters50);
  const n2 = g2Needle.trim();

  const hasGauge = gg1 > 0 && gg2 > 0;
  const hasMeters = m1 > 0 && m2 > 0;
  const hasAny = hasGauge || hasMeters;

  const gaugeMatch = hasGauge ? Math.abs(gg1 - gg2) <= 2 : null;
  const metersMatch = hasMeters ? Math.abs(m1 - m2) / Math.max(m1, m2) <= 0.15 : null;
  const needleMatch = n1 && n2 ? n1 === n2 : null;

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <p className="text-sm text-charcoal-600 mb-6">
          Sammenlign to garn side om side — masketal, tykkelse (meter pr. 50g)
          og pindestørrelse. Jo tættere de er, jo bedre match.
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-charcoal-700 mb-4 uppercase">
              Garn 1 (opskrift)
            </h3>
            <div className="space-y-4">
              <Input
                label="Masketal (masker pr. 10 cm)"
                type="number"
                min="1"
                step="0.5"
                placeholder="f.eks. 20"
                value={g1Gauge}
                onChange={(e) => setG1Gauge(e.target.value)}
              />
              <Input
                label="Meter pr. 50 g"
                type="number"
                min="1"
                step="1"
                placeholder="f.eks. 120"
                value={g1Meters50}
                onChange={(e) => setG1Meters50(e.target.value)}
              />
              <Input
                label="Anbefalet pindestørrelse"
                type="text"
                placeholder="f.eks. 3 mm"
                value={g1Needle}
                onChange={(e) => setG1Needle(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-charcoal-700 mb-4 uppercase">
              Garn 2 (dit alternativ)
            </h3>
            <div className="space-y-4">
              <Input
                label="Masketal (masker pr. 10 cm)"
                type="number"
                min="1"
                step="0.5"
                placeholder="f.eks. 22"
                value={g2Gauge}
                onChange={(e) => setG2Gauge(e.target.value)}
              />
              <Input
                label="Meter pr. 50 g"
                type="number"
                min="1"
                step="1"
                placeholder="f.eks. 115"
                value={g2Meters50}
                onChange={(e) => setG2Meters50(e.target.value)}
              />
              <Input
                label="Anbefalet pindestørrelse"
                type="text"
                placeholder="f.eks. 3 mm"
                value={g2Needle}
                onChange={(e) => setG2Needle(e.target.value)}
              />
            </div>
          </div>
        </div>

        {hasAny && (
          <ResultBox>
            <p className="font-semibold text-charcoal-900 mb-3">Match-check</p>
            <ul className="space-y-1.5 text-charcoal-600 text-sm">
              {hasGauge && (
                <li>
                  {gaugeMatch ? "✓" : "○"} Masketal:{" "}
                  {gaugeMatch
                    ? "Tæt på (forskellen er ≤ 2)"
                    : "Afviger mere — husk at justere antal masker"}
                </li>
              )}
              {hasMeters && (
                <li>
                  {metersMatch ? "✓" : "○"} Tykkelse (m/50g):{" "}
                  {metersMatch
                    ? "Lignende"
                    : "Forskellig — brug garn-erstatningsberegneren til mængde"}
                </li>
              )}
              {n1 && n2 && (
                <li>
                  {needleMatch ? "✓" : "○"} Pindestørrelse:{" "}
                  {needleMatch ? "Samme" : "Forskellig"}
                </li>
              )}
            </ul>
            {hasGauge && !gaugeMatch && (
              <p className="mt-3 text-sm text-charcoal-600">
                Brug masketal-beregneren til at finde det rigtige antal masker, og
                avanceret garn-erstatning til at beregne nøgler.
              </p>
            )}
          </ResultBox>
        )}
      </div>
    </Card>
  );
}
