import { isLocalFullCampaignUi } from "./campaignUiVisibility";

const OFFERS_TIMEZONE = "Asia/Kolkata";

/** ISO date string (YYYY-MM-DD) for "today" in India business timezone. */
export function getKolkataDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: OFFERS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Inclusive start/end (YYYY-MM-DD) in Asia/Kolkata — ignores dev preview (carousel parity with prod). */
export function isOfferActiveByCalendar(startDate, endDate, now = new Date()) {
  if (!startDate && !endDate) return true;
  const today = getKolkataDateString(now);
  if (startDate && today < startDate) return false;
  if (endDate && today > endDate) return false;
  return true;
}

/** Inclusive start/end (YYYY-MM-DD) in Asia/Kolkata. */
export function isOfferActive(startDate, endDate, now = new Date()) {
  if (isLocalFullCampaignUi()) return true;
  if (!startDate && !endDate) return true;
  const today = getKolkataDateString(now);
  if (startDate && today < startDate) return false;
  if (endDate && today > endDate) return false;
  return true;
}

export { OFFERS_TIMEZONE };
