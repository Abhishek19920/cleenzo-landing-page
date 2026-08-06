import { isOfferActive } from "../utils/offerDates";

/**
 * Homepage offer cards — edit copy, dates, and terms here.
 * Cards auto-hide after endDate (Asia/Kolkata); no deploy needed to expire.
 */

/** @typedef {'freedom' | 'heroes' | 'independence' | 'benefit'} OfferVariant */

/**
 * @typedef {Object} OfferCta
 * @property {string} label
 * @property {'schedule' | 'whatsapp'} action
 */

/**
 * @typedef {Object} OfferTermSection
 * @property {string} heading
 * @property {string | null} body
 * @property {boolean} [todo]
 */

/**
 * @typedef {Object} HomepageOffer
 * @property {string} id
 * @property {boolean} active
 * @property {string} [startDate] YYYY-MM-DD
 * @property {string} [endDate] YYYY-MM-DD
 * @property {OfferVariant} variant
 * @property {boolean} [featured]
 * @property {string} [badge]
 * @property {string} [discount]
 * @property {string} [secondaryBenefit]
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {string} description
 * @property {string} [audience]
 * @property {string} validityLabel
 * @property {OfferCta} cta
 * @property {OfferTermSection[]} termsSections
 */

/** @type {HomepageOffer[]} */
export const HOMEPAGE_OFFERS = [
  {
    id: "freedom-rakhi-sale-2026",
    active: true,
    startDate: "2026-08-09",
    endDate: "2026-08-30",
    variant: "freedom",
    featured: true,
    badge: "FREEDOM & RAKHI SALE 🇮🇳",
    discount: "FLAT 40% OFF",
    secondaryBenefit: "* GET 10% BACK",
    description:
      "As Cleenzo Credit on your next order. Free pickup & delivery for everyone — new & existing customers.",
    audience: "FOR EVERYONE · New & Existing Customers",
    validityLabel: "9th – 30th August",
    cta: { label: "Book Now", action: "schedule" },
    termsSections: [
      {
        heading: "Minimum order value",
        body: null,
        todo: true,
      },
      {
        heading: "Maximum discount",
        body: null,
        todo: true,
      },
      {
        heading: "Cleenzo Credit cap",
        body: null,
        todo: true,
      },
      {
        heading: "Credit validity",
        body: null,
        todo: true,
      },
      {
        heading: "Eligible services",
        body: null,
        todo: true,
      },
      {
        heading: "Usage limit",
        body: null,
        todo: true,
      },
      {
        heading: "Campaign validity",
        body: "Freedom & Rakhi Sale valid from 9th to 30th August 2026 (India Standard Time), unless withdrawn earlier by Cleenzo.",
        todo: false,
      },
    ],
  },
  {
    id: "heroes-uniform-2026",
    active: true,
    startDate: "2026-08-13",
    endDate: "2026-08-15",
    variant: "heroes",
    badge: "CLEENZO SALUTES OUR HEROES 🇮🇳",
    discount: "FLAT 50% OFF",
    title: "ON UNIFORM CLEANING",
    subtitle: "A Small Salute to Those Who Serve",
    description: "For Police & Armed Forces Personnel.",
    validityLabel: "13th – 15th August",
    cta: { label: "Book Now", action: "schedule" },
    termsSections: [
      {
        heading: "Eligible personnel",
        body: null,
        todo: true,
      },
      {
        heading: "Eligible uniform services",
        body: null,
        todo: true,
      },
      {
        heading: "Validity",
        body: "13th – 15th August 2026 (Asia/Kolkata).",
        todo: false,
      },
      {
        heading: "Verification",
        body: null,
        todo: true,
      },
    ],
  },
  {
    id: "independence-outfit-2026",
    active: true,
    startDate: "2026-08-13",
    endDate: "2026-08-15",
    variant: "independence",
    badge: "INDEPENDENCE DAY 🇮🇳",
    discount: "FLAT 50% OFF",
    title: "Independence Day Outfit Cleaning",
    subtitle: "Celebrate in clean festive wear",
    description:
      "Laundry & dry clean for your Independence Day outfits — for everyone. Free pickup & delivery where available.",
    audience: "FOR EVERYONE · New & Existing Customers",
    validityLabel: "13th – 15th August",
    cta: { label: "Book Now", action: "schedule" },
    termsSections: [
      {
        heading: "Eligible garments / services",
        body: null,
        todo: true,
      },
      {
        heading: "Minimum order value",
        body: null,
        todo: true,
      },
      {
        heading: "Maximum discount",
        body: null,
        todo: true,
      },
      {
        heading: "Validity",
        body: "13th – 15th August 2026 (Asia/Kolkata).",
        todo: false,
      },
    ],
  },
];

export function getActiveHomepageOffers(now = new Date()) {
  return HOMEPAGE_OFFERS.filter(
    (offer) => offer.active && isOfferActive(offer.startDate, offer.endDate, now),
  );
}
