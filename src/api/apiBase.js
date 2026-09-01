/** Production Cleenzo API — must match backend PUBLIC_ORDER_API_BASE_URL host. */
export const PRODUCTION_API_BASE = "https://api.cleenzo.co.in/api/v1";

const PRODUCTION_HOSTS = new Set(["cleenzo.co.in", "www.cleenzo.co.in"]);

/**
 * Resolve the public Cleenzo API base URL.
 *
 * WhatsApp order/invoice links open cleenzo.co.in/order/{token}. That page
 * must call the Nest public website API. Prefer REACT_APP_CLEENZO_API_URL at
 * build time; on production hosts fall back so links work even if CI secret
 * was missing.
 */
export function getCleenzoApiBase() {
  const fromEnv = (process.env.REACT_APP_CLEENZO_API_URL || "")
    .trim()
    .replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (PRODUCTION_HOSTS.has(host)) {
      return PRODUCTION_API_BASE;
    }
  }

  return "";
}
