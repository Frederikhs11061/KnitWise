"use client";

/**
 * Yarn Usage Estimator
 * Estimates meters needed for a garment by type, size, and yarn weight.
 * Uses predefined ranges from lib/yarnData.ts
 */

import { useState } from "react";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import ResultBox from "@/components/ui/ResultBox";
import {
  YARN_USAGE_ESTIMATES,
  type GarmentType,
  type Size,
  type YarnWeight,
} from "@/lib/yarnData";

const GARMENT_OPTIONS: { value: GarmentType; label: string }[] = [
  { value: "sweater", label: "Striktrøje" },
  { value: "cardigan", label: "Cardigan" },
  { value: "hat", label: "Hat" },
  { value: "scarf", label: "Halstørklæde" },
  { value: "mittens", label: "Vanter" },
  { value: "socks", label: "Strømper" },
];

const SIZE_OPTIONS: { value: Size; label: string }[] = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];

const YARN_OPTIONS: { value: YarnWeight; label: string }[] = [
  { value: "DK", label: "DK" },
  { value: "Aran", label: "Aran" },
  { value: "Bulky", label: "Bulky" },
  { value: "Fingering", label: "Fingering" },
  { value: "Worsted", label: "Worsted" },
];

export default function YarnUsageEstimator() {
  const [garment, setGarment] = useState<GarmentType>("sweater");
  const [size, setSize] = useState<Size>("M");
  const [yarnWeight, setYarnWeight] = useState<YarnWeight>("DK");

  const estimate = YARN_USAGE_ESTIMATES[garment][size][yarnWeight];

  const garmentLabel =
    GARMENT_OPTIONS.find((o) => o.value === garment)?.label ?? garment;

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <p className="text-sm text-charcoal-600 mb-6">
          Omtrentligt garnforbrug baseret på typiske opskrifter. Brug som
          udgangspunkt — din spænding og stil kan afvige.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <Select
            label="Plagetype"
            options={GARMENT_OPTIONS}
            value={garment}
            onChange={(e) => setGarment(e.target.value as GarmentType)}
          />
          <Select
            label="Størrelse"
            options={SIZE_OPTIONS}
            value={size}
            onChange={(e) => setSize(e.target.value as Size)}
          />
          <Select
            label="Garnvægt"
            options={YARN_OPTIONS}
            value={yarnWeight}
            onChange={(e) => setYarnWeight(e.target.value as YarnWeight)}
          />
        </div>
        <ResultBox>
          <p className="text-lg font-semibold text-charcoal-900">
            Cirka {estimate.typical}–{estimate.max} meter
          </p>
          <p className="mt-2 text-charcoal-600">
            Til en {size} {garmentLabel} i {yarnWeight}-vægt, planlæg cirka{" "}
            {estimate.min}–{estimate.max} meter. Et typisk projekt bruger omkring{" "}
            {estimate.typical} meter.
          </p>
        </ResultBox>
      </div>
    </Card>
  );
}
