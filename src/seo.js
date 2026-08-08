import {
  SITE_CANONICAL_ORIGIN,
  SITE_NAME,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE_PATH,
  BUSINESS_GEO,
  BUSINESS_HOURS,
  LOCAL_BUSINESS_ID,
  WEBSITE_ID,
} from "./seo/business";
import { getStaticRouteSeo } from "./seo/routes";
import { PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS, STORE_ADDRESS, STORE_ADDRESS_LINES, WHATSAPP_NUMBER } from "./constants";
import { GOOGLE_RATING, GOOGLE_REVIEWS_SCHEMA, GOOGLE_REVIEWS_URL, GOOGLE_BUSINESS_NAME } from "./data/googleReviews";

export const SITE_URL = process.env.REACT_APP_SITE_URL || SITE_CANONICAL_ORIGIN;
export const SITE_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

function metaFromRoute(path, twitterCard = "summary_large_image") {
  const route = getStaticRouteSeo(path);
  if (!route) {
    return {
      siteName: SITE_NAME,
      title: "Cleenzo",
      description: "",
      locale: SITE_LOCALE,
      twitterCard,
      path,
    };
  }
  return {
    siteName: SITE_NAME,
    title: route.title,
    description: route.description,
    locale: SITE_LOCALE,
    twitterCard,
    path: route.path,
  };
}

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

export const SEO = metaFromRoute("/");

export const SEO_COMMERCIAL = metaFromRoute("/commercial-laundry");

export const SEO_ABOUT = metaFromRoute("/about");

export const SEO_BLOG = metaFromRoute("/blog");

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
    question: "Where is Cleenzo located in Raj Nagar Extension?",
    answer: `Cleenzo is at ${STORE_ADDRESS}, inside AVS City Square at Raj Nagar Extension, Ghaziabad.`,
  },
  {
    question: "Do you provide laundry pickup in Raj Nagar Extension?",
    answer:
      "Yes. Cleenzo offers free doorstep pickup and delivery for laundry and dry cleaning across Raj Nagar Extension, AVS City Square, Vaishali, Indirapuram and nearby Ghaziabad areas.",
  },
  {
    question: "Do you provide pickup and delivery?",
    answer:
      "Yes. Free pickup is available in our service areas. Free delivery applies on orders above ₹480 — confirm details when you book.",
  },
  {
    question: "How quickly can Cleenzo dry clean a suit?",
    answer:
      "Turnaround depends on garment type and load. Express and 24-hour dry cleaning options are often available — share your deadline when you book on WhatsApp or via Book Pickup.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "Raj Nagar Extension, AVS City Square, Ghaziabad, Noida Extension, Wave City, Crossings Republik, Govindpuram, Morta, Kavi Nagar, Vaishali and Indirapuram.",
  },
  {
    question: "How can I book a pickup with Cleenzo?",
    answer: `WhatsApp or call ${PHONE_DISPLAY}, or use Book Pickup on cleenzo.co.in with your address and service needs.`,
  },
  {
    question: "What services does Cleenzo provide?",
    answer:
      "Wash & fold, wash & iron, premium dry cleaning, shoe, sofa, carpet and curtain cleaning, plus commercial laundry for businesses.",
  },
];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DryCleaningOrLaundry", "LaundryService"],
    "@id": LOCAL_BUSINESS_ID,
    name: "Cleenzo",
    alternateName: ["Cleenzo Laundry and Dry clean hub"],
    description:
      "Cleenzo offers laundry, dry cleaning, shoe, sofa, carpet and curtain cleaning in Raj Nagar Extension, Ghaziabad with free pickup and express delivery.",
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
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
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
      opens: BUSINESS_HOURS.opens,
      closes: BUSINESS_HOURS.closes,
    },
    sameAs: [
      GOOGLE_REVIEWS_URL,
      `https://wa.me/${WHATSAPP_NUMBER}`,
      ...SOCIAL_LINKS.map((s) => s.href),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(GOOGLE_RATING.value),
      reviewCount: String(GOOGLE_RATING.count),
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
    "@id": WEBSITE_ID,
    name: "Cleenzo",
    url: SITE_URL,
    description: SEO.description,
    publisher: { "@id": LOCAL_BUSINESS_ID },
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
    provider: { "@id": LOCAL_BUSINESS_ID },
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
    provider: { "@id": LOCAL_BUSINESS_ID },
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
