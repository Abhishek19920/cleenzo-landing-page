import { isOfferActive } from "../utils/offerDates";
import {
  FREEDOM_SALE_END,
  FREEDOM_SALE_START,
  UNIFORM_SALE_END,
  UNIFORM_SALE_START,
} from "../utils/freedomCampaign";

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

/** Homepage campaign: show offer cards in Freedom window (IST). */
export const HOMEPAGE_OFFERS_CAMPAIGN_START = FREEDOM_SALE_START;
export const HOMEPAGE_OFFERS_CAMPAIGN_END = FREEDOM_SALE_END;

/** @type {HomepageOffer[]} */
export const HOMEPAGE_OFFERS = [
  {
    id: "freedom-rakhi-sale-2026",
    active: true,
    startDate: FREEDOM_SALE_START,
    endDate: FREEDOM_SALE_END,
    variant: "freedom",
    featured: true,
    badge: "FREEDOM & RAKHI SALE 🇮🇳",
    discount: "FLAT 40% OFF",
    secondaryBenefit: "Earn 10% Cleenzo Credit",
    description:
      "Get 40% OFF on eligible laundry & dry cleaning + earn 10% Cleenzo Credit on the post-discount amount. Credit unlocks after the campaign ends.",
    audience: "FOR EVERYONE · New & Existing Customers",
    validityLabel: "9th – 30th August",
    cta: { label: "Book Pickup Now", action: "schedule" },
    termsSections: [
      {
        heading: "Campaign validity",
        body: "Freedom & Rakhi Sale valid 9–30 August 2026 (Asia/Kolkata).",
        todo: false,
      },
      {
        heading: "Eligible services",
        body: "Eligible laundry and dry cleaning items as determined by Cleenzo catalog rules.",
        todo: false,
      },
      {
        heading: "40% campaign discount",
        body: "Applied on eligible lines during checkout/order processing. Not combinable with wallet redemption on the same Freedom campaign order.",
        todo: false,
      },
      {
        heading: "10% Cleenzo Credit",
        body: "Calculated on the post-40%-discount eligible amount for Freedom lines. Locked until after the campaign; not an instant extra discount.",
        todo: false,
      },
      {
        heading: "Customers",
        body: "New and existing customers.",
        todo: false,
      },
      {
        heading: "Serviceability",
        body: "Doorstep pickup & delivery subject to pincode/service area coverage.",
        todo: false,
      },
    ],
  },
  {
    id: "heroes-uniform-2026",
    active: true,
    startDate: UNIFORM_SALE_START,
    endDate: UNIFORM_SALE_END,
    variant: "heroes",
    badge: "SALUTING THOSE WHO SERVE 🇮🇳",
    discount: "50% OFF",
    title: "Police & Force Uniform Cleaning",
    subtitle: "Independence Day special",
    description: "Eligible police & force uniform services only — 13–15 August.",
    validityLabel: "13th – 15th August",
    cta: { label: "Book Now", action: "schedule" },
    termsSections: [
      {
        heading: "Eligible services",
        body: "Police & force uniform cleaning items flagged in Cleenzo catalog.",
        todo: false,
      },
      {
        heading: "Validity",
        body: "13th – 15th August 2026 (Asia/Kolkata).",
        todo: false,
      },
      {
        heading: "Not site-wide",
        body: "50% applies only to eligible uniform lines; other eligible items may receive Freedom 40% during overlap dates.",
        todo: false,
      },
    ],
  },
  {
    id: "independence-outfit-2026",
    active: true,
    startDate: UNIFORM_SALE_START,
    endDate: UNIFORM_SALE_END,
    variant: "independence",
    badge: "INDEPENDENCE DAY 🇮🇳",
    discount: "50% OFF",
    title: "Ethnic & Festive Wear Cleaning",
    subtitle: "Independence Day special",
    description:
      "Laundry & dry clean on ethnic wear, kurtas, sarees & festive outfits — for everyone.",
    audience: "FOR EVERYONE · New & Existing Customers",
    validityLabel: "13th – 15th August",
    cta: { label: "Book Now", action: "schedule" },
    termsSections: [
      {
        heading: "Eligible garments",
        body: "Ethnic wear, kurtas, sarees and festive outfits as per Cleenzo catalog.",
        todo: false,
      },
      {
        heading: "Validity",
        body: "13th – 15th August 2026 (Asia/Kolkata).",
        todo: false,
      },
    ],
  },
];

/** Cards below carousel — all active offers during campaign window (dev: always). */
export function getVisibleHomepageOffers(now = new Date()) {
  if (
    !isOfferActive(HOMEPAGE_OFFERS_CAMPAIGN_START, HOMEPAGE_OFFERS_CAMPAIGN_END, now)
  ) {
    return [];
  }
  return HOMEPAGE_OFFERS.filter((offer) => offer.active);
}

export function isOfferRedeemable(offer, now = new Date()) {
  return Boolean(offer.active && isOfferActive(offer.startDate, offer.endDate, now));
}

export function getActiveHomepageOffers(now = new Date()) {
  return HOMEPAGE_OFFERS.filter((offer) => isOfferRedeemable(offer, now));
}
