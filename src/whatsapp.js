import { WHATSAPP_NUMBER, WHATSAPP_BOOKING_MESSAGE } from "./constants";

export function openWhatsAppBooking(customMessage) {
  const text = encodeURIComponent(customMessage || WHATSAPP_BOOKING_MESSAGE);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
}
