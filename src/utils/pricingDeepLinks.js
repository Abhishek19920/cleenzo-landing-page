/**
 * Stable same-page deep links for the home pricing section.
 * Hash IDs are explicit static strings (never generated / indexed).
 */

/** @typedef {{ scrollId: string, service?: string, category?: string }} PricingDeepLink */

/** Hash fragment (without #) → pricing UI state + scroll target. */
export const PRICING_DEEP_LINKS = Object.freeze({
  pricing: Object.freeze({ scrollId: "pricing" }),
  mens: Object.freeze({
    scrollId: "mens",
    service: "dry-clean",
    category: "men",
  }),
  womens: Object.freeze({
    scrollId: "womens",
    service: "dry-clean",
    category: "women",
  }),
  household: Object.freeze({
    scrollId: "household",
    service: "dry-clean",
    category: "household",
  }),
  "toy-cleaning": Object.freeze({
    scrollId: "toy-cleaning",
    service: "toy-cleaning",
  }),
});

export const PRICING_DEEP_LINK_IDS = Object.freeze(
  Object.keys(PRICING_DEEP_LINKS),
);

/**
 * @param {string | null | undefined} hash
 * @returns {PricingDeepLink | null}
 */
export function resolvePricingDeepLink(hash) {
  if (!hash || typeof hash !== "string") return null;
  const id = hash.replace(/^#/, "").trim().toLowerCase();
  if (!id) return null;
  return PRICING_DEEP_LINKS[id] ?? null;
}

/**
 * Scroll to a pricing deep-link target after it exists in the DOM.
 * @param {string} scrollId
 * @param {{ behavior?: ScrollBehavior }} [options]
 * @returns {boolean}
 */
export function scrollToPricingDeepLinkId(scrollId, options = {}) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(scrollId);
  if (!el) return false;
  el.scrollIntoView({
    behavior: options.behavior ?? "auto",
    block: "start",
  });
  return true;
}
