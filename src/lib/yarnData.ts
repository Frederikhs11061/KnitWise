/**
 * Yarn usage estimates (meters) by garment type, size, and yarn weight.
 * Based on typical knitting patterns and real-world usage.
 * Used by the Yarn Usage Estimator tool.
 */

export type GarmentType = "sweater" | "cardigan" | "hat" | "scarf" | "mittens" | "socks";

export type Size = "XS" | "S" | "M" | "L" | "XL";

export type YarnWeight = "DK" | "Aran" | "Bulky" | "Fingering" | "Worsted";

/** Meters per 50g for standard yarn weights (approximate) */
export const YARN_METERS_PER_50G: Record<YarnWeight, number> = {
  Fingering: 200,
  DK: 125,
  Worsted: 100,
  Aran: 85,
  Bulky: 65,
};

export interface YarnUsageRange {
  min: number;
  max: number;
  /** Typical/average for the size */
  typical: number;
}

/** Garment × Size × YarnWeight -> estimated meters */
export const YARN_USAGE_ESTIMATES: Record<
  GarmentType,
  Record<Size | "one-size", Record<YarnWeight, YarnUsageRange>>
> = {
  sweater: {
    XS: {
      Fingering: { min: 800, max: 1000, typical: 900 },
      DK: { min: 900, max: 1100, typical: 1000 },
      Worsted: { min: 1000, max: 1200, typical: 1100 },
      Aran: { min: 1100, max: 1300, typical: 1200 },
      Bulky: { min: 1200, max: 1500, typical: 1350 },
    },
    S: {
      Fingering: { min: 1000, max: 1200, typical: 1100 },
      DK: { min: 1100, max: 1300, typical: 1200 },
      Worsted: { min: 1200, max: 1500, typical: 1350 },
      Aran: { min: 1300, max: 1600, typical: 1450 },
      Bulky: { min: 1400, max: 1800, typical: 1600 },
    },
    M: {
      Fingering: { min: 1200, max: 1400, typical: 1300 },
      DK: { min: 1300, max: 1600, typical: 1450 },
      Worsted: { min: 1500, max: 1800, typical: 1650 },
      Aran: { min: 1600, max: 2000, typical: 1800 },
      Bulky: { min: 1700, max: 2200, typical: 1950 },
    },
    L: {
      Fingering: { min: 1400, max: 1700, typical: 1550 },
      DK: { min: 1600, max: 1900, typical: 1750 },
      Worsted: { min: 1800, max: 2200, typical: 2000 },
      Aran: { min: 1900, max: 2400, typical: 2150 },
      Bulky: { min: 2000, max: 2600, typical: 2300 },
    },
    XL: {
      Fingering: { min: 1600, max: 2000, typical: 1800 },
      DK: { min: 1900, max: 2300, typical: 2100 },
      Worsted: { min: 2100, max: 2600, typical: 2350 },
      Aran: { min: 2200, max: 2800, typical: 2500 },
      Bulky: { min: 2400, max: 3000, typical: 2700 },
    },
    "one-size": {
      Fingering: { min: 1200, max: 1400, typical: 1300 },
      DK: { min: 1300, max: 1600, typical: 1450 },
      Worsted: { min: 1500, max: 1800, typical: 1650 },
      Aran: { min: 1600, max: 2000, typical: 1800 },
      Bulky: { min: 1700, max: 2200, typical: 1950 },
    },
  },
  cardigan: {
    XS: {
      Fingering: { min: 950, max: 1200, typical: 1075 },
      DK: { min: 1100, max: 1350, typical: 1225 },
      Worsted: { min: 1200, max: 1500, typical: 1350 },
      Aran: { min: 1300, max: 1600, typical: 1450 },
      Bulky: { min: 1500, max: 1800, typical: 1650 },
    },
    S: {
      Fingering: { min: 1200, max: 1450, typical: 1325 },
      DK: { min: 1350, max: 1650, typical: 1500 },
      Worsted: { min: 1500, max: 1800, typical: 1650 },
      Aran: { min: 1600, max: 2000, typical: 1800 },
      Bulky: { min: 1700, max: 2200, typical: 1950 },
    },
    M: {
      Fingering: { min: 1450, max: 1750, typical: 1600 },
      DK: { min: 1650, max: 2000, typical: 1825 },
      Worsted: { min: 1850, max: 2200, typical: 2025 },
      Aran: { min: 1950, max: 2400, typical: 2175 },
      Bulky: { min: 2100, max: 2700, typical: 2400 },
    },
    L: {
      Fingering: { min: 1700, max: 2100, typical: 1900 },
      DK: { min: 1950, max: 2350, typical: 2150 },
      Worsted: { min: 2200, max: 2700, typical: 2450 },
      Aran: { min: 2350, max: 2900, typical: 2625 },
      Bulky: { min: 2500, max: 3200, typical: 2850 },
    },
    XL: {
      Fingering: { min: 2000, max: 2450, typical: 2225 },
      DK: { min: 2300, max: 2800, typical: 2550 },
      Worsted: { min: 2600, max: 3200, typical: 2900 },
      Aran: { min: 2750, max: 3400, typical: 3075 },
      Bulky: { min: 2950, max: 3700, typical: 3325 },
    },
    "one-size": {
      Fingering: { min: 1450, max: 1750, typical: 1600 },
      DK: { min: 1650, max: 2000, typical: 1825 },
      Worsted: { min: 1850, max: 2200, typical: 2025 },
      Aran: { min: 1950, max: 2400, typical: 2175 },
      Bulky: { min: 2100, max: 2700, typical: 2400 },
    },
  },
  hat: {
    XS: {
      Fingering: { min: 80, max: 100, typical: 90 },
      DK: { min: 100, max: 130, typical: 115 },
      Worsted: { min: 110, max: 140, typical: 125 },
      Aran: { min: 120, max: 155, typical: 137 },
      Bulky: { min: 140, max: 180, typical: 160 },
    },
    S: {
      Fingering: { min: 100, max: 120, typical: 110 },
      DK: { min: 120, max: 150, typical: 135 },
      Worsted: { min: 130, max: 165, typical: 147 },
      Aran: { min: 140, max: 180, typical: 160 },
      Bulky: { min: 165, max: 210, typical: 187 },
    },
    M: {
      Fingering: { min: 120, max: 150, typical: 135 },
      DK: { min: 140, max: 180, typical: 160 },
      Worsted: { min: 155, max: 195, typical: 175 },
      Aran: { min: 170, max: 215, typical: 192 },
      Bulky: { min: 195, max: 250, typical: 222 },
    },
    L: {
      Fingering: { min: 140, max: 180, typical: 160 },
      DK: { min: 165, max: 210, typical: 187 },
      Worsted: { min: 180, max: 230, typical: 205 },
      Aran: { min: 200, max: 255, typical: 227 },
      Bulky: { min: 230, max: 290, typical: 260 },
    },
    XL: {
      Fingering: { min: 165, max: 210, typical: 187 },
      DK: { min: 195, max: 250, typical: 222 },
      Worsted: { min: 215, max: 270, typical: 242 },
      Aran: { min: 235, max: 300, typical: 267 },
      Bulky: { min: 270, max: 340, typical: 305 },
    },
    "one-size": {
      Fingering: { min: 120, max: 150, typical: 135 },
      DK: { min: 140, max: 180, typical: 160 },
      Worsted: { min: 155, max: 195, typical: 175 },
      Aran: { min: 170, max: 215, typical: 192 },
      Bulky: { min: 195, max: 250, typical: 222 },
    },
  },
  scarf: {
    XS: {
      Fingering: { min: 200, max: 260, typical: 230 },
      DK: { min: 250, max: 320, typical: 285 },
      Worsted: { min: 280, max: 360, typical: 320 },
      Aran: { min: 320, max: 400, typical: 360 },
      Bulky: { min: 360, max: 460, typical: 410 },
    },
    S: {
      Fingering: { min: 250, max: 320, typical: 285 },
      DK: { min: 310, max: 400, typical: 355 },
      Worsted: { min: 350, max: 450, typical: 400 },
      Aran: { min: 400, max: 500, typical: 450 },
      Bulky: { min: 450, max: 580, typical: 515 },
    },
    M: {
      Fingering: { min: 300, max: 380, typical: 340 },
      DK: { min: 370, max: 480, typical: 425 },
      Worsted: { min: 420, max: 540, typical: 480 },
      Aran: { min: 480, max: 600, typical: 540 },
      Bulky: { min: 540, max: 700, typical: 620 },
    },
    L: {
      Fingering: { min: 350, max: 450, typical: 400 },
      DK: { min: 440, max: 560, typical: 500 },
      Worsted: { min: 500, max: 640, typical: 570 },
      Aran: { min: 560, max: 720, typical: 640 },
      Bulky: { min: 640, max: 820, typical: 730 },
    },
    XL: {
      Fingering: { min: 400, max: 500, typical: 450 },
      DK: { min: 500, max: 640, typical: 570 },
      Worsted: { min: 570, max: 730, typical: 650 },
      Aran: { min: 640, max: 820, typical: 730 },
      Bulky: { min: 730, max: 930, typical: 830 },
    },
    "one-size": {
      Fingering: { min: 300, max: 380, typical: 340 },
      DK: { min: 370, max: 480, typical: 425 },
      Worsted: { min: 420, max: 540, typical: 480 },
      Aran: { min: 480, max: 600, typical: 540 },
      Bulky: { min: 540, max: 700, typical: 620 },
    },
  },
  mittens: {
    XS: {
      Fingering: { min: 80, max: 100, typical: 90 },
      DK: { min: 100, max: 130, typical: 115 },
      Worsted: { min: 110, max: 140, typical: 125 },
      Aran: { min: 120, max: 155, typical: 137 },
      Bulky: { min: 140, max: 180, typical: 160 },
    },
    S: {
      Fingering: { min: 100, max: 130, typical: 115 },
      DK: { min: 125, max: 160, typical: 142 },
      Worsted: { min: 140, max: 180, typical: 160 },
      Aran: { min: 155, max: 200, typical: 177 },
      Bulky: { min: 180, max: 230, typical: 205 },
    },
    M: {
      Fingering: { min: 120, max: 155, typical: 137 },
      DK: { min: 150, max: 190, typical: 170 },
      Worsted: { min: 170, max: 215, typical: 192 },
      Aran: { min: 185, max: 240, typical: 212 },
      Bulky: { min: 215, max: 275, typical: 245 },
    },
    L: {
      Fingering: { min: 140, max: 180, typical: 160 },
      DK: { min: 175, max: 225, typical: 200 },
      Worsted: { min: 200, max: 255, typical: 227 },
      Aran: { min: 220, max: 280, typical: 250 },
      Bulky: { min: 255, max: 325, typical: 290 },
    },
    XL: {
      Fingering: { min: 165, max: 210, typical: 187 },
      DK: { min: 205, max: 265, typical: 235 },
      Worsted: { min: 235, max: 300, typical: 267 },
      Aran: { min: 260, max: 330, typical: 295 },
      Bulky: { min: 300, max: 380, typical: 340 },
    },
    "one-size": {
      Fingering: { min: 120, max: 155, typical: 137 },
      DK: { min: 150, max: 190, typical: 170 },
      Worsted: { min: 170, max: 215, typical: 192 },
      Aran: { min: 185, max: 240, typical: 212 },
      Bulky: { min: 215, max: 275, typical: 245 },
    },
  },
  socks: {
    XS: {
      Fingering: { min: 200, max: 260, typical: 230 },
      DK: { min: 250, max: 320, typical: 285 },
      Worsted: { min: 280, max: 360, typical: 320 },
      Aran: { min: 320, max: 400, typical: 360 },
      Bulky: { min: 360, max: 460, typical: 410 },
    },
    S: {
      Fingering: { min: 250, max: 320, typical: 285 },
      DK: { min: 310, max: 400, typical: 355 },
      Worsted: { min: 350, max: 450, typical: 400 },
      Aran: { min: 400, max: 500, typical: 450 },
      Bulky: { min: 450, max: 580, typical: 515 },
    },
    M: {
      Fingering: { min: 300, max: 380, typical: 340 },
      DK: { min: 370, max: 480, typical: 425 },
      Worsted: { min: 420, max: 540, typical: 480 },
      Aran: { min: 480, max: 600, typical: 540 },
      Bulky: { min: 540, max: 700, typical: 620 },
    },
    L: {
      Fingering: { min: 350, max: 450, typical: 400 },
      DK: { min: 440, max: 560, typical: 500 },
      Worsted: { min: 500, max: 640, typical: 570 },
      Aran: { min: 560, max: 720, typical: 640 },
      Bulky: { min: 640, max: 820, typical: 730 },
    },
    XL: {
      Fingering: { min: 400, max: 500, typical: 450 },
      DK: { min: 500, max: 640, typical: 570 },
      Worsted: { min: 570, max: 730, typical: 650 },
      Aran: { min: 640, max: 820, typical: 730 },
      Bulky: { min: 730, max: 930, typical: 830 },
    },
    "one-size": {
      Fingering: { min: 300, max: 380, typical: 340 },
      DK: { min: 370, max: 480, typical: 425 },
      Worsted: { min: 420, max: 540, typical: 480 },
      Aran: { min: 480, max: 600, typical: 540 },
      Bulky: { min: 540, max: 700, typical: 620 },
    },
  },
};
