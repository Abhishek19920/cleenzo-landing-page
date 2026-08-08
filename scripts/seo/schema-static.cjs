/**
 * JSON-LD for postbuild static HTML (non-executing crawlers / social).
 * Runtime React uses src/seo.js — keep facts aligned with site-data.json.
 */
const site = require("../../src/seo/site-data.json");

function localBusinessBlock() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DryCleaningOrLaundry"],
    "@id": site.localBusinessId,
    name: site.siteName,
    url: `${site.siteUrl}/`,
    telephone: site.phoneTel,
    image: [`${site.siteUrl}${site.defaultOgImagePath}`],
    logo: `${site.siteUrl}/images/cleenzo-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "LGF-19, AVS City Square, Raj Nagar Extn",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      postalCode: "201017",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
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
      opens: site.openingHours.opens,
      closes: site.openingHours.closes,
    },
  };
}

function webSiteBlock() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": site.websiteId,
    name: site.siteName,
    url: `${site.siteUrl}/`,
    publisher: { "@id": site.localBusinessId },
    inLanguage: "en-IN",
  };
}

function webPageBlock(route, url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    isPartOf: { "@id": site.websiteId },
    about: { "@id": site.localBusinessId },
    inLanguage: "en-IN",
  };
}

function buildJsonLdScripts(route, pageUrl) {
  const blocks = [webPageBlock(route, pageUrl)];
  if (route.path === "/") {
    blocks.unshift(localBusinessBlock(), webSiteBlock());
  }
  return blocks
    .map(
      (data, i) =>
        `<script type="application/ld+json" id="cleenzo-static-jsonld-${i}">${JSON.stringify(data)}</script>`,
    )
    .join("\n    ");
}

module.exports = { buildJsonLdScripts, site };
