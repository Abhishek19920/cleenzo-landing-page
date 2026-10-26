/** Cleenzo Raj Nagar Extension opened in July 2026 (Asia/Kolkata). */
const OPENING_YEAR = 2026;
const OPENING_MONTH = 7;

function istYearMonth(now) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  return { year, month };
}

/** Inclusive month count from July 2026. October 2026 is month 4. */
export function monthsSinceOpening(now = new Date()) {
  const { year, month } = istYearMonth(now);
  const count = (year - OPENING_YEAR) * 12 + (month - OPENING_MONTH) + 1;
  return Math.max(1, count);
}

export function milestonePeriodCopy(now = new Date()) {
  const count = monthsSinceOpening(now);
  const label = count === 1 ? "Month" : "Months";
  const lower = count === 1 ? "month" : "months";
  return {
    periodLabel: count === 1 ? "Our First Month" : `Our First ${count} ${label}`,
    subline: `${count} ${lower} of cleaning, caring & serving our community.`,
    tagline: `${count} ${label} of Cleenzo. And We’re Just Getting Started.`,
  };
}
