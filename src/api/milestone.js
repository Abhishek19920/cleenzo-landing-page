import { getPublicApiBase, PRODUCTION_API_BASE } from "./apiBase";
import { websiteOrganizationSlug } from "./booking";

/** Raj Nagar Extension store org — never use local demo for public milestone stats. */
const LIVE_STORE_SLUG = "shine-works";

function milestoneApiBases() {
  const local = getPublicApiBase();
  const bases = [];
  if (local) bases.push(local);
  if (PRODUCTION_API_BASE && !bases.includes(PRODUCTION_API_BASE)) {
    bases.push(PRODUCTION_API_BASE);
  }
  return bases;
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
      const res = await fetch(`${apiBase}/public/website/milestone${query}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        lastError = new Error(`API ${res.status}`);
        continue;
      }
      return res.json();
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError) throw lastError;
  return null;
}
