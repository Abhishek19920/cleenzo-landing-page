import { LIFETIME_OFFER_END, OFFER_PROGRAM_START } from "./festiveCampaign";

/**
 * Monthly loyalty program — keep in sync with monthly-loyalty.config.ts (backend).
 */
export const MONTHLY_LOYALTY_QUALIFYING_START = OFFER_PROGRAM_START;

/** Gross pre-discount order value (₹) required in a calendar month. */
export const MONTHLY_LOYALTY_MIN_GROSS_INR = 3000;

/** Flat discount during the unlocked benefit month. */
export const MONTHLY_LOYALTY_PERCENT_OFF = 20;

/** Cleenzo Credit back during the unlocked benefit month. */
export const MONTHLY_LOYALTY_CREDIT_PERCENT = 10;

export const MONTHLY_LOYALTY_OFFER_END = LIFETIME_OFFER_END;
