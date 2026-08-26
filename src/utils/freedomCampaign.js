import { isOfferActive, OFFERS_TIMEZONE } from "./offerDates";
import { isLocalFullCampaignUi } from "./campaignUiVisibility";

/** Freedom & Rakhi Sale — discount window (IST, inclusive). */
export const FREEDOM_SALE_START = "2026-08-09";
export const FREEDOM_SALE_END = "2026-08-30";

/** Independence Uniform special (IST, inclusive). */
export const UNIFORM_SALE_START = "2026-08-13";
export const UNIFORM_SALE_END = "2026-08-15";

/** Homepage Tiranga styling follows the Freedom sale window (not before 9 Aug). */
export const HOME_TIRANGA_START = FREEDOM_SALE_START;
export const HOME_TIRANGA_END = FREEDOM_SALE_END;

export function isFreedomSaleActive(now = new Date()) {
  if (isLocalFullCampaignUi()) return true;
  return isOfferActive(FREEDOM_SALE_START, FREEDOM_SALE_END, now);
}

export function isUniformSpecialActive(now = new Date()) {
  return isOfferActive(UNIFORM_SALE_START, UNIFORM_SALE_END, now);
}

export function isHomeTirangaThemeActive(now = new Date()) {
  return isFreedomSaleActive(now);
}

/** @typedef {'normal' | 'freedom' | 'freedom_uniform'} HomepageCampaignPhase */

/** @returns {HomepageCampaignPhase} */
export function getHomepageCampaignPhase(now = new Date()) {
  if (!isFreedomSaleActive(now)) return "normal";
  if (isUniformSpecialActive(now)) return "freedom_uniform";
  return "freedom";
}

export { OFFERS_TIMEZONE };
