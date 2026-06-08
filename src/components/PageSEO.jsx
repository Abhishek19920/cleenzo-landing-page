import { useEffect } from "react";
import { SEO, SITE_URL, getFaqJsonLd, getLocalBusinessJsonLd } from "../seo";

function upsertMeta(name, content, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function PageSEO() {
  useEffect(() => {
    document.documentElement.lang = SEO.locale.split("_")[0];

    document.title = SEO.title;
    upsertMeta("description", SEO.description);
    upsertMeta("keywords", SEO.keywords);
    upsertMeta("robots", "index, follow");
    upsertMeta("author", SEO.siteName);
    upsertMeta("geo.region", "IN-UP");
    upsertMeta("geo.placename", "Ghaziabad");
    upsertMeta("ICBM", "28.6722, 77.4121");

    upsertMeta("og:title", SEO.title, true);
    upsertMeta("og:description", SEO.description, true);
    upsertMeta("og:type", "website", true);
    upsertMeta("og:site_name", SEO.siteName, true);
    upsertMeta("og:locale", SEO.locale, true);
    upsertMeta("og:url", SITE_URL, true);

    upsertMeta("twitter:card", SEO.twitterCard);
    upsertMeta("twitter:title", SEO.title);
    upsertMeta("twitter:description", SEO.description);

    upsertLink("canonical", SITE_URL);

    upsertJsonLd("cleenzo-local-business-jsonld", getLocalBusinessJsonLd());
    upsertJsonLd("cleenzo-faq-jsonld", getFaqJsonLd());
  }, []);

  return null;
}

export default PageSEO;
