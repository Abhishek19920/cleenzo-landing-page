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
];

export const SEO = {
  siteName: "Cleenzo",
  title:
    "Cleenzo | Laundry & Dry Cleaning in Raj Nagar, Ghaziabad — Free Pickup & Express Delivery",
  description:
    "Cleenzo offers premium laundry, dry cleaning, sofa & carpet cleaning in Raj Nagar Extn, Ghaziabad (201017). Free doorstep pickup, express delivery & fabric-safe care. Serving AVS City Square, Vaishali & Indirapuram. Book on WhatsApp.",
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
  title:
    "Commercial Laundry Services for Hotels, Restaurants & Hospitals | Cleenzo Ghaziabad",
  description:
    "Cleenzo commercial laundry for hotels, restaurants, cafes, hospitals, hostels, salons & gyms in Ghaziabad. Bulk capacity, monthly contracts, pickup & delivery, GST billing & quality control.",
  keywords: [
    "commercial laundry Ghaziabad",
    "hotel laundry service Ghaziabad",
    "restaurant laundry Raj Nagar",
    "hospital linen laundry",
    "hostel laundry service",
    "gym towel laundry",
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

export const SEO_ABOUT = {
  siteName: "Cleenzo",
  title: "About Cleenzo | Modern Laundry Brand in Raj Nagar, Ghaziabad",
  description:
    "Learn about Cleenzo — a modern laundry brand in Ghaziabad using German chemicals, professional machines, trained staff and 100% quality checks. Serving Raj Nagar Extension, AVS City Square, Vaishali & Indirapuram.",
  keywords:
    "about Cleenzo, Cleenzo laundry Ghaziabad, modern laundry brand Raj Nagar, professional laundry service",
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/about",
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
      "Yes. Cleenzo provides free doorstep pickup and express delivery on laundry and dry cleaning orders across Raj Nagar Extension, AVS City Square, Vaishali and Indirapuram.",
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
    answer: `Cleenzo serves Raj Nagar Extension, AVS City Square, Vaishali and Indirapuram with free pickup and delivery.`,
  },
];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DryCleaningOrLaundry"],
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
    name: "Commercial Laundry Services for Hotels, Restaurants & Hospitals",
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
      "Hospital laundry",
      "Hostel laundry",
      "Salon towel service",
      "Gym laundry",
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
    },
  };
}

export function getServicePageJsonLd(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.seo.description,
    url: `${SITE_URL}${page.path}`,
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "Place",
      name,
    })),
    serviceType: page.serviceType,
  };
}

export function getPageFaqJsonLd(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
