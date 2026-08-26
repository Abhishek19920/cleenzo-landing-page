import { isOfferActive } from "../utils/offerDates";
import {
  FREEDOM_SALE_END,
  FREEDOM_SALE_START,
} from "../utils/freedomCampaign";

/**
 * Homepage offer cards — edit copy, dates, and terms here.
 * Cards auto-hide after endDate (Asia/Kolkata); no deploy needed to expire.
 */

/** @typedef {'freedom' | 'heroes' | 'independence' | 'benefit' | 'quality'} OfferVariant */

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

/** Homepage campaign window for Freedom sale (IST). */
export const HOMEPAGE_OFFERS_CAMPAIGN_START = FREEDOM_SALE_START;
export const HOMEPAGE_OFFERS_CAMPAIGN_END = FREEDOM_SALE_END;

/** Evergreen quality offers — stay visible after Independence Day. */
const QUALITY_OFFERS_START = "2026-08-16";
const QUALITY_OFFERS_END = "2027-12-31";

/** @type {HomepageOffer[]} */
export const HOMEPAGE_OFFERS = [
  {
    id: "freedom-rakhi-sale-2026",
    active: true,
    startDate: FREEDOM_SALE_START,
    endDate: FREEDOM_SALE_END,
    variant: "freedom",
    featured: true,
    badge: "LIMITED SEASON OFFER",
    discount: "FLAT 40% OFF",
    secondaryBenefit: "Earn 10% Cleenzo Credit",
    description:
      "40% OFF on eligible laundry & dry cleaning + earn 10% Cleenzo Credit on the post-discount amount. Credit unlocks after the campaign ends.",
    audience: "FOR EVERYONE · New & Existing Customers",
    validityLabel: "9th – 30th August",
    cta: { label: "Book Pickup Now", action: "schedule" },
    termsSections: [
      {
        heading: "Campaign validity",
        body: "Valid 9–30 August 2026 (Asia/Kolkata).",
        todo: false,
      },
      {
        heading: "Eligible services",
        body: "Eligible laundry and dry cleaning items as determined by Cleenzo catalog rules.",
        todo: false,
      },
      {
        heading: "40% campaign discount",
        body: "Applied on eligible lines during checkout/order processing. Not combinable with wallet redemption on the same campaign order.",
        todo: false,
      },
      {
        heading: "10% Cleenzo Credit",
        body: "Calculated on the post-40%-discount eligible amount. Locked until after the campaign; not an instant extra discount.",
        todo: false,
      },
      {
        heading: "Serviceability",
        body: "Doorstep pickup & delivery across Raj Nagar Extension, Sidharth Vihar, Kanawani, Ahinsa Khand, Indirapuram, Vaishali and nearby areas.",
        todo: false,
      },
    ],
  },
  {
    id: "premium-quality-care",
    active: true,
    startDate: QUALITY_OFFERS_START,
    endDate: QUALITY_OFFERS_END,
    variant: "quality",
    badge: "QUALITY FIRST",
    title: "German chemicals · Expert finish",
    subtitle: "What families trust us for",
    description:
      "Every garment is inspected, treated with professional chemistry, and QC-checked before packing — so clothes return fresher, sharper and safer.",
    audience: "Premium fabric care · Suits, sarees, daily wear & home textiles",
    validityLabel: "Always on",
    cta: { label: "Book Quality Care", action: "schedule" },
    termsSections: [
      {
        heading: "Process",
        body: "Intake inspection, stain treatment, fabric-safe wash or dry clean, steam finish and final QC before delivery.",
        todo: false,
      },
      {
        heading: "Chemicals & machines",
        body: "Professional-grade detergents and calibrated equipment — not supermarket powder.",
        todo: false,
      },
    ],
  },
  {
    id: "free-pickup-nearby",
    active: true,
    startDate: QUALITY_OFFERS_START,
    endDate: QUALITY_OFFERS_END,
    variant: "benefit",
    badge: "DOORSTEP SERVICE",
    title: "Free pickup & delivery",
    subtitle: "Near Raj Nagar Extension",
    description:
      "We collect and return across Sidharth Vihar, Kanawani, Ahinsa Khand, Indirapuram, Vaishali and Raj Nagar Extension — no store visit needed.",
    audience: "Express turnaround · 12–48 hrs on most orders",
    validityLabel: "Service areas live",
    cta: { label: "Schedule Pickup", action: "schedule" },
    termsSections: [
      {
        heading: "Coverage",
        body: "Raj Nagar Extension, Sidharth Vihar, Kanawani, Ahinsa Khand, Indirapuram, Vaishali and nearby Ghaziabad localities.",
        todo: false,
      },
      {
        heading: "Free delivery",
        body: "Free delivery typically applies on orders above ₹480 — confirm when you book.",
        todo: false,
      },
    ],
  },
];

/** Cards below carousel — only offers within their own date window. */
export function getVisibleHomepageOffers(now = new Date()) {
  return HOMEPAGE_OFFERS.filter((offer) => isOfferRedeemable(offer, now));
}

export function isOfferRedeemable(offer, now = new Date()) {
  return Boolean(offer.active && isOfferActive(offer.startDate, offer.endDate, now));
}

export function getActiveHomepageOffers(now = new Date()) {
  return HOMEPAGE_OFFERS.filter((offer) => isOfferRedeemable(offer, now));
}
