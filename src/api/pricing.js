import { getCleenzoApiBase } from "./apiBase";

export { getCleenzoApiBase, PRODUCTION_API_BASE } from "./apiBase";

export async function fetchWebsitePricing() {
  const apiBase = getCleenzoApiBase();
  if (!apiBase) return null;

  const url = `${apiBase}/public/website/pricing`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Pricing API ${res.status}`);
  }
  return res.json();
}
