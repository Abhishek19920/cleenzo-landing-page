const API_BASE = (process.env.REACT_APP_CLEENZO_API_URL || "").replace(/\/$/, "");

async function websiteGet(path) {
  if (!API_BASE) return null;
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function websitePost(path, body) {
  if (!API_BASE) return null;
  const res = await fetch(`${API_BASE}${path}`, {
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

export { API_BASE as WEBSITE_API_BASE };
