/**
 * PRE_LAUNCH_CLEANUP — temporary store-opening code. Remove after launch stabilises:
 * - src/launchGate.js
 * - src/preLaunch.js (this file)
 * - src/sections/LaunchPopup.jsx
 * - src/sections/StoreOpeningBanner.jsx
 * - src/sections/StoreOpeningSection.jsx
 * - STORE_LAUNCH / ENABLE_LAUNCH_GATE in constants.js
 * - launch-gate branch in App.jsx
 */

import {
  CAROUSEL_BANNERS,
  OFFERS,
  STORE_LAUNCH,
  WHY_CLEENZO,
} from "./constants";
import { isBeforeLaunchDay } from "./launchGate";

export { isBeforeLaunchDay } from "./launchGate";

/** True until end of 15 June 2026 — store UI hidden from 16 June onward. */
export function showPreLaunchUI() {
  return isBeforeLaunchDay();
}

export function isStoreLive() {
  return !isBeforeLaunchDay();
}

export function getWhyCleenzo() {
  if (showPreLaunchUI()) return WHY_CLEENZO;

  return {
    ...WHY_CLEENZO,
    badge: "Now open · Raj Nagar",
    subtext:
      "Premium quality service, safe & hygienic cleaning, and on-time express delivery at Raj Nagar, Ghaziabad.",
    imageAlt:
      "Cleenzo laundry and dry cleaning service with express delivery in Ghaziabad",
  };
}

export function getOffers() {
  if (showPreLaunchUI()) return OFFERS;

  return {
    ...OFFERS,
    badge: "Limited time offers",
    subtext:
      "Premium fabric care with express doorstep service at AVS City Square, Raj Nagar Extension — real savings on every order.",
    intro:
      "Impeccable quality, every time. Book on WhatsApp or schedule a free pickup today.",
    featured: {
      ...OFFERS.featured,
      label: "Top offer",
      note: "starts at · limited slots",
    },
    terms: "*T&C apply on select garments",
    items: OFFERS.items.map((item) =>
      item.title === "Flat 51% OFF"
        ? { ...item, desc: "Big savings on premium dry clean" }
        : item,
    ),
  };
}

export function getCarouselBanners() {
  if (showPreLaunchUI()) return CAROUSEL_BANNERS;

  return CAROUSEL_BANNERS.map((banner) =>
    banner.id === "offers"
      ? {
          ...banner,
          badge: "🎉 Special offers",
          title: "Exclusive deals",
        }
      : banner,
  );
}

export function getStoreOpeningWhatsAppMessage() {
  return `Hi Cleenzo! I'm excited about your store opening on ${STORE_LAUNCH.dateDisplay}. Please keep me updated!`;
}
