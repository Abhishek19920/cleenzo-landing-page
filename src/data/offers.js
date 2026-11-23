import { isOfferActive, isOfferWithinListingWindow } from "../utils/offerDates";
import {
  FREEDOM_SALE_END,
  FREEDOM_SALE_START,
} from "../utils/freedomCampaign";
import {
  GANESH_CHATURTHI_CREDIT_PERCENT,
  GANESH_CHATURTHI_END,
  GANESH_CHATURTHI_MAX_ORDERS,
  GANESH_CHATURTHI_MIN_ORDER_INR,
  GANESH_CHATURTHI_PERCENT_OFF,
  GANESH_CHATURTHI_START,
} from "../utils/ganeshChaturthiCampaign";
import {
  OFFER_PROGRAM_START,
  FESTIVE_FIRST3_CREDIT_PERCENT,
  FESTIVE_FIRST3_MAX_ORDERS,
  FESTIVE_FIRST3_MIN_ORDER_INR,
  FESTIVE_FIRST3_PERCENT_OFF,
  REPEAT_OFFER_CREDIT_PERCENT,
  REPEAT_OFFER_PERCENT_OFF,
  LIFETIME_OFFER_END,
  REFERRAL_REWARD_INR,
} from "../utils/festiveCampaign";
import {
  MONTHLY_LOYALTY_CREDIT_PERCENT,
  MONTHLY_LOYALTY_MIN_GROSS_INR,
  MONTHLY_LOYALTY_OFFER_END,
  MONTHLY_LOYALTY_PERCENT_OFF,
  MONTHLY_LOYALTY_QUALIFYING_START,
} from "../utils/monthlyLoyaltyCampaign";
import {
  SOFA_DRYCLEAN_PROMO_END,
  SOFA_DRYCLEAN_PROMO_START,
  SOFA_SHEET_LIST_INR,
  SOFA_SHEET_PERCENT_OFF,
  SOFA_SHEET_SALE_INR,
} from "../utils/sofaDryCleanCampaign";

/**
 * Homepage offer cards — edit copy, dates, and terms here.
 * Cards auto-hide after endDate (Asia/Kolkata); no deploy needed to expire.
 */

/** @typedef {'freedom' | 'heroes' | 'independence' | 'benefit' | 'quality' | 'festive'} OfferVariant */

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
const QUALITY_OFFERS_START = OFFER_PROGRAM_START;
const QUALITY_OFFERS_END = LIFETIME_OFFER_END;

/** @type {HomepageOffer[]} */
export const HOMEPAGE_OFFERS = [
  {
    id: "sofa-dryclean-promo-oct2026",
    active: true,
    startDate: SOFA_DRYCLEAN_PROMO_START,
    endDate: SOFA_DRYCLEAN_PROMO_END,
    variant: "festive",
    featured: true,
    badge: "SOFA + DRY CLEAN PROMO",
    discount: `${SOFA_SHEET_PERCENT_OFF}% OFF sofa sheets`,
    secondaryBenefit: `+ ${FESTIVE_FIRST3_PERCENT_OFF}% off & ${FESTIVE_FIRST3_CREDIT_PERCENT}% credit on dry clean (first ${FESTIVE_FIRST3_MAX_ORDERS})`,
    title: "Fresh sofa sheets & premium dry clean",
    subtitle: `Sofa sheet cleaning ₹${SOFA_SHEET_LIST_INR} → ₹${SOFA_SHEET_SALE_INR} per sheet`,
    description: `Sofa sheet cleaning at ₹${SOFA_SHEET_SALE_INR}/sheet (${SOFA_SHEET_PERCENT_OFF}% off the ₹${SOFA_SHEET_LIST_INR} rate). New customers also get ${FESTIVE_FIRST3_PERCENT_OFF}% instant off plus ${FESTIVE_FIRST3_CREDIT_PERCENT}% Cleenzo Credit on eligible dry clean for each of their first ${FESTIVE_FIRST3_MAX_ORDERS} orders (min ₹${FESTIVE_FIRST3_MIN_ORDER_INR}). Blanket dry clean is included.`,
    audience: "Sofa sheet cleaning for everyone · Dry clean first-3 for new customers",
    validityLabel: "25 Oct – 30 Nov 2026",
    cta: { label: "Book This Offer", action: "schedule" },
    termsSections: [
      {
        heading: "Campaign period",
        body: "Valid 25 October – 30 November 2026 (Asia/Kolkata).",
        todo: false,
      },
      {
        heading: "Sofa sheet cleaning",
        body: `Sofa sheet / sofa cover cleaning is ₹${SOFA_SHEET_SALE_INR} per sheet during the campaign (was ₹${SOFA_SHEET_LIST_INR}). Book a home visit or pickup for sofa sheets.`,
        todo: false,
      },
      {
        heading: "Dry clean — first 3 orders",
        body: `New customers get ${FESTIVE_FIRST3_PERCENT_OFF}% instant off plus ${FESTIVE_FIRST3_CREDIT_PERCENT}% Cleenzo Credit on eligible dry clean (including blanket dry clean) on each of their first ${FESTIVE_FIRST3_MAX_ORDERS} orders. Minimum order ₹${FESTIVE_FIRST3_MIN_ORDER_INR}. Credit is added to the spendable wallet after the order is completed. Cannot be combined with another promotional coupon on the same order.`,
        todo: false,
      },
      {
        heading: "Blankets",
        body: `Blanket dry clean lines are included in the new-customer ${FESTIVE_FIRST3_PERCENT_OFF}% off + ${FESTIVE_FIRST3_CREDIT_PERCENT}% credit offer when you qualify.`,
        todo: false,
      },
      {
        heading: "Service areas",
        body: "Raj Nagar Extension, Sidharth Vihar, Kanawani, Ahinsa Khand, Indirapuram, Vaishali and nearby Ghaziabad localities.",
        todo: false,
      },
    ],
  },
  {
    id: "sofa-sheet-10-off-2026",
    active: true,
    startDate: SOFA_DRYCLEAN_PROMO_START,
    endDate: SOFA_DRYCLEAN_PROMO_END,
    variant: "heroes",
    featured: false,
    badge: "SOFA SHEET CLEANING",
    discount: `${SOFA_SHEET_PERCENT_OFF}% OFF`,
    secondaryBenefit: `₹${SOFA_SHEET_LIST_INR} → ₹${SOFA_SHEET_SALE_INR} per sheet`,
    title: "Sofa sheet cleaning at home",
    subtitle: "Fresh sofa. Cleaner home.",
    description: `Professional sofa sheet cleaning for ₹${SOFA_SHEET_SALE_INR} per sheet during this promo (list price ₹${SOFA_SHEET_LIST_INR}). Book a home visit and we’ll come to you.`,
    audience: "FOR EVERYONE · Home visit available",
    validityLabel: "25 Oct – 30 Nov 2026",
    cta: { label: "Book Sofa Cleaning", action: "schedule" },
    termsSections: [
      {
        heading: "Price",
        body: `₹${SOFA_SHEET_SALE_INR} per sofa sheet during the campaign window. Regular rate ₹${SOFA_SHEET_LIST_INR}.`,
        todo: false,
      },
      {
        heading: "How to book",
        body: "Use Book Sofa Cleaning / home visit on the website, or WhatsApp the store. Final count of sheets is confirmed on site.",
        todo: false,
      },
    ],
  },
  {
    id: "ganesh-chaturthi-2026",
    active: true,
    startDate: GANESH_CHATURTHI_START,
    endDate: GANESH_CHATURTHI_END,
    variant: "festive",
    featured: false,
    badge: "GANESH CHATURTHI SPECIAL",
    discount: `FLAT ${GANESH_CHATURTHI_PERCENT_OFF}% OFF`,
    secondaryBenefit: `+ ${GANESH_CHATURTHI_CREDIT_PERCENT}% Cleenzo Credit`,
    title: "Festival savings for everyone",
    subtitle: `On orders ₹${GANESH_CHATURTHI_MIN_ORDER_INR}+`,
    description:
      `Flat ${GANESH_CHATURTHI_PERCENT_OFF}% off eligible laundry & dry cleaning plus ${GANESH_CHATURTHI_CREDIT_PERCENT}% Cleenzo Credit back — when your original order value is ₹${GANESH_CHATURTHI_MIN_ORDER_INR} or more. Limited to the first ${GANESH_CHATURTHI_MAX_ORDERS} eligible orders.`,
    audience: "FOR EVERYONE · New & existing customers",
    validityLabel: "3rd – 25th September",
    cta: { label: "Book Festival Pickup", action: "schedule" },
    termsSections: [
      {
        heading: "Campaign period",
        body: "Valid 3–25 September 2026 (Asia/Kolkata). Limited to the first 500 eligible orders across all customers.",
        todo: false,
      },
      {
        heading: "Minimum order value",
        body: `The festival offer applies only when the original gross eligible order value is ₹${GANESH_CHATURTHI_MIN_ORDER_INR} or more, calculated before any discount, coupon, wallet credit or Cleenzo Credit.`,
        todo: false,
      },
      {
        heading: "Your reward",
        body: `${GANESH_CHATURTHI_PERCENT_OFF}% FLAT OFF on eligible lines plus ${GANESH_CHATURTHI_CREDIT_PERCENT}% Cleenzo Credit back on the post-discount eligible amount after delivery.`,
        todo: false,
      },
      {
        heading: "Eligible services",
        body: "Eligible laundry and dry cleaning items as determined by Cleenzo catalog rules. Steam-iron-only and uniform services are excluded.",
        todo: false,
      },
      {
        heading: "Combining offers",
        body: "Cannot be combined with a coupon code or another promotional offer. New customers may receive the higher of the new-customer or festival discount.",
        todo: false,
      },
    ],
  },
  {
    id: "festive-first3-2026",
    active: true,
    startDate: OFFER_PROGRAM_START,
    endDate: LIFETIME_OFFER_END,
    variant: "festive",
    featured: false,
    badge: "NEW CUSTOMER OFFER",
    discount: `${FESTIVE_FIRST3_PERCENT_OFF}% OFF`,
    secondaryBenefit: `+ ${FESTIVE_FIRST3_CREDIT_PERCENT}% Cleenzo Credit · first ${FESTIVE_FIRST3_MAX_ORDERS} orders`,
    description:
      `New to Cleenzo? Get ${FESTIVE_FIRST3_PERCENT_OFF}% instant off plus ${FESTIVE_FIRST3_CREDIT_PERCENT}% Cleenzo Credit to your spendable wallet after each completed order — on your first ${FESTIVE_FIRST3_MAX_ORDERS} eligible orders (min ₹${FESTIVE_FIRST3_MIN_ORDER_INR}). Dry clean (blankets included), premium laundry and carpet cleaning qualify. After ${FESTIVE_FIRST3_MAX_ORDERS} orders, the same ${REPEAT_OFFER_PERCENT_OFF}% off plus ${REPEAT_OFFER_CREDIT_PERCENT}% credit applies on eligible bills.`,
    audience: "FOR NEW CUSTOMERS · Dry clean & blankets eligible",
    validityLabel: "Always on",
    cta: { label: "Book My First Pickup", action: "schedule" },
    termsSections: [
      {
        heading: "Program validity",
        body: `Ongoing from 1 September 2026 (Asia/Kolkata). No expiry — unused first-order slots stay available until you use all three.`,
        todo: false,
      },
      {
        heading: "Who qualifies",
        body: "Customers with no previously completed Cleenzo order before 1 September 2026. Verified against the mobile number on your account.",
        todo: false,
      },
      {
        heading: "Minimum order",
        body: `Order subtotal must be at least ₹${FESTIVE_FIRST3_MIN_ORDER_INR} for the welcome discount to apply. Orders below ₹${FESTIVE_FIRST3_MIN_ORDER_INR} are billed at full price and do not use a first-3 slot.`,
        todo: false,
      },
      {
        heading: "How the 3 orders count",
        body: "Each discounted order uses one of your three. A cancelled order does not use one up.",
        todo: false,
      },
      {
        heading: "Eligible services",
        body: "Dry clean (including blanket dry clean), premium laundry, and carpet cleaning are auto-discounted. Wash & iron / wash & fold and steam iron are not auto-discounted. Police / force uniforms are excluded.",
        todo: false,
      },
      {
        heading: "Discount + Cleenzo Credit",
        body: `${FESTIVE_FIRST3_PERCENT_OFF}% off is applied immediately on the eligible order value (minimum ₹${FESTIVE_FIRST3_MIN_ORDER_INR}). ${FESTIVE_FIRST3_CREDIT_PERCENT}% Cleenzo Credit is calculated on the amount after that discount and added to your spendable wallet once the order is completed. The same ${REPEAT_OFFER_PERCENT_OFF}% + ${REPEAT_OFFER_CREDIT_PERCENT}% credit rates apply after ${FESTIVE_FIRST3_MAX_ORDERS} completed orders. Cannot be combined with a coupon code or another promotional offer.`,
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
    id: "monthly-loyalty-2026",
    active: true,
    startDate: MONTHLY_LOYALTY_QUALIFYING_START,
    endDate: MONTHLY_LOYALTY_OFFER_END,
    variant: "benefit",
    featured: false,
    badge: "LOYALTY REWARD",
    discount: `${MONTHLY_LOYALTY_PERCENT_OFF}% OFF`,
    secondaryBenefit: `+ ${MONTHLY_LOYALTY_CREDIT_PERCENT}% Cleenzo Credit back`,
    title: "Monthly loyalty unlock",
    subtitle: "Earn next month's savings",
    description:
      `Reach ₹${MONTHLY_LOYALTY_MIN_GROSS_INR.toLocaleString("en-IN")} in gross order value in a calendar month to unlock ${MONTHLY_LOYALTY_PERCENT_OFF}% off plus ${MONTHLY_LOYALTY_CREDIT_PERCENT}% Cleenzo Credit back the following month.`,
    audience: "FOR REGULAR CUSTOMERS",
    validityLabel: "Always on · qualify monthly",
    cta: { label: "Book My Pickup", action: "schedule" },
    termsSections: [
      {
        heading: "How to qualify",
        body: `During any calendar month, reach ₹${MONTHLY_LOYALTY_MIN_GROSS_INR.toLocaleString("en-IN")} in gross eligible order value (before discounts) from successful orders. Any number of orders counts — for example one ₹3,000 order or several smaller orders totalling ₹3,000.`,
        todo: false,
      },
      {
        heading: "Your reward",
        body: `The following month you receive ${MONTHLY_LOYALTY_PERCENT_OFF}% FLAT OFF on eligible laundry & dry cleaning plus ${MONTHLY_LOYALTY_CREDIT_PERCENT}% Cleenzo Credit back on the post-discount amount.`,
        todo: false,
      },
      {
        heading: "Program validity",
        body: "Ongoing from 1 September 2026. Qualify in any calendar month; your reward unlocks the following month.",
        todo: false,
      },
      {
        heading: "Order value",
        body: "Eligibility is measured on the original gross order value before any discount, coupon or wallet credit is applied.",
        todo: false,
      },
      {
        heading: "Full terms",
        body: "See the complete monthly loyalty rules on our Offer Terms page.",
        todo: false,
      },
    ],
  },
  {
    id: "refer-and-earn",
    active: true,
    startDate: QUALITY_OFFERS_START,
    endDate: QUALITY_OFFERS_END,
    variant: "heroes",
    badge: "REFER & EARN",
    discount: `₹${REFERRAL_REWARD_INR}`,
    secondaryBenefit: "Cleenzo Credit per friend",
    title: "Refer a friend, earn ₹100",
    subtitle: "Credited after their first delivery",
    description:
      "Share your referral code. When someone new to Cleenzo completes their first order, ₹100 Cleenzo Credit lands in your wallet.",
    audience: "For existing customers · Unlimited referrals",
    validityLabel: "Always on",
    cta: { label: "Get My Referral Code", action: "whatsapp" },
    termsSections: [
      {
        heading: "When you get paid",
        body: "₹100 is credited after the person you referred successfully completes their first eligible order — not when they enter your code.",
        todo: false,
      },
      {
        heading: "Who counts as new",
        body: "The referred person must be genuinely new to Cleenzo and must not already exist in our records under the same mobile number.",
        todo: false,
      },
      {
        heading: "One reward per person",
        body: "You earn ₹100 once per person you introduce, regardless of how many orders they later place.",
        todo: false,
      },
      {
        heading: "Cleenzo Credit",
        body: "Issued as Cleenzo Credit in your wallet. Not transferable and not redeemable for cash.",
        todo: false,
      },
      {
        heading: "Fair use",
        body: "Cleenzo may reject duplicate, self, fraudulent or suspicious referrals.",
        todo: false,
      },
    ],
  },
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
    active: false,
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

/** Cards below carousel — listed offers (includes upcoming before start). */
export function getVisibleHomepageOffers(now = new Date()) {
  return HOMEPAGE_OFFERS.filter((offer) => isOfferListed(offer, now));
}

export function isOfferListed(offer, now = new Date()) {
  return Boolean(
    offer.active && isOfferWithinListingWindow(offer.startDate, offer.endDate, now),
  );
}

export function isOfferRedeemable(offer, now = new Date()) {
  return Boolean(offer.active && isOfferActive(offer.startDate, offer.endDate, now));
}

export function getActiveHomepageOffers(now = new Date()) {
  return HOMEPAGE_OFFERS.filter((offer) => isOfferRedeemable(offer, now));
}
