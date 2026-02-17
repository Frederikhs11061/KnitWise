/**
 * Pricing utilities including VAT (moms) calculation
 * Danish VAT rate: 25%
 */

const VAT_RATE = 0.25; // 25% Danish VAT

/**
 * Calculate VAT amount from price excluding VAT
 */
export function calculateVAT(priceExcludingVAT: number): number {
  return priceExcludingVAT * VAT_RATE;
}

/**
 * Calculate price including VAT from price excluding VAT
 */
export function calculatePriceIncludingVAT(priceExcludingVAT: number): number {
  return priceExcludingVAT + calculateVAT(priceExcludingVAT);
}

/**
 * Calculate price excluding VAT from price including VAT
 */
export function calculatePriceExcludingVAT(priceIncludingVAT: number): number {
  return priceIncludingVAT / (1 + VAT_RATE);
}

/**
 * Format price breakdown for display
 */
export interface PriceBreakdown {
  subtotal: number;
  vat: number;
  total: number;
}

export function calculatePriceBreakdown(
  items: Array<{ price: number; quantity: number }>
): PriceBreakdown {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = calculateVAT(subtotal);
  const total = subtotal + vat;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace(".", ",")} kr`;
}
