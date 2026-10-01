import { getCleenzoApiBase, getPublicApiBase } from "./apiBase";
import { websiteOrganizationSlug } from "./booking";

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

export async function checkPincodeServiceability(pincode, extras = {}) {
  const pin = pincode.replace(/\D/g, "").slice(0, 6);
  const params = new URLSearchParams({ pincode: pin });
  if (extras.city) params.set("city", extras.city);
  if (extras.addressLine) params.set("address", extras.addressLine);
  const slug = extras.organizationSlug || websiteOrganizationSlug();
  if (slug) params.set("organizationSlug", slug);
  const apiBase = getPublicApiBase();
  if (!apiBase) return null;
  const res = await fetch(`${apiBase}/public/website/serviceability?${params}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export async function previewCampaignPricing(lineItems) {
  return websitePost("/public/website/campaign/preview", { lineItems });
}

export { getCleenzoApiBase as WEBSITE_API_BASE } from "./apiBase";
