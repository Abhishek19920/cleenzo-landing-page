import { PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS, STORE_ADDRESS, STORE_ADDRESS_LINES, WHATSAPP_NUMBER } from "./constants";
import { GOOGLE_RATING, GOOGLE_REVIEWS_SCHEMA, GOOGLE_REVIEWS_URL, GOOGLE_BUSINESS_NAME } from "./data/googleReviews";

export const SITE_URL = process.env.REACT_APP_SITE_URL || "https://www.cleenzo.co.in";
export const SITE_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

/** Canonical page URL — trailing slash matches nginx folder routes & sitemap. */
export function canonicalUrl(path = "/") {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export const SERVICE_AREAS = [
  "Raj Nagar Extension",
  "AVS City Square",
  "Ghaziabad",
  "Noida Extension",
  "Wave City",
  "Crossings Republik",
  "Govindpuram",
  "Morta",
  "Kavi Nagar",
  "Vaishali",
  "Indirapuram",
];

export const SEO = {
  siteName: "Cleenzo",
  title:
    "Best Laundry & Dry Cleaning Near Me in Raj Nagar Extension | Free Pickup | Cleenzo",
  description:
    "Laundry service near me & dry clean near me in Raj Nagar Extension? Cleenzo — free pickup laundry, 24 hour dry cleaning options, wash & fold from ₹99/kg. Ghaziabad · Wave City · Crossings Republik. Book WhatsApp.",
  keywords: [
    "laundry service near me",
    "dry clean near me",
    "dry cleaners raj nagar extension",
    "best laundry service",
    "dry cleaning ghaziabad",
    "raj nagar extension laundry",
    "24 hour dry cleaning",
    "free pickup laundry",
    "cleenzo",
    "cleanzo dry cleaners",
    "dry cleaners near me",
    "laundry ghaziabad",
  ].join(", "),
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/",
};

export const SEO_COMMERCIAL = {
  siteName: "Cleenzo",
  title:
    "Best Commercial Laundry in Ghaziabad | Hotels, Restaurants & Hospitals | Cleenzo",
  description:
    "Commercial laundry near me in Ghaziabad? Cleenzo — hotels, restaurants, hospitals & hostels. Bulk capacity, GST billing, free pickup routes across Raj Nagar Extension & Noida Extension. Get a quote.",
  keywords: [
    "commercial laundry Ghaziabad",
    "hotel laundry service Ghaziabad",
    "restaurant laundry Raj Nagar",
    "hospital linen laundry",
    "hostel laundry service",
    "B2B laundry Ghaziabad",
    "bulk laundry pickup delivery",
    "Cleenzo commercial",
  ].join(", "),
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/commercial-laundry",
};

export const SEO_ABOUT = {
  siteName: "Cleenzo",
  title: "About Cleenzo | Best Laundry & Dry Cleaners in Raj Nagar Extension",
  description:
    "Meet Cleenzo — dry cleaners & best laundry service in Raj Nagar Extension. German chemicals, barcode tracking, free pickup laundry across Ghaziabad, Wave City & Crossings Republik.",
  keywords:
    "about Cleenzo, cleenzo dry cleaners, cleanzo dry cleaners, best laundry service raj nagar, dry cleaners raj nagar extension",
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/about",
};

export const SEO_BLOG = {
  siteName: "Cleenzo",
  title: "Cleenzo Blog | Laundry Tips, Dry Cleaning & Fabric Care Ghaziabad",
  description:
    "Practical guides from Cleenzo — spot cleaning, stain removal, dry cleaning Ghaziabad tips and laundry service near me advice for Raj Nagar Extension families.",
  keywords:
    "Cleenzo blog, laundry tips ghaziabad, dry cleaning tips, fabric care raj nagar, stain removal",
  locale: "en_IN",
  twitterCard: "summary_large_image",
  path: "/blog",
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
    question: "Where can I find laundry service near me in Raj Nagar Extension?",
    answer: `Cleenzo is at ${STORE_ADDRESS}. Book free pickup laundry across Raj Nagar Extension, Ghaziabad, Wave City, Crossings Republik, Govindpuram, Morta, Kavi Nagar and Noida Extension.`,
  },
  {
    question: "Do you offer dry clean near me pickup?",
    answer:
      "Yes. Cleenzo provides free doorstep pickup for dry cleaning Ghaziabad orders — suits, sarees, blazers and more — with optional 24 hour dry cleaning when available.",
  },
  {
    question: "Does Cleenzo offer free pickup and delivery?",
    answer:
      "Yes. Free pickup laundry and dry cleaning across our service areas. Free delivery applies on orders above ₹480.",
  },
  {
    question: "Is Cleenzo the same as Cleanzo dry cleaners?",
    answer:
      "Our brand is Cleenzo (often searched as cleanzo dry cleaners). We are the laundry and dry cleaners at AVS City Square, Raj Nagar Extension.",
  },
  {
    question: "What services does Cleenzo provide?",
    answer:
      "Best laundry service options (wash & fold, wash & iron), premium dry cleaning, shoe, sofa, carpet and curtain cleaning, plus commercial laundry for businesses.",
  },
  {
    question: "How can I book a pickup with Cleenzo?",
    answer: `WhatsApp or call ${PHONE_DISPLAY}, or use Book Pickup on cleenzo.co.in. Share your address in Raj Nagar Extension or nearby Ghaziabad.`,
  },
  {
    question: "Which areas does Cleenzo serve?",
    answer:
      "Raj Nagar Extension, Ghaziabad, Noida Extension, Wave City, Crossings Republik, Govindpuram, Morta, Kavi Nagar, Vaishali, Indirapuram and AVS City Square.",
  },
  {
    question: "Do you offer 24 hour dry cleaning?",
    answer:
      "Express and 24 hour dry cleaning options are available depending on garment type and load — confirm when you book.",
  },
];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DryCleaningOrLaundry", "LaundryService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Cleenzo",
    alternateName: ["Cleenzo Laundry and Dry clean hub", "Cleanzo Dry Cleaners"],
    description:
      "Best laundry service and dry cleaners in Raj Nagar Extension, Ghaziabad — free pickup laundry, dry clean near me, 24 hour dry cleaning options. Serving Wave City, Crossings Republik, Govindpuram, Morta, Kavi Nagar and Noida Extension.",
    url: SITE_URL,
    telephone: PHONE_TEL,
    image: [SITE_OG_IMAGE, `${SITE_URL}/images/cleenzo-logo.png`],
    logo: `${SITE_URL}/images/cleenzo-logo.png`,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Card",
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
      latitude: 28.7035856,
      longitude: 77.4311244,
    },
    hasMap: GOOGLE_REVIEWS_URL,
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
      opens: "09:30",
      closes: "21:00",
    },
    sameAs: [
      GOOGLE_REVIEWS_URL,
      `https://wa.me/${WHATSAPP_NUMBER}`,
      ...SOCIAL_LINKS.map((s) => s.href),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(GOOGLE_RATING.value),
      reviewCount: String(Math.max(GOOGLE_RATING.count, GOOGLE_REVIEWS_SCHEMA.length)),
      bestRating: "5",
      worstRating: "1",
    },
    review: GOOGLE_REVIEWS_SCHEMA.map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.author },
      datePublished: item.datePublished,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(item.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: item.text,
    })),
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
    url: canonicalUrl(SEO_COMMERCIAL.path),
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
    url: canonicalUrl(page.path),
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

export function getGoogleReviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: GOOGLE_BUSINESS_NAME,
    url: GOOGLE_REVIEWS_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(GOOGLE_RATING.value),
      reviewCount: String(GOOGLE_REVIEWS_SCHEMA.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: GOOGLE_REVIEWS_SCHEMA.map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.author },
      datePublished: item.datePublished,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(item.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: item.text,
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

export function getArticleJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.heroImage}`,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: {
      "@type": "Organization",
      name: "Cleenzo",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Cleenzo",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/cleenzo-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl(post.path),
    },
  };
}
