import { useEffect } from "react";
import { SITE_URL } from "../seo";

const TITLE = "Commercial Laundry Solutions | Cleenzo B2B";
const DESCRIPTION =
  "Cleenzo commercial laundry solutions for hotels, restaurants, salons, PGs, clinics and offices in Ghaziabad. Dedicated processing, scheduled pickup & delivery, monthly billing.";

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

function CommercialPageSEO() {
  useEffect(() => {
    const url = `${SITE_URL}/commercial-laundry`;

    document.title = TITLE;
    upsertMeta("description", DESCRIPTION);
    upsertMeta("robots", "index, follow");
    upsertMeta("og:title", TITLE, true);
    upsertMeta("og:description", DESCRIPTION, true);
    upsertMeta("og:type", "website", true);
    upsertMeta("og:url", url, true);
    upsertMeta("twitter:title", TITLE);
    upsertMeta("twitter:description", DESCRIPTION);
    upsertLink("canonical", url);

    return () => {
      document.title =
        "Cleenzo | Laundry & Dry Cleaning in Raj Nagar, Ghaziabad — Free Pickup & Express Delivery";
    };
  }, []);

  return null;
}

export default CommercialPageSEO;
