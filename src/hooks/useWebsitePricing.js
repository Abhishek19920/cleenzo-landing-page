import { GHAZIABAD_PRICING } from "../data/ghaziabadPricing";

/**
 * Public price list baked into the landing page from the ERP catalog export.
 * The page does not request the internal catalog over the network.
 * Refresh with: cd cleenzo-backend && npm run prisma:export-website-pricing
 */
export function useWebsitePricing() {
  return { pricing: GHAZIABAD_PRICING, loading: false, source: "bundled" };
}
