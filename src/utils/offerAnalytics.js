/**
 * Push offer-related events to GTM dataLayer (see public/index.html).
 * @param {string} eventName
 * @param {{ offer_id?: string, [key: string]: unknown }} payload
 */
export function trackOfferEvent(eventName, payload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
}
