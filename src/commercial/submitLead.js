import { WHATSAPP_NUMBER } from "../constants";

function buildWhatsAppMessage(payload) {
  const lines = [
    "Hi Cleenzo! I'd like a commercial laundry quote.",
    "",
    `Business: ${payload.business_name}`,
    `Contact: ${payload.contact_person}`,
    `Mobile: ${payload.mobile}`,
    payload.email ? `Email: ${payload.email}` : null,
    `Business type: ${payload.business_type}`,
    payload.monthly_volume ? `Monthly volume: ${payload.monthly_volume}` : null,
    `Pickup address: ${payload.pickup_address}`,
    payload.requirement_details ? `Requirements: ${payload.requirement_details}` : null,
  ].filter(Boolean);

  return encodeURIComponent(lines.join("\n"));
}

export async function submitCommercialLead(payload) {
  const apiBase = process.env.REACT_APP_COMMERCIAL_API_URL || "";
  const endpoint = `${apiBase}/api/commercial-lead`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { ok: true, via: "api" };
  } catch {
    // fall through to WhatsApp
  }

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(payload)}`, "_blank", "noopener,noreferrer");
  return { ok: true, via: "whatsapp" };
}
