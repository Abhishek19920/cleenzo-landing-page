import { isOfferActiveByCalendar } from "../utils/offerDates";
import { FREEDOM_SALE_END, FREEDOM_SALE_START } from "../utils/freedomCampaign";
import { OFFER_PROGRAM_START, LIFETIME_OFFER_END } from "../utils/festiveCampaign";
import {
  GANESH_CHATURTHI_END,
  GANESH_CHATURTHI_START,
} from "../utils/ganeshChaturthiCampaign";

/** Full-width promo carousel — date-gated slides only. */
export const PROMO_CAROUSEL_SLIDES = [
  {
    id: "ganesh-chaturthi-2026",
    type: "ganesh-banner",
    theme: "light",
    offerId: "ganesh-chaturthi-2026",
    ariaLabel:
      "Ganesh Chaturthi festival offer — Flat 25% off plus 10% Cleenzo Credit on eligible orders of ₹500 or more. Limited to the first 500 orders. Book now.",
    startDate: GANESH_CHATURTHI_START,
    endDate: GANESH_CHATURTHI_END,
    clickAction: "schedule",
  },
  {
    id: "festive-first3-2026",
    type: "festive-banner",
    theme: "light",
    offerId: "festive-first3-2026",
    ariaLabel:
      "New customer offer — 30% off your first 3 orders. Free pickup across Raj Nagar Extension, Sidharth Vihar, Indirapuram and Vaishali. Book now.",
    startDate: OFFER_PROGRAM_START,
    endDate: LIFETIME_OFFER_END,
    clickAction: "schedule",
  },
  {
    id: "freedom-rakhi-sale-2026",
    type: "freedom-banner",
    theme: "light",
    offerId: "freedom-rakhi-sale-2026",
    ariaLabel:
      "Quality laundry care with season savings — Flat 40% off plus 10% Cleenzo Credit. Free pickup across Raj Nagar Extension, Sidharth Vihar, Indirapuram and Vaishali. Book now.",
    startDate: FREEDOM_SALE_START,
    endDate: FREEDOM_SALE_END,
    clickAction: "schedule",
  },
];

/** Calendar dates only (matches cleenzo.co.in — not affected by local dev UI preview). */
export function getActivePromoCarouselSlides(now = new Date()) {
  return PROMO_CAROUSEL_SLIDES.filter((slide) =>
    isOfferActiveByCalendar(slide.startDate, slide.endDate, now),
  );
}

/** @deprecated use getActivePromoCarouselSlides */
export function getActivePromoImageSlides(now = new Date()) {
  return getActivePromoCarouselSlides(now);
}
