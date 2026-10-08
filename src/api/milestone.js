import { getPublicApiBase, PRODUCTION_API_BASE } from "./apiBase";
import { websiteOrganizationSlug } from "./booking";

/** Raj Nagar Extension store org — never use local demo for public milestone stats. */
const LIVE_STORE_SLUG = "shine-works";

function milestoneApiBases() {
  const local = getPublicApiBase();
  const bases = [PRODUCTION_API_BASE];
  if (local && local !== PRODUCTION_API_BASE) bases.push(local);
  return bases.filter(Boolean);
}

async function fetchJson(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

function milestoneSlug() {
  const slug = (websiteOrganizationSlug() || "").trim();
  if (!slug || slug === "cleenzo-demo") return LIVE_STORE_SLUG;
  return slug;
}

export async function fetchStoreMilestone() {
  const params = new URLSearchParams({ organizationSlug: milestoneSlug() });
  const query = `?${params.toString()}`;
  let lastError = null;
  for (const apiBase of milestoneApiBases()) {
    try {
      return await fetchJson(`${apiBase}/public/website/milestone${query}`);
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError) throw lastError;
  return null;
}
