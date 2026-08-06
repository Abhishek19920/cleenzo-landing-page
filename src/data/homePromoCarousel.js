import { isOfferActive } from "../utils/offerDates";

/** Full-width promo carousel slides (sharp HTML banner). */
export const PROMO_CAROUSEL_SLIDES = [
  {
    id: "freedom-rakhi-sale-2026",
    type: "freedom-banner",
    theme: "light",
    offerId: "freedom-rakhi-sale-2026",
    ariaLabel:
      "Freedom and Rakhi Sale — Flat 40% off plus 10% Cleenzo Credit back. Valid 6th to 30th August. Free pickup and delivery. Book now.",
    startDate: "2026-08-06",
    endDate: "2026-08-30",
    clickAction: "schedule",
  },
];

export function getActivePromoCarouselSlides(now = new Date()) {
  return PROMO_CAROUSEL_SLIDES.filter((slide) =>
    isOfferActive(slide.startDate, slide.endDate, now),
  );
}

/** @deprecated use getActivePromoCarouselSlides */
export function getActivePromoImageSlides(now = new Date()) {
  return getActivePromoCarouselSlides(now);
}
