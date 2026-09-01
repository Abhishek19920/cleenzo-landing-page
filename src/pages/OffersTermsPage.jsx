import { Link } from "react-router-dom";
import {
  FESTIVE_FIRST3_MAX_ORDERS,
  FESTIVE_FIRST3_PERCENT_OFF,
  OFFER_PROGRAM_START,
  REFERRAL_REWARD_INR,
} from "../utils/festiveCampaign";
import {
  MONTHLY_LOYALTY_MIN_GROSS_INR,
  MONTHLY_LOYALTY_PERCENT_OFF,
  MONTHLY_LOYALTY_CREDIT_PERCENT,
} from "../utils/monthlyLoyaltyCampaign";
import {
  GANESH_CHATURTHI_CREDIT_PERCENT,
  GANESH_CHATURTHI_END,
  GANESH_CHATURTHI_MAX_ORDERS,
  GANESH_CHATURTHI_MIN_ORDER_INR,
  GANESH_CHATURTHI_PERCENT_OFF,
  GANESH_CHATURTHI_START,
} from "../utils/ganeshChaturthiCampaign";

/**
 * Full terms for Cleenzo offers.
 *
 * Every claim here must match the backend campaign config and reward
 * services. When an offer changes, update the shared constants in
 * `utils/festiveCampaign.js` / `utils/monthlyLoyaltyCampaign.js` and
 * the backend config together.
 */

const SECTIONS = [
  {
    id: "first-3-orders",
    heading: `1. First ${FESTIVE_FIRST3_MAX_ORDERS} Orders Offer`,
    status: "Always on · from 1 September 2026",
    body: [
      `New customers can avail ${FESTIVE_FIRST3_PERCENT_OFF}% OFF on their first ${FESTIVE_FIRST3_MAX_ORDERS} eligible orders, subject to the terms below.`,
      "The discount is applied to the eligible order value before the discount is applied.",
      `A customer is treated as new if they have no previously completed Cleenzo order before ${OFFER_PROGRAM_START === "2026-09-01" ? "1 September 2026" : OFFER_PROGRAM_START}, checked against the mobile number on the account.`,
      "This is an ongoing offer with no expiry. Unused first-order slots remain available until all three are used.",
      "A cancelled order does not consume one of the three uses.",
    ],
  },
  {
    id: "ganesh-chaturthi",
    heading: "2. Ganesh Chaturthi Festival Offer",
    status: "3–15 September 2026 · first 500 orders",
    body: [
      `Flat ${GANESH_CHATURTHI_PERCENT_OFF}% OFF plus ${GANESH_CHATURTHI_CREDIT_PERCENT}% Cleenzo Credit back on eligible laundry and dry cleaning orders.`,
      `Valid ${GANESH_CHATURTHI_START === "2026-09-03" ? "3" : GANESH_CHATURTHI_START} to ${GANESH_CHATURTHI_END === "2026-09-15" ? "15 September 2026" : GANESH_CHATURTHI_END} (Asia/Kolkata). Limited to the first ${GANESH_CHATURTHI_MAX_ORDERS} eligible orders.`,
      `The offer applies only when the original gross eligible order value is ₹${GANESH_CHATURTHI_MIN_ORDER_INR.toLocaleString("en-IN")} or more, calculated before any discount, coupon, wallet credit or Cleenzo Credit.`,
      "Example: an order originally valued at ₹500 receives 25% off (₹125) and the customer pays ₹375. The customer remains eligible because the original order value is ₹500.",
      "Example: on that ₹500 order, 10% Cleenzo Credit back is ₹37.50 — calculated on the ₹375 you pay after discount, not on ₹500.",
      "Example: an order originally valued at ₹450 is not eligible for the festival offer.",
      `${GANESH_CHATURTHI_CREDIT_PERCENT}% Cleenzo Credit back is calculated on the final payable amount after the promotional discount, not on the original order value. Credit is issued after successful delivery.`,
      "Cannot be combined with another promotional offer. If a new-customer first-3 discount is higher, that discount applies instead.",
    ],
  },
  {
    id: "monthly-loyalty",
    heading: "3. Monthly Loyalty Offer",
    status: "Always on · from 1 September 2026",
    body: [
      "Customers unlock a benefit for the following month by reaching the monthly gross order value threshold during the current calendar month.",
      `Eligibility requires a total eligible gross order value of ₹${MONTHLY_LOYALTY_MIN_GROSS_INR.toLocaleString("en-IN")} or more from successful orders during the month. There is no minimum number of orders.`,
      `Once eligible, the customer receives ${MONTHLY_LOYALTY_PERCENT_OFF}% FLAT OFF plus ${MONTHLY_LOYALTY_CREDIT_PERCENT}% Cleenzo Credit back in the following month, subject to applicable campaign and usage rules.`,
    ],
  },
  {
    id: "cleenzo-credit-calculation",
    heading: "4. How Cleenzo Credit Back Is Calculated",
    body: [
      "Where an offer includes Cleenzo Credit back (for example Ganesh Chaturthi or Monthly Loyalty), the percentage is applied to the final payable amount after the promotional discount — not on the original order value.",
      "Example: Original order value ₹500 → 30% off (₹150) → final payable ₹350 → 10% Cleenzo Credit back = ₹35.",
      "The first-3 new customer offer (30% off) does not include Cleenzo Credit back.",
      "Credit is added to your Cleenzo Wallet after successful delivery, subject to each offer's terms.",
    ],
  },
  {
    id: "order-value",
    heading: "5. How Order Value Is Calculated",
    body: [
      "Eligibility is calculated on the original gross eligible order value, before applying any discount, coupon, wallet credit, Cleenzo Credit or promotional benefit.",
      "For example, on an order originally valued at ₹500 with a ₹200 discount where the customer pays ₹300, the amount counted towards monthly loyalty eligibility is ₹500, not ₹300.",
    ],
  },
  {
    id: "successful-orders",
    heading: "6. Successful Order Requirement",
    body: [
      "Only successfully completed orders are considered for eligibility.",
      "Cancelled orders, refunded or fully reversed orders, fraudulent or invalid transactions, and orders that do not meet minimum eligible order requirements may not be counted.",
    ],
  },
  {
    id: "refer-and-earn",
    heading: "7. Referral Program – Refer & Earn",
    status: "Always on",
    body: [
      `A customer can refer a new customer to Cleenzo. Once the referred customer successfully completes their first eligible order, the referring customer receives ₹${REFERRAL_REWARD_INR} Cleenzo Credit in their Cleenzo Wallet.`,
      `The ₹${REFERRAL_REWARD_INR} reward is provided as Cleenzo Credit and is not redeemable for cash.`,
      "The reward is credited after the qualifying order is completed, not when the referral code is entered.",
      `A referrer earns ₹${REFERRAL_REWARD_INR} once per person they introduce, regardless of how many orders that person later places.`,
    ],
  },
  {
    id: "referral-eligibility",
    heading: "8. Referral Eligibility",
    body: [
      "The referred person must be a genuinely new Cleenzo customer.",
      "The referred customer must successfully complete their first eligible order.",
      "The referred customer must not already exist in the Cleenzo customer database using the same mobile number.",
      "Referral rewards are credited after verification of the successful qualifying order.",
      "Cleenzo reserves the right to reject duplicate, fraudulent, self-referral or suspicious referrals.",
    ],
  },
  {
    id: "definitions",
    heading: "9. Important Definitions",
    definitions: [
      {
        term: "Order Count",
        desc: "The number of successfully completed eligible orders during the applicable calendar month.",
      },
      {
        term: "Eligible Order Value",
        desc: "The original gross value of eligible services before applying discounts, coupons, wallet credits, Cleenzo Credits or other promotional reductions.",
      },
      {
        term: "Cleenzo Credit",
        desc: "Promotional credit issued to the customer's Cleenzo Wallet after eligible offers. Percentage credit (e.g. 10%) is calculated on the final payable amount after discount, not the original order value. Not transferable or redeemable for cash.",
      },
    ],
  },
  {
    id: "offer-eligibility",
    heading: "10. Offer Eligibility",
    body: [
      "Offers may be subject to minimum order value requirements, service availability, applicable service areas, campaign validity dates and specific service exclusions.",
      "Unless explicitly stated otherwise, offers cannot be combined with another discount or promotional offer.",
    ],
  },
  {
    id: "final-decision",
    heading: "11. Final Decision",
    body: [
      "Cleenzo reserves the right to modify, suspend or withdraw any promotional offer or reward program in case of misuse, technical errors, fraudulent activity or operational requirements.",
    ],
  },
];

function OffersTermsPage() {
  return (
    <section className="bg-cleenzo-pale-bg/40">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-cleenzo-deep font-medium">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-slate-700">Offer terms</span>
        </nav>

        <header className="mb-10">
          <span className="inline-block bg-cleenzo-deep text-white text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full">
            Terms &amp; Conditions
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-cleenzo-deep tracking-tight mt-4">
            Cleenzo Offers
          </h1>
          <p className="text-slate-600 text-base md:text-lg mt-3">
            These terms govern the ongoing promotions on Cleenzo. All dates are
            in India Standard Time (Asia/Kolkata).
          </p>
        </header>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="bg-white border border-slate-200 rounded-xl p-6 md:p-7 shadow-sm scroll-mt-24"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-cleenzo-deep">
                  {section.heading}
                </h2>
                {section.status ? (
                  <span className="text-xs font-semibold bg-cleenzo-pale text-cleenzo-dark border border-cleenzo/15 px-2.5 py-1 rounded-full">
                    {section.status}
                  </span>
                ) : null}
              </div>

              {section.body ? (
                <ul className="space-y-2.5">
                  {section.body.map((line) => (
                    <li
                      key={line}
                      className="text-slate-700 leading-relaxed flex gap-2.5"
                    >
                      <span
                        className="text-cleenzo mt-1.5 shrink-0"
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.definitions ? (
                <dl className="space-y-3">
                  {section.definitions.map((item) => (
                    <div key={item.term}>
                      <dt className="font-bold text-slate-900">{item.term}</dt>
                      <dd className="text-slate-700 leading-relaxed">
                        {item.desc}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </article>
          ))}
        </div>

        <p className="text-sm text-slate-500 mt-10">
          Questions about an offer? Message us on WhatsApp and our team will
          confirm what applies to your account.
        </p>
      </div>
    </section>
  );
}

export default OffersTermsPage;