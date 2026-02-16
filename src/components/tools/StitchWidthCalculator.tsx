"use client";

/**
 * Stitch Width Calculator
 * Given stitch count and gauge, calculates width in cm.
 * Formula: width = (stitchCount / gauge) * 10
 */

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ResultBox from "@/components/ui/ResultBox";

export default function StitchWidthCalculator() {
  const [stitchCount, setStitchCount] = useState("");
  const [gauge, setGauge] = useState("");

  const stitchCountNum = parseInt(stitchCount, 10);
  const gaugeNum = parseFloat(gauge);

  const isValid =
    stitchCountNum > 0 &&
    Number.isInteger(stitchCountNum) &&
    gaugeNum > 0;

  const width = isValid ? (stitchCountNum / gaugeNum) * 10 : null;

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <p className="text-sm text-charcoal-600 mb-6">
          Du har et antal masker og kender dit masketal. Hvor bredt bliver det?
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Antal masker"
            type="number"
            min="1"
            step="1"
            placeholder="f.eks. 80"
            value={stitchCount}
            onChange={(e) => setStitchCount(e.target.value)}
          />
          <Input
            label="Masketal (masker pr. 10 cm)"
            type="number"
            min="0.1"
            step="0.5"
            placeholder="f.eks. 22"
            value={gauge}
            onChange={(e) => setGauge(e.target.value)}
          />
        </div>
        {width !== null && (
          <ResultBox>
            <p className="text-lg font-semibold text-charcoal-900">
              Bredde: {width.toFixed(1)} cm
            </p>
            <p className="mt-2 text-charcoal-600">
              Med {stitchCountNum} masker ved {gaugeNum} masker pr. 10 cm bliver
              din bredde {width.toFixed(1)} cm.
            </p>
          </ResultBox>
        )}
      </div>
    </Card>
  );
}
