import { isOfferActive, OFFERS_TIMEZONE } from "./offerDates";

/**
 * New-customer & referral offer program (IST, inclusive).
 *
 * Must stay in sync with FESTIVE_FIRST3_2026 in the backend campaign config.
 */
export const OFFER_PROGRAM_START = "2026-09-01";
export const LIFETIME_OFFER_END = "2099-12-31";

/** @deprecated use OFFER_PROGRAM_START */
export const FESTIVE_SALE_START = OFFER_PROGRAM_START;

/** @deprecated use LIFETIME_OFFER_END */
export const FESTIVE_SALE_END = LIFETIME_OFFER_END;

/** Discounted orders a new customer may place under the program. */
export const FESTIVE_FIRST3_MAX_ORDERS = 3;

/** Percent off (immediate) for a new customer's first three orders. */
export const FESTIVE_FIRST3_PERCENT_OFF = 30;

/** ₹ ceiling on the first-3 30% discount. */
export const FESTIVE_FIRST3_MAX_DISCOUNT_INR = 700;

/**
 * Alternate the customer can choose on those first 3 orders, and the standing
 * offer after 3 completed orders. No ₹ cap.
 */
export const REPEAT_OFFER_PERCENT_OFF = 20;
export const REPEAT_OFFER_CREDIT_PERCENT = 10;

/** @deprecated The 30% path does not pay credit. Kept so older imports still resolve. */
export const FESTIVE_FIRST3_CREDIT_PERCENT = 0;

/** Minimum eligible order subtotal (₹) for the first-3 discount. */
export const FESTIVE_FIRST3_MIN_ORDER_INR = 500;

/** Cleenzo Credit paid to the referrer once their invitee's first order lands. */
export const REFERRAL_REWARD_INR = 100;

export function isFestiveSaleActive(now = new Date()) {
  return isOfferActive(OFFER_PROGRAM_START, LIFETIME_OFFER_END, now);
}

export { OFFERS_TIMEZONE };
