import { getCleenzoApiBase } from "./apiBase";

async function websiteGet(path) {
  const apiBase = getCleenzoApiBase();
  if (!apiBase) return null;
  const res = await fetch(`${apiBase}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function websitePost(path, body) {
  const apiBase = getCleenzoApiBase();
  if (!apiBase) return null;
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export async function fetchCampaignState() {
  return websiteGet("/public/website/campaign/state");
}

export async function checkPincodeServiceability(pincode) {
  const code = encodeURIComponent(pincode.replace(/\D/g, "").slice(0, 6));
  return websiteGet(`/public/website/serviceability?pincode=${code}`);
}

export async function previewCampaignPricing(lineItems) {
  return websitePost("/public/website/campaign/preview", { lineItems });
}

export { getCleenzoApiBase as WEBSITE_API_BASE } from "./apiBase";
