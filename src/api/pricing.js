const API_BASE = (process.env.REACT_APP_CLEENZO_API_URL || "").replace(/\/$/, "");

export async function fetchWebsitePricing() {
  if (!API_BASE) return null;

  const url = `${API_BASE}/public/website/pricing`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Pricing API ${res.status}`);
  }
  return res.json();
}
