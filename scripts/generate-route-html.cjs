/**
 * After CRA build, generate per-route index.html files with unique meta tags.
 * Fixes SPA SEO: Google was seeing homepage canonical on every URL.
 */
const fs = require("fs");
const path = require("path");
const { SITE_URL, ROUTES } = require("./route-seo-data.cjs");

const BUILD_DIR = path.join(__dirname, "..", "build");
const ROOT_INDEX = path.join(BUILD_DIR, "index.html");

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/laundry-service-ghaziabad", label: "Laundry" },
  { href: "/dry-cleaning-ghaziabad", label: "Dry cleaning" },
  { href: "/shoe-cleaning", label: "Shoe cleaning" },
  { href: "/sofa-cleaning", label: "Sofa cleaning" },
  { href: "/carpet-cleaning", label: "Carpet cleaning" },
  { href: "/commercial-laundry", label: "Commercial B2B" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageUrl(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

function buildPrerenderBlock(route) {
  const nav = NAV_LINKS.map(
    (link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`,
  ).join(" · ");

  return `<div class="seo-prerender" aria-hidden="true">
      <main>
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
    </div>`;
}

function buildNoscriptBlock(route) {
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
        <p>Contact: <a href="tel:+919999225311">+91 99992 25311</a></p>
      </main>
    </noscript>`;
}

function applyRouteMeta(html, route) {
  const url = pageUrl(route.path);
  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);

  out = out.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${escapeHtml(route.description)}$2`,
  );

  if (route.keywords) {
    out = out.replace(
      /(<meta\s+name="keywords"\s+content=")[^"]*(")/,
      `$1${escapeHtml(route.keywords)}$2`,
    );
  }

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

  out = out.replace(/<div class="seo-prerender"[\s\S]*?<\/div>/, buildPrerenderBlock(route));
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
    const html = applyRouteMeta(baseHtml, route);

    if (route.path === "/") {
      fs.writeFileSync(ROOT_INDEX, html, "utf8");
      continue;
    }

    const routeDir = path.join(BUILD_DIR, route.path.slice(1));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf8");
  }

  console.log(`Generated static HTML for ${ROUTES.length} routes.`);
}

main();
