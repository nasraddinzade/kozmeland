export type RawProduct = {
  slug: string;
  brand: string;
  name: string;
  /** null when the volume is unknown */
  volume: string | null;
  /** Discount price in AZN exactly as printed in the post, e.g. "15.40" */
  price: string;
  /** Crossed-out price in AZN, null when the post had none */
  oldPrice: string | null;
  category: string;
  /** Product type in Azerbaijani — the only description we have */
  type: string;
  /** Date of the Instagram post the price comes from (YYYY-MM-DD or YYYY-MM) */
  priceAsOf: string;
  note: string | null;
  /** No exact real photo found — product is kept in data but not shown */
  noImage: boolean;
};
