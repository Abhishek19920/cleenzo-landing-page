const OFFERS_TIMEZONE = "Asia/Kolkata";

function isDevOffersPreview() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_OFFERS_PREVIEW === "true"
  );
}

/** ISO date string (YYYY-MM-DD) for "today" in India business timezone. */
export function getKolkataDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: OFFERS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Inclusive start/end (YYYY-MM-DD) in Asia/Kolkata. */
export function isOfferActive(startDate, endDate, now = new Date()) {
  if (!startDate && !endDate) return true;
  const today = getKolkataDateString(now);
  const preview = isDevOffersPreview();
  if (startDate && today < startDate && !preview) return false;
  if (endDate && today > endDate) return false;
  return true;
}

export { OFFERS_TIMEZONE };
