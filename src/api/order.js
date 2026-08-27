const API_BASE = (process.env.REACT_APP_CLEENZO_API_URL || "").replace(/\/$/, "");

/** 64-char hex public access token from WhatsApp links. */
export function isPublicAccessToken(value) {
  return /^[a-f0-9]{64}$/i.test(String(value || "").trim());
}

/** Legacy order-number links (phone verification required). */
export function isPublicOrderNumber(value) {
  return /^CLZ-/i.test(String(value || "").trim());
}

/**
 * Fetch public order details via secure token (no login / no phone step).
 * @param {string} accessToken
 */
export async function fetchPublicOrderByToken(accessToken) {
  if (!API_BASE) {
    throw new Error("Order lookup is not configured");
  }
  const encoded = encodeURIComponent(accessToken.trim());
  const res = await fetch(
    `${API_BASE}/public/website/orders/access/${encoded}`,
    { headers: { Accept: "application/json" } },
  );
  if (res.status === 404) {
    throw new Error("This order link is invalid or has expired.");
  }
  if (!res.ok) {
    throw new Error(`Could not load order (${res.status})`);
  }
  return res.json();
}

/**
 * Fetch public order details (legacy — requires phone verification on the API).
 * @param {string} orderNumber
 * @param {string} phone Full mobile or last 4 digits
 */
export async function fetchPublicOrder(orderNumber, phone) {
  if (!API_BASE) {
    throw new Error("Order lookup is not configured");
  }
  const params = new URLSearchParams({
    phone: phone.trim(),
  });
  const encoded = encodeURIComponent(orderNumber.trim());
  const res = await fetch(
    `${API_BASE}/public/website/orders/${encoded}?${params.toString()}`,
    { headers: { Accept: "application/json" } },
  );
  if (res.status === 404) {
    throw new Error("Order not found. Check your order ID and mobile number.");
  }
  if (!res.ok) {
    throw new Error(`Could not load order (${res.status})`);
  }
  return res.json();
}

/** Direct URL to download/view the e-invoice PDF for a token-gated order. */
export function publicInvoicePdfUrl(accessToken) {
  const encoded = encodeURIComponent(accessToken.trim());
  return `${API_BASE}/public/website/orders/access/${encoded}/invoice.pdf`;
}
