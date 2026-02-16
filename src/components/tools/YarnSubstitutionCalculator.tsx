"use client";

/**
 * Yarn Substitution Calculator
 * Pattern uses one yarn, you want to use another. How many skeins?
 * totalMeters = patternLength * patternSkeins
 * required = totalMeters / newLength, rounded up + 10% safety
 */

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ResultBox from "@/components/ui/ResultBox";

export default function YarnSubstitutionCalculator() {
  const [patternLength, setPatternLength] = useState("");
  const [patternSkeins, setPatternSkeins] = useState("");
  const [newLength, setNewLength] = useState("");

  const patternLengthNum = parseFloat(patternLength);
  const patternSkeinsNum = parseFloat(patternSkeins);
  const newLengthNum = parseFloat(newLength);

  const isValid =
    patternLengthNum > 0 &&
    patternSkeinsNum > 0 &&
    newLengthNum > 0;

  let required = 0;
  let totalMeters = 0;
  if (isValid) {
    totalMeters = patternLengthNum * patternSkeinsNum;
    const baseSkeins = totalMeters / newLengthNum;
    required = Math.ceil(baseSkeins * 1.1); // 10% safety margin
  }

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <p className="text-sm text-charcoal-600 mb-6">
          Opskriften angiver et garn i meter pr. nøgle. Du vil bruge noget andet.
          Vi tilføjer automatisk 10 % sikkerhedsmargin.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <Input
            label="Opskriftens garnlængde pr. nøgle (meter)"
            type="number"
            min="1"
            step="1"
            placeholder="f.eks. 200"
            value={patternLength}
            onChange={(e) => setPatternLength(e.target.value)}
          />
          <Input
            label="Antal nøgler i opskriften"
            type="number"
            min="0.5"
            step="0.5"
            placeholder="f.eks. 5"
            value={patternSkeins}
            onChange={(e) => setPatternSkeins(e.target.value)}
          />
          <Input
            label="Dit garns længde pr. nøgle (meter)"
            type="number"
            min="1"
            step="1"
            placeholder="f.eks. 150"
            value={newLength}
            onChange={(e) => setNewLength(e.target.value)}
          />
        </div>
        {isValid && required > 0 && (
          <ResultBox>
            <p className="text-lg font-semibold text-charcoal-900">
              Køb {required} nøgler
            </p>
            <p className="mt-2 text-charcoal-600">
              Opskriften skal bruge cirka {Math.round(totalMeters)} meter. Med
              dit garn på {newLengthNum} m pr. nøgle, skal du bruge {required}{" "}
              nøgler (vi har tilføjet 10 % ekstra til sikkerhed).
            </p>
          </ResultBox>
        )}
      </div>
    </Card>
  );
}
