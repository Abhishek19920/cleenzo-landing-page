import { isOfferActive, isOfferWithinListingWindow, OFFERS_TIMEZONE } from "./offerDates";

/**
 * Sofa sheet + dry clean promo (IST, inclusive).
 * Creative: /images/offers/sofa-dryclean-promo-oct2026.jpg
 */
export const SOFA_DRYCLEAN_PROMO_START = "2026-10-25";
export const SOFA_DRYCLEAN_PROMO_END = "2026-11-30";

/** Sofa sheet cleaning — list vs campaign price (₹ per sheet). */
export const SOFA_SHEET_LIST_INR = 200;
export const SOFA_SHEET_SALE_INR = 180;
export const SOFA_SHEET_PERCENT_OFF = 10;

/**
 * Dry clean first-3 numbers stay aligned with festiveCampaign.js —
 * re-exported here so the dual creative can reference one place.
 */
export {
  FESTIVE_FIRST3_PERCENT_OFF as DRY_CLEAN_FIRST3_PERCENT_OFF,
  FESTIVE_FIRST3_MAX_DISCOUNT_INR as DRY_CLEAN_FIRST3_MAX_DISCOUNT_INR,
  FESTIVE_FIRST3_MAX_ORDERS as DRY_CLEAN_FIRST3_MAX_ORDERS,
  FESTIVE_FIRST3_MIN_ORDER_INR as DRY_CLEAN_FIRST3_MIN_ORDER_INR,
} from "./festiveCampaign";

export function isSofaDryCleanPromoActive(now = new Date()) {
  return isOfferActive(SOFA_DRYCLEAN_PROMO_START, SOFA_DRYCLEAN_PROMO_END, now);
}

export function isSofaDryCleanPromoListed(now = new Date()) {
  return isOfferWithinListingWindow(
    SOFA_DRYCLEAN_PROMO_START,
    SOFA_DRYCLEAN_PROMO_END,
    now,
  );
}

export { OFFERS_TIMEZONE };
