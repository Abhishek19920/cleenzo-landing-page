const API_BASE = (process.env.REACT_APP_CLEENZO_API_URL || "").replace(/\/$/, "");

/**
 * Fetch public order details (requires phone verification on the API).
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
