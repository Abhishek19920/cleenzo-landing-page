import { isOfferActive, OFFERS_TIMEZONE } from "./offerDates";

/**
 * New-customer & referral offer program (IST, inclusive).
 *
 * Must stay in sync with REPEAT_CREDIT_2026 / welcome eligibility in the backend.
 * Live offer: 10% off + 10% wallet credit (Welcome 30% retired).
 */
export const OFFER_PROGRAM_START = "2026-09-01";
export const LIFETIME_OFFER_END = "2099-12-31";

/** @deprecated use OFFER_PROGRAM_START */
export const FESTIVE_SALE_START = OFFER_PROGRAM_START;

/** @deprecated use LIFETIME_OFFER_END */
export const FESTIVE_SALE_END = LIFETIME_OFFER_END;

/** Discounted orders a new customer may place under the program. */
export const FESTIVE_FIRST3_MAX_ORDERS = 3;

/** Instant percent off for new-customer first-3 and later welcome bills. */
export const FESTIVE_FIRST3_PERCENT_OFF = 10;

/**
 * No ₹ ceiling on the live 10% path. Kept as null so UI can hide "max ₹…" copy.
 * @deprecated Welcome 30% ₹700 cap is retired.
 */
export const FESTIVE_FIRST3_MAX_DISCOUNT_INR = null;

/** Cleenzo Credit % to the spendable wallet after the order is completed. */
export const FESTIVE_FIRST3_CREDIT_PERCENT = 10;

/**
 * Same rates after 3 completed orders (and the only welcome path now).
 */
export const REPEAT_OFFER_PERCENT_OFF = 10;
export const REPEAT_OFFER_CREDIT_PERCENT = 10;

/** Minimum eligible order subtotal (₹) for the welcome discount. */
export const FESTIVE_FIRST3_MIN_ORDER_INR = 500;

/** Cleenzo Credit paid to the referrer once their invitee's first order lands. */
export const REFERRAL_REWARD_INR = 100;

export function isFestiveSaleActive(now = new Date()) {
  return isOfferActive(OFFER_PROGRAM_START, LIFETIME_OFFER_END, now);
}

export { OFFERS_TIMEZONE };
