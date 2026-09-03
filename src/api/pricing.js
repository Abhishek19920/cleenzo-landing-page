import { getCleenzoApiBase } from "./apiBase";

export { getCleenzoApiBase, PRODUCTION_API_BASE } from "./apiBase";

/** Production Cleenzo org — ERP catalog source of truth for the landing price table. */
export const WEBSITE_ORG_SLUG =
  (process.env.REACT_APP_CLEENZO_ORG_SLUG || "shine-works").trim();

export async function fetchWebsitePricing(organizationSlug = WEBSITE_ORG_SLUG) {
  const apiBase = getCleenzoApiBase();
  if (!apiBase) return null;

  const qs = organizationSlug
    ? `?organizationSlug=${encodeURIComponent(organizationSlug)}`
    : "";
  const url = `${apiBase}/public/website/pricing${qs}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Pricing API ${res.status}`);
  }
  return res.json();
}
