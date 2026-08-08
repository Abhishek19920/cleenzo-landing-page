/**
 * After CRA build: per-route index.html, sitemap, static JSON-LD.
 * Strategy: route-specific title/description/canonical/OG in HTML;
 * noscript fallback for users without JS (not clipped/hidden SEO blocks).
 * React hydrates #root — no duplicate visible H1 in initial DOM for JS users.
 */
const fs = require("fs");
const path = require("path");
const { SITE_URL, ROUTES } = require("./route-seo-data.cjs");
const { buildJsonLdScripts } = require("./seo/schema-static.cjs");
const { generateSitemap } = require("./generate-sitemap.cjs");

const BUILD_DIR = path.join(__dirname, "..", "build");
const ROOT_INDEX = path.join(BUILD_DIR, "index.html");

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/laundry-service-ghaziabad/", label: "Laundry" },
  { href: "/dry-cleaners-raj-nagar-extension/", label: "Dry cleaners RNE" },
  { href: "/dry-cleaning-ghaziabad/", label: "Dry cleaning" },
  { href: "/shoe-cleaning/", label: "Shoe cleaning" },
  { href: "/sofa-cleaning/", label: "Sofa cleaning" },
  { href: "/carpet-cleaning/", label: "Carpet cleaning" },
  { href: "/commercial-laundry/", label: "Commercial B2B" },
  { href: "/about/", label: "About" },
  { href: "/blog/", label: "Blog" },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageUrl(routePath) {
  if (routePath === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${routePath.endsWith("/") ? routePath : `${routePath}/`}`;
}

function buildNoscriptBlock(route) {
  const nav = NAV_LINKS.map(
    (link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`,
  ).join(" · ");

  return `<noscript>
      <main
        style="
          max-width: 42rem;
          margin: 2rem auto;
          padding: 0 1rem;
          font-family: system-ui, sans-serif;
          color: #1e293b;
          line-height: 1.6;
        "
      >
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.intro)}</p>
        <p>
          <strong>Address:</strong> LGF-19, AVS City Square, Raj Nagar Extn,
          Ghaziabad — 201017
        </p>
        <p>
          <strong>Phone:</strong>
          <a href="tel:+919999225311">+91 99992 25311</a>
        </p>
        <nav aria-label="Primary">${nav}</nav>
      </main>
    </noscript>`;
}

function stripLegacySeo(html) {
  let out = html;
  out = out.replace(/<meta\s+name="keywords"[^>]*>\s*/gi, "");
  out = out.replace(/<div class="seo-prerender"[\s\S]*?<\/div>\s*/i, "");
  out = out.replace(/<style>[\s\S]*?\.seo-prerender[\s\S]*?<\/style>\s*/i, "");
  out = out.replace(
    /<script type="application\/ld\+json" id="cleenzo-[^"]+"[\s\S]*?<\/script>\s*/gi,
    "",
  );
  return out;
}

function applyRouteMeta(html, route) {
  const url = pageUrl(route.path);
  let out = stripLegacySeo(html);

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);

  out = out.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${escapeHtml(route.description)}$2`,
  );

  out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);
  out = out.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`);
  out = out.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${escapeHtml(route.title)}$2`,
  );
  out = out.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${escapeHtml(route.description)}$2`,
  );
  out = out.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    `$1${escapeHtml(route.title)}$2`,
  );
  out = out.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${escapeHtml(route.description)}$2`,
  );

  out = out.replace(
    /(<meta\s+name="ICBM"\s+content=")[^"]*(")/,
    `$1${require("./seo/schema-static.cjs").site.geo.latitude}, ${require("./seo/schema-static.cjs").site.geo.longitude}$2`,
  );

  const jsonLd = buildJsonLdScripts(route, url);
  out = out.replace("</head>", `    ${jsonLd}\n  </head>`);

  out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, buildNoscriptBlock(route));

  return out;
}

function main() {
  if (!fs.existsSync(ROOT_INDEX)) {
    console.error("build/index.html not found. Run npm run build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(ROOT_INDEX, "utf8");

  for (const route of ROUTES) {
    if (route.indexable === false) continue;
    const html = applyRouteMeta(baseHtml, route);

    if (route.path === "/") {
      fs.writeFileSync(ROOT_INDEX, html, "utf8");
      continue;
    }

    const routeDir = path.join(BUILD_DIR, route.path.slice(1));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf8");
  }

  generateSitemap(BUILD_DIR, ROUTES);
  const sitemapXml = fs.readFileSync(path.join(BUILD_DIR, "sitemap.xml"), "utf8");
  fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), sitemapXml, "utf8");
  console.log(`Generated static HTML for ${ROUTES.length} routes.`);
}

main();
