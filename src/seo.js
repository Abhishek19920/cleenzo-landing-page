import {
  PHONE_DISPLAY,
  PHONE_TEL,
  SOCIAL_LINKS,
  STORE_ADDRESS,
  STORE_ADDRESS_LINES,
  WHATSAPP_NUMBER,
} from "./constants";

export const SITE_URL = process.env.REACT_APP_SITE_URL || "https://www.cleenzo.co.in";
export const SITE_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

export const SERVICE_AREAS = [
  "Raj Nagar Extension",
  "AVS City Square",
  "Vaishali",
  "Indirapuram",
  "Kaushambi",
  "Crossings Republik",
  "Sahibabad",
  "Vasundhara",
  "Noida Extension",
  "Delhi NCR",
];

export const SEO = {
  siteName: "Cleenzo",
  title:
    "Cleenzo | Laundry & Dry Cleaning in Raj Nagar, Ghaziabad — Free Pickup & Express Delivery",
  description:
    "Cleenzo offers premium laundry, dry cleaning, sofa & carpet cleaning in Raj Nagar Extn, Ghaziabad (201017). Free doorstep pickup, express delivery & fabric-safe care. Serving Vaishali, Indirapuram & Delhi NCR. Book on WhatsApp.",
  keywords: [
    "laundry service Raj Nagar Ghaziabad",
    "dry cleaning Ghaziabad",
    "laundry near me Raj Nagar",
    "dry clean near AVS City Square",
    "express laundry delivery Ghaziabad",
    "laundry service Vaishali Ghaziabad",
    "dry cleaning Indirapuram",
    "laundry pickup Vaishali",
    "dry cleaning Kaushambi",
    "laundry service Delhi NCR",
    "sofa cleaning Raj Nagar",
    "carpet cleaning Ghaziabad",
    "steam iron service Ghaziabad",
    "Cleenzo laundry",
    "free pickup laundry Ghaziabad",
    "best laundry service Ghaziabad",
    "wash and fold Raj Nagar",
  ].join(", "),
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/",
};

export const SEO_COMMERCIAL = {
  siteName: "Cleenzo",
  title: "Commercial Laundry Solutions | Cleenzo B2B — Hotels, Restaurants & Offices Ghaziabad",
  description:
    "Cleenzo commercial laundry for hotels, restaurants, salons, PGs, clinics and offices in Ghaziabad & Delhi NCR. Dedicated processing, scheduled pickup & delivery, monthly billing.",
  keywords: [
    "commercial laundry Ghaziabad",
    "hotel linen laundry service Ghaziabad",
    "restaurant laundry Raj Nagar",
    "B2B laundry Ghaziabad",
    "bulk laundry pickup delivery",
    "commercial dry cleaning Delhi NCR",
    "Cleenzo commercial",
    "institutional laundry service",
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
      "Yes. Cleenzo provides free doorstep pickup and express delivery on laundry and dry cleaning orders across Raj Nagar, Vaishali, Indirapuram, Kaushambi and nearby areas in Ghaziabad and Delhi NCR.",
  },
  {
    question: "What services does Cleenzo provide?",
    answer:
      "Cleenzo offers everyday laundry, premium dry cleaning, sofa and carpet cleaning, steam ironing, shoe and bag cleaning, and specialist care for suits, sarees, kurtas, and delicate fabrics.",
  },
  {
    question: "How can I book a laundry pickup with Cleenzo?",
    answer: `Book via WhatsApp at ${PHONE_DISPLAY}, call ${PHONE_DISPLAY}, use the schedule pickup form on our website, or download the Cleenzo app for faster booking and order tracking.`,
  },
  {
    question: "Which areas does Cleenzo serve near Ghaziabad?",
    answer: `Cleenzo serves Raj Nagar Extension, AVS City Square, Vaishali, Indirapuram, Kaushambi, Crossings Republik, Sahibabad, Vasundhara, Noida Extension and surrounding Delhi NCR neighbourhoods with free pickup and delivery.`,
  },
];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Cleenzo",
    description: SEO.description,
    url: SITE_URL,
    telephone: PHONE_TEL,
    image: [SITE_OG_IMAGE, `${SITE_URL}/images/cleenzo-logo.png`],
    logo: `${SITE_URL}/images/cleenzo-logo.png`,
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
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "Place",
      name,
    })),
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
    sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`, ...SOCIAL_LINKS.map((s) => s.href)],
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

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Cleenzo",
    url: SITE_URL,
    description: SEO.description,
    publisher: { "@id": `${SITE_URL}/#localbusiness` },
    inLanguage: "en-IN",
  };
}

export function getCommercialJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cleenzo Commercial Laundry",
    description: SEO_COMMERCIAL.description,
    url: `${SITE_URL}${SEO_COMMERCIAL.path}`,
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "Place",
      name,
    })),
    serviceType: [
      "Commercial laundry",
      "Hotel linen service",
      "Restaurant laundry",
      "Institutional dry cleaning",
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
    },
  };
}
