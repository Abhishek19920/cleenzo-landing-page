import { isOfferWithinListingWindow } from "../utils/offerDates";
import { FREEDOM_SALE_END, FREEDOM_SALE_START } from "../utils/freedomCampaign";
import {
  FESTIVE_FIRST3_MAX_DISCOUNT_INR,
  FESTIVE_FIRST3_MAX_ORDERS,
  FESTIVE_FIRST3_PERCENT_OFF,
  LIFETIME_OFFER_END,
  OFFER_PROGRAM_START,
} from "../utils/festiveCampaign";
import {
  GANESH_CHATURTHI_END,
  GANESH_CHATURTHI_START,
} from "../utils/ganeshChaturthiCampaign";
import {
  SOFA_DRYCLEAN_PROMO_END,
  SOFA_DRYCLEAN_PROMO_START,
  SOFA_SHEET_LIST_INR,
  SOFA_SHEET_PERCENT_OFF,
  SOFA_SHEET_SALE_INR,
} from "../utils/sofaDryCleanCampaign";

/** Full-width promo carousel — date-gated slides only. */
export const PROMO_CAROUSEL_SLIDES = [
  {
    id: "sofa-dryclean-promo-oct2026",
    type: "image",
    theme: "light",
    offerId: "sofa-dryclean-promo-oct2026",
    imageSrc: "/images/offers/sofa-dryclean-promo-oct2026.jpg",
    imageAlt:
      "Cleenzo sofa cleaning 10% off sofa sheet cleaning and dry clean 30% off first 3 orders",
    /** Square creative — show full artwork instead of landscape crop. */
    imageFit: "contain",
    ariaLabel: `Sofa sheet cleaning ${SOFA_SHEET_PERCENT_OFF}% off — ₹${SOFA_SHEET_LIST_INR} cut to ₹${SOFA_SHEET_SALE_INR} per sheet. Dry clean flat ${FESTIVE_FIRST3_PERCENT_OFF}% off on your first ${FESTIVE_FIRST3_MAX_ORDERS} orders, max ₹${FESTIVE_FIRST3_MAX_DISCOUNT_INR}. Blanket dry clean also eligible. Book now.`,
    startDate: SOFA_DRYCLEAN_PROMO_START,
    endDate: SOFA_DRYCLEAN_PROMO_END,
    clickAction: "schedule",
  },
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
      "New customer offer — 30% off on your first 3 orders, capped at ₹700 (min ₹500). Or choose 20% off + 10% wallet credit with no cap. After 3 orders, repeat customers get 20% off + 10% credit. Free pickup across Raj Nagar Extension, Sidharth Vihar, Indirapuram and Vaishali. Book now.",
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

/** Listed slides (includes upcoming before start; excludes after end). */
export function getActivePromoCarouselSlides(now = new Date()) {
  return PROMO_CAROUSEL_SLIDES.filter((slide) =>
    isOfferWithinListingWindow(slide.startDate, slide.endDate, now),
  );
}

/** @deprecated use getActivePromoCarouselSlides */
export function getActivePromoImageSlides(now = new Date()) {
  return getActivePromoCarouselSlides(now);
}
