import { isOfferActive } from "./offerDates";

/** Freedom & Independence homepage Tiranga theme (hero through process). */
export const HOME_TIRANGA_START = "2026-08-06";
export const HOME_TIRANGA_END = "2026-08-30";

export function isHomeTirangaThemeActive(now = new Date()) {
  return isOfferActive(HOME_TIRANGA_START, HOME_TIRANGA_END, now);
}
