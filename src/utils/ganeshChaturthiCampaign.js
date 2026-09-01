import { isOfferActive, isOfferWithinListingWindow } from "./offerDates";

/**
 * Ganesh Chaturthi festival window (IST, inclusive).
 */
export const GANESH_CHATURTHI_START = "2026-09-03";
export const GANESH_CHATURTHI_END = "2026-09-15";

export const GANESH_CHATURTHI_PERCENT_OFF = 25;
export const GANESH_CHATURTHI_CREDIT_PERCENT = 10;
export const GANESH_CHATURTHI_MIN_ORDER_INR = 500;
export const GANESH_CHATURTHI_MAX_ORDERS = 500;

export function isGaneshChaturthiActive(now = new Date()) {
  return isOfferActive(GANESH_CHATURTHI_START, GANESH_CHATURTHI_END, now);
}

export function isGaneshChaturthiListed(now = new Date()) {
  return isOfferWithinListingWindow(GANESH_CHATURTHI_START, GANESH_CHATURTHI_END, now);
}
