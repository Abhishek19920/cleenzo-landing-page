import {
  PHONE_DISPLAY,
  PHONE_TEL,
  SOCIAL_LINKS,
  STORE_ADDRESS,
  STORE_ADDRESS_LINES,
} from "./constants";

export const SITE_URL = process.env.REACT_APP_SITE_URL || "https://www.cleenzo.co.in";
export const SITE_OG_IMAGE = `${SITE_URL}/images/hero-commercial.svg`;

export const SEO = {
  siteName: "Cleenzo",
  title:
    "Cleenzo | Laundry & Dry Cleaning in Raj Nagar, Ghaziabad — Free Pickup & Express Delivery",
  description:
    "Cleenzo offers premium laundry, dry cleaning, sofa & carpet cleaning in Raj Nagar Extn, Ghaziabad (201017). Free doorstep pickup, express delivery & fabric-safe care. Book on WhatsApp or download the app.",
  keywords: [
    "laundry service Raj Nagar Ghaziabad",
    "dry cleaning Ghaziabad",
    "laundry near me Raj Nagar",
    "dry clean near AVS City Square",
    "express laundry delivery Ghaziabad",
    "sofa cleaning Raj Nagar",
    "carpet cleaning Ghaziabad",
    "steam iron service Ghaziabad",
    "Cleenzo laundry",
    "free pickup laundry Ghaziabad",
  ].join(", "),
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/",
};

export const SEO_COMMERCIAL = {
  siteName: "Cleenzo",
  title: "Commercial Laundry Solutions | Cleenzo B2B — Ghaziabad",
  description:
    "Cleenzo commercial laundry for hotels, restaurants, salons, PGs, clinics and offices in Ghaziabad. Dedicated processing, scheduled pickup & delivery, monthly billing.",
  keywords: [
    "commercial laundry Ghaziabad",
    "hotel linen laundry service",
    "restaurant laundry Raj Nagar",
    "B2B laundry Ghaziabad",
    "bulk laundry pickup delivery",
    "Cleenzo commercial",
  ].join(", "),
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/commercial-laundry",
};

export const SEO_NOT_FOUND = {
  siteName: "Cleenzo",
  title: "Page not found | Cleenzo",
  description:
    "The page you are looking for does not exist. Visit Cleenzo for laundry and dry cleaning in Raj Nagar, Ghaziabad.",
  locale: "en_IN",
  twitterCard: "summary",
  robots: "noindex, follow",
};

export const SEO_FAQ = [
  {
    question: "Where is Cleenzo laundry located in Ghaziabad?",
    answer: `Cleenzo is at ${STORE_ADDRESS}, inside AVS City Square at Raj Nagar Extension. Pin code 201017.`,
  },
  {
    question: "Does Cleenzo offer free pickup and delivery?",
    answer:
      "Yes. Cleenzo provides free doorstep pickup and express delivery on laundry and dry cleaning orders across Raj Nagar and nearby areas in Ghaziabad.",
  },
  {
    question: "What services does Cleenzo provide?",
    answer:
      "Cleenzo offers everyday laundry, premium dry cleaning, sofa and carpet cleaning, steam ironing, shoe and bag cleaning, and specialist care for suits, sarees, kurtas, and delicate fabrics.",
  },
  {
    question: "How can I book a laundry pickup with Cleenzo?",
    answer: `Book via WhatsApp at ${PHONE_DISPLAY}, use the schedule pickup form on our website, or download the Cleenzo app for faster booking and order tracking.`,
  },
];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    name: "Cleenzo",
    description: SEO.description,
    url: SITE_URL,
    telephone: PHONE_TEL,
    image: SITE_OG_IMAGE,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE_ADDRESS_LINES.slice(0, 2).join(", "),
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      postalCode: "201017",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6722,
      longitude: 77.4121,
    },
    areaServed: {
      "@type": "City",
      name: "Ghaziabad",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    sameAs: [`https://wa.me/919711924411`, ...SOCIAL_LINKS.map((s) => s.href)],
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SEO_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
