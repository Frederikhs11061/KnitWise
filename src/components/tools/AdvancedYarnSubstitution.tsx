"use client";

/**
 * Avanceret garn-erstatning
 * Justerer for strikkefasthed (masketal) — så du ikke køber for meget eller for lidt.
 * Formel: justeret_meter = opskrift_meter × (opskrift_masketal / dit_masketal)
 * Tættere gauge = færre meter. Løsere gauge = flere meter.
 */

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ResultBox from "@/components/ui/ResultBox";

export default function AdvancedYarnSubstitution() {
  const [patternMetersPerSkein, setPatternMetersPerSkein] = useState("");
  const [patternSkeins, setPatternSkeins] = useState("");
  const [patternGauge, setPatternGauge] = useState("");
  const [yourMetersPerSkein, setYourMetersPerSkein] = useState("");
  const [yourGauge, setYourGauge] = useState("");
  const [patternPrice, setPatternPrice] = useState("");
  const [yourPrice, setYourPrice] = useState("");

  const patternM = parseFloat(patternMetersPerSkein);
  const patternS = parseFloat(patternSkeins);
  const patternG = parseFloat(patternGauge);
  const yourM = parseFloat(yourMetersPerSkein);
  const yourG = parseFloat(yourGauge);
  const pricePat = parseFloat(patternPrice);
  const priceYours = parseFloat(yourPrice);

  const hasBasic = patternM > 0 && patternS > 0 && yourM > 0;
  const useGauge = patternG > 0 && yourG > 0;
  const isValid = hasBasic;

  let totalMeters = 0;
  let adjustedMeters = 0;
  let requiredSkeins = 0;
  let gaugeFactor = 1;

  if (isValid) {
    totalMeters = patternM * patternS;
    if (useGauge) {
      gaugeFactor = patternG / yourG;
      adjustedMeters = totalMeters * gaugeFactor;
    } else {
      adjustedMeters = totalMeters;
    }
    requiredSkeins = Math.ceil((adjustedMeters / yourM) * 1.1);
  }

  const origCost = pricePat > 0 && patternS > 0 ? Math.round(patternS * pricePat) : null;
  const newCost = priceYours > 0 && requiredSkeins > 0 ? Math.round(requiredSkeins * priceYours) : null;
  const savings = origCost != null && newCost != null && origCost > newCost ? origCost - newCost : null;

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <p className="text-sm text-charcoal-600 mb-6">
          Opskriftens garn (fx Sandnes Peer Gynt) er ofte dyrt. Her beregner du
          præcis hvor mange nøgler af dit alternativ du skal bruge — inkl.
          justering hvis dit masketal afviger. Det kan spare dig for at købe for
          meget.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-charcoal-700 mb-4 uppercase tracking-wide">
              Opskriftens garn
            </h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Input
                label="Meter pr. nøgle"
                type="number"
                min="1"
                step="1"
                placeholder="f.eks. 120 (Peer Gynt)"
                value={patternMetersPerSkein}
                onChange={(e) => setPatternMetersPerSkein(e.target.value)}
              />
              <Input
                label="Antal nøgler i opskriften"
                type="number"
                min="0.5"
                step="0.5"
                placeholder="f.eks. 6"
                value={patternSkeins}
                onChange={(e) => setPatternSkeins(e.target.value)}
              />
              <Input
                label="Opkrævet masketal (masker pr. 10 cm)"
                type="number"
                min="1"
                step="0.5"
                placeholder="f.eks. 20 (valgfrit)"
                value={patternGauge}
                onChange={(e) => setPatternGauge(e.target.value)}
              />
              <Input
                label="Pris pr. nøgle (kr) — valgfrit"
                type="number"
                min="0"
                step="1"
                placeholder="f.eks. 99"
                value={patternPrice}
                onChange={(e) => setPatternPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-charcoal-700 mb-4 uppercase tracking-wide">
              Dit alternativ
            </h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Input
                label="Meter pr. nøgle"
                type="number"
                min="1"
                step="1"
                placeholder="f.eks. 150"
                value={yourMetersPerSkein}
                onChange={(e) => setYourMetersPerSkein(e.target.value)}
              />
              <Input
                label="Dit masketal (masker pr. 10 cm)"
                type="number"
                min="1"
                step="0.5"
                placeholder="f.eks. 22 (valgfrit)"
                value={yourGauge}
                onChange={(e) => setYourGauge(e.target.value)}
              />
              <Input
                label="Pris pr. nøgle (kr) — valgfrit"
                type="number"
                min="0"
                step="1"
                placeholder="f.eks. 45"
                value={yourPrice}
                onChange={(e) => setYourPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isValid && requiredSkeins > 0 && (
          <ResultBox>
            <p className="text-lg font-semibold text-charcoal-900">
              Køb {requiredSkeins} nøgler
            </p>
            {useGauge ? (
              <p className="mt-2 text-charcoal-600">
                Opskriften bruger {Math.round(totalMeters)} meter ved{" "}
                {patternG} masker/10 cm. Dit masketal er {yourG}, så du skal
                bruge ca. {Math.round(adjustedMeters)} meter (vi har justeret for
                forskellen og tilføjet 10 % sikkerhed).
              </p>
            ) : (
              <p className="mt-2 text-charcoal-600">
                Opskriften skal bruge cirka {Math.round(totalMeters)} meter.
                Uden masketal-justering anbefaler vi {requiredSkeins} nøgler med
                10 % sikkerhedsmargin. For bedre præcision: udfyld begge
                masketal-felter.
              </p>
            )}
            {savings != null && savings > 0 && (
              <p className="mt-3 pt-3 border-t border-sage-200 text-charcoal-700 font-medium">
                Du sparer cirka {savings} kr ved at bruge dit alternativ.
              </p>
            )}
          </ResultBox>
        )}
      </div>
    </Card>
  );
}
