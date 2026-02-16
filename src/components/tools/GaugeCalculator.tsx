"use client";

/**
 * Gauge Adjustment Calculator
 * When your gauge doesn't match the pattern, this tells you how many stitches to cast on.
 * Formula: corrected = (yourGauge / patternGauge) * patternStitches
 */

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ResultBox from "@/components/ui/ResultBox";

export default function GaugeCalculator() {
  const [patternGauge, setPatternGauge] = useState("");
  const [yourGauge, setYourGauge] = useState("");
  const [patternStitches, setPatternStitches] = useState("");

  const patternGaugeNum = parseFloat(patternGauge);
  const yourGaugeNum = parseFloat(yourGauge);
  const patternStitchesNum = parseInt(patternStitches, 10);

  const isValid =
    patternGaugeNum > 0 &&
    yourGaugeNum > 0 &&
    patternStitchesNum > 0 &&
    Number.isInteger(patternStitchesNum);

  const corrected = isValid
    ? Math.round((yourGaugeNum / patternGaugeNum) * patternStitchesNum)
    : null;

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <p className="text-sm text-charcoal-600 mb-6">
          Har dit prøve-udtag flere eller færre masker pr. 10 cm end opskriften?
          Brug dette til at finde det rigtige antal masker at slå op.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <Input
            label="Opskriftens masketal (masker pr. 10 cm)"
            type="number"
            min="0.1"
            step="0.5"
            placeholder="f.eks. 22"
            value={patternGauge}
            onChange={(e) => setPatternGauge(e.target.value)}
          />
          <Input
            label="Dit masketal (masker pr. 10 cm)"
            type="number"
            min="0.1"
            step="0.5"
            placeholder="f.eks. 20"
            value={yourGauge}
            onChange={(e) => setYourGauge(e.target.value)}
          />
          <Input
            label="Opskriftens antal masker"
            type="number"
            min="1"
            step="1"
            placeholder="f.eks. 100"
            value={patternStitches}
            onChange={(e) => setPatternStitches(e.target.value)}
          />
        </div>
        {corrected !== null && (
          <ResultBox>
            <p className="text-lg font-semibold text-charcoal-900">
              Slå {corrected} masker op
            </p>
            <p className="mt-2 text-charcoal-600">
              For at få samme bredde, skal du slå {corrected} masker op i stedet
              for {patternStitchesNum}.
            </p>
          </ResultBox>
        )}
      </div>
    </Card>
  );
}
