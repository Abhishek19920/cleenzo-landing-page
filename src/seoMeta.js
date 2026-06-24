import {
  SEO,
  SEO_ABOUT,
  SEO_COMMERCIAL,
  SEO_NOT_FOUND,
  SITE_OG_IMAGE,
  SITE_URL,
  getBreadcrumbJsonLd,
  getCommercialJsonLd,
  getFaqJsonLd,
  getLocalBusinessJsonLd,
  getPageFaqJsonLd,
  getServicePageJsonLd,
  getWebSiteJsonLd,
} from "./seo";
import { getServicePageByPath } from "./data/servicePages";

export function upsertMeta(name, content, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function upsertJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }

  let el = existing;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function applyPageMeta({
  title,
  description,
  keywords,
  url,
  image = SITE_OG_IMAGE,
  locale = SEO.locale,
  siteName = SEO.siteName,
  robots = "index, follow",
  twitterCard = SEO.twitterCard,
  jsonLd = [],
}) {
  document.documentElement.lang = locale.split("_")[0];
  document.title = title;

  upsertMeta("description", description);
  if (keywords) upsertMeta("keywords", keywords);
  upsertMeta("robots", robots);
  upsertMeta("author", siteName);
  upsertMeta("geo.region", "IN-UP");
  upsertMeta("geo.placename", "Ghaziabad");
  upsertMeta("ICBM", "28.6722, 77.4121");

  upsertMeta("og:title", title, true);
  upsertMeta("og:description", description, true);
  upsertMeta("og:type", "website", true);
  upsertMeta("og:site_name", siteName, true);
  upsertMeta("og:locale", locale, true);
  upsertMeta("og:url", url, true);
  upsertMeta("og:image", image, true);
  upsertMeta("og:image:width", "1200", true);
  upsertMeta("og:image:height", "630", true);
  upsertMeta("og:image:alt", `${siteName} — laundry & dry cleaning in Ghaziabad`, true);

  upsertMeta("twitter:card", twitterCard);
  upsertMeta("twitter:title", title);
  upsertMeta("twitter:description", description);
  upsertMeta("twitter:image", image);

  upsertLink("canonical", url);

  upsertJsonLd("cleenzo-local-business-jsonld", jsonLd.find((j) => j.id === "local")?.data ?? null);
  upsertJsonLd("cleenzo-faq-jsonld", jsonLd.find((j) => j.id === "faq")?.data ?? null);
  upsertJsonLd("cleenzo-website-jsonld", jsonLd.find((j) => j.id === "website")?.data ?? null);
  upsertJsonLd("cleenzo-commercial-jsonld", jsonLd.find((j) => j.id === "commercial")?.data ?? null);
  upsertJsonLd("cleenzo-service-jsonld", jsonLd.find((j) => j.id === "service")?.data ?? null);
  upsertJsonLd("cleenzo-breadcrumb-jsonld", jsonLd.find((j) => j.id === "breadcrumb")?.data ?? null);
}

function buildServicePageMeta(page) {
  const url = `${SITE_URL}${page.path}`;
  const jsonLd = [
    { id: "local", data: getLocalBusinessJsonLd() },
    { id: "service", data: getServicePageJsonLd(page) },
    {
      id: "breadcrumb",
      data: getBreadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: page.serviceType, url },
      ]),
    },
  ];
  const faqLd = getPageFaqJsonLd(page.faqs);
  if (faqLd) jsonLd.push({ id: "faq", data: faqLd });

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    url,
    jsonLd,
  };
}

export function getMetaForPathname(pathname) {
  if (pathname === SEO.path) {
    return {
      ...SEO,
      url: SITE_URL,
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        { id: "faq", data: getFaqJsonLd() },
        { id: "website", data: getWebSiteJsonLd() },
      ],
    };
  }

  if (pathname === SEO_COMMERCIAL.path) {
    return {
      ...SEO_COMMERCIAL,
      url: `${SITE_URL}${SEO_COMMERCIAL.path}`,
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        { id: "commercial", data: getCommercialJsonLd() },
        {
          id: "breadcrumb",
          data: getBreadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Commercial Laundry", url: `${SITE_URL}${SEO_COMMERCIAL.path}` },
          ]),
        },
      ],
    };
  }

  if (pathname === SEO_ABOUT.path) {
    return {
      ...SEO_ABOUT,
      url: `${SITE_URL}${SEO_ABOUT.path}`,
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        {
          id: "breadcrumb",
          data: getBreadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "About Cleenzo", url: `${SITE_URL}${SEO_ABOUT.path}` },
          ]),
        },
      ],
    };
  }

  const servicePage = getServicePageByPath(pathname);
  if (servicePage) {
    return buildServicePageMeta(servicePage);
  }

  return {
    ...SEO_NOT_FOUND,
    url: `${SITE_URL}${pathname}`,
    jsonLd: [],
  };
}
