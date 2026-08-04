import {
  SEO,
  SEO_ABOUT,
  SEO_BLOG,
  SEO_COMMERCIAL,
  SEO_NOT_FOUND,
  SITE_OG_IMAGE,
  SITE_URL,
  canonicalUrl,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getCommercialJsonLd,
  getFaqJsonLd,
  getGoogleReviewsJsonLd,
  getLocalBusinessJsonLd,
  getPageFaqJsonLd,
  getServicePageJsonLd,
  getWebSiteJsonLd,
} from "./seo";
import { getBlogPostByPath } from "./data/blogPosts";
import {
  DRY_CLEANERS_RNE_CONTENT,
  DRY_CLEANERS_RNE_PATH,
  DRY_CLEANERS_RNE_SEO,
} from "./data/dryCleanersRajNagarExtension";
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
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  twitterCard = SEO.twitterCard,
  ogType = "website",
  jsonLd = [],
}) {
  document.documentElement.lang = locale.split("_")[0];
  document.title = title;

  upsertMeta("description", description);
  if (keywords) upsertMeta("keywords", keywords);
  upsertMeta("robots", robots);
  upsertMeta("author", siteName);
  upsertMeta("geo.region", "IN-UP");
  upsertMeta("geo.placename", "Ghaziabad, Raj Nagar Extension");
  upsertMeta("ICBM", "28.7035856, 77.4311244");

  upsertMeta("og:title", title, true);
  upsertMeta("og:description", description, true);
  upsertMeta("og:type", ogType, true);
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
  upsertJsonLd("cleenzo-article-jsonld", jsonLd.find((j) => j.id === "article")?.data ?? null);
  upsertJsonLd("cleenzo-reviews-jsonld", jsonLd.find((j) => j.id === "reviews")?.data ?? null);
}

function buildBlogPostMeta(post) {
  const url = canonicalUrl(post.path);
  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    url,
    image: `${SITE_URL}${post.heroImage}`,
    ogType: "article",
    jsonLd: [
      { id: "local", data: getLocalBusinessJsonLd() },
      { id: "article", data: getArticleJsonLd(post) },
      {
        id: "breadcrumb",
        data: getBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Blog", url: canonicalUrl(SEO_BLOG.path) },
          { name: post.title, url },
        ]),
      },
    ],
  };
}

function buildServicePageMeta(page) {
  const url = canonicalUrl(page.path);
  const jsonLd = [
    { id: "local", data: getLocalBusinessJsonLd() },
    { id: "service", data: getServicePageJsonLd(page) },
    {
      id: "breadcrumb",
      data: getBreadcrumbJsonLd([
        { name: "Home", url: canonicalUrl("/") },
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
  if (pathname === SEO.path || pathname === "/") {
    return {
      ...SEO,
      url: canonicalUrl("/"),
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        { id: "faq", data: getFaqJsonLd() },
        { id: "website", data: getWebSiteJsonLd() },
        { id: "reviews", data: getGoogleReviewsJsonLd() },
      ],
    };
  }

  if (pathname === SEO_COMMERCIAL.path) {
    return {
      ...SEO_COMMERCIAL,
      url: canonicalUrl(SEO_COMMERCIAL.path),
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        { id: "commercial", data: getCommercialJsonLd() },
        {
          id: "breadcrumb",
          data: getBreadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "Commercial Laundry", url: canonicalUrl(SEO_COMMERCIAL.path) },
          ]),
        },
      ],
    };
  }

  if (pathname === SEO_ABOUT.path) {
    return {
      ...SEO_ABOUT,
      url: canonicalUrl(SEO_ABOUT.path),
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        {
          id: "breadcrumb",
          data: getBreadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "About Cleenzo", url: canonicalUrl(SEO_ABOUT.path) },
          ]),
        },
      ],
    };
  }

  if (pathname === SEO_BLOG.path) {
    return {
      ...SEO_BLOG,
      url: canonicalUrl(SEO_BLOG.path),
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        {
          id: "breadcrumb",
          data: getBreadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "Blog", url: canonicalUrl(SEO_BLOG.path) },
          ]),
        },
      ],
    };
  }

  const blogPost = getBlogPostByPath(pathname);
  if (blogPost) {
    return buildBlogPostMeta(blogPost);
  }

  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  if (normalizedPath === DRY_CLEANERS_RNE_PATH) {
    const url = canonicalUrl(DRY_CLEANERS_RNE_PATH);
    const ogImage = `${SITE_URL}${DRY_CLEANERS_RNE_SEO.ogImage}`;
    return {
      ...DRY_CLEANERS_RNE_SEO,
      url,
      image: ogImage,
      jsonLd: [
        { id: "local", data: getLocalBusinessJsonLd() },
        { id: "faq", data: getPageFaqJsonLd(DRY_CLEANERS_RNE_CONTENT.faqs) },
        {
          id: "breadcrumb",
          data: getBreadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "Dry Cleaning", url: canonicalUrl("/dry-cleaning-ghaziabad") },
            { name: "Dry Cleaners Raj Nagar Extension", url },
          ]),
        },
        { id: "reviews", data: getGoogleReviewsJsonLd() },
      ],
    };
  }

  const servicePage = getServicePageByPath(pathname);
  if (servicePage) {
    return buildServicePageMeta(servicePage);
  }

  return {
    ...SEO_NOT_FOUND,
    url: canonicalUrl(pathname),
    jsonLd: [],
  };
}
