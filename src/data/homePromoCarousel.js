import { isOfferActiveByCalendar } from "../utils/offerDates";
import { FREEDOM_SALE_END, FREEDOM_SALE_START } from "../utils/freedomCampaign";

/** Full-width promo carousel — same Freedom banner component as production. */
export const PROMO_CAROUSEL_SLIDES = [
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
