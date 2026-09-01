import { OFFER_PROGRAM_START, LIFETIME_OFFER_END } from "./festiveCampaign";

/**
 * Monthly loyalty program — keep in sync with monthly-loyalty.config.ts (backend).
 */
export const MONTHLY_LOYALTY_QUALIFYING_START = OFFER_PROGRAM_START;

/** Successful orders required in a calendar month. */
export const MONTHLY_LOYALTY_MIN_ORDERS = 4;

/** Gross pre-discount order value (₹) required in a calendar month. */
export const MONTHLY_LOYALTY_MIN_GROSS_INR = 3000;

/** Flat discount during the unlocked benefit month. */
export const MONTHLY_LOYALTY_PERCENT_OFF = 20;

/** Cleenzo Credit back on post-discount eligible amount during benefit month. */
export const MONTHLY_LOYALTY_CREDIT_PERCENT = 10;

export const MONTHLY_LOYALTY_OFFER_END = LIFETIME_OFFER_END;
