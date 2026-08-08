/**
 * Post-build SEO checks on generated static HTML + sitemap.
 */
const fs = require("fs");
const path = require("path");
const { ROUTES, SITE_URL } = require("./route-seo-data.cjs");

const BUILD = path.join(__dirname, "..", "build");
const errors = [];
const warnings = [];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function assert(cond, msg) {
  if (!cond) errors.push(msg);
}

function pagePath(routePath) {
  if (routePath === "/") return path.join(BUILD, "index.html");
  return path.join(BUILD, routePath.slice(1), "index.html");
}

function checkHtml(file, route) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing static HTML: ${file}`);
    return;
  }
  const html = read(file);
  assert(/<title>[^<]+<\/title>/.test(html), `Missing title: ${route.path}`);
  assert(/name="description"/.test(html), `Missing description: ${route.path}`);
  assert(/rel="canonical"/.test(html), `Missing canonical: ${route.path}`);
  assert(!/name="keywords"/i.test(html), `Meta keywords present: ${route.path}`);
  assert(!/seo-prerender/.test(html), `Hidden seo-prerender block: ${route.path}`);
  assert(!/localhost|127\.0\.0\.1/.test(html), `Localhost URL in ${route.path}`);
  assert(!/http:\/\/cleenzo\.co\.in/.test(html), `Non-HTTPS apex in ${route.path}`);

  const canon = html.match(/rel="canonical"\s+href="([^"]+)"/);
  if (canon) {
    assert(
      canon[1].startsWith(SITE_URL),
      `Canonical host mismatch: ${route.path} → ${canon[1]} (expected ${SITE_URL})`,
    );
  }
}

function main() {
  for (const route of ROUTES.filter((r) => r.indexable !== false)) {
    checkHtml(pagePath(route.path), route);
  }

  const sitemapPath = path.join(BUILD, "sitemap.xml");
  assert(fs.existsSync(sitemapPath), "Missing build/sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    const sm = read(sitemapPath);
    for (const route of ROUTES.filter((r) => r.indexable !== false)) {
      const loc =
        route.path === "/"
          ? `${SITE_URL}/`
          : `${SITE_URL}${route.path.endsWith("/") ? route.path : `${route.path}/`}`;
      assert(sm.includes(loc), `Sitemap missing ${loc}`);
    }
    assert(!/<lastmod>/.test(sm), "Sitemap should not use stale/fake lastmod");
  }

  if (warnings.length) {
    console.warn("SEO validate warnings:\n", warnings.join("\n"));
  }
  if (errors.length) {
    console.error("SEO validate FAILED:\n", errors.join("\n"));
    process.exit(1);
  }
  console.log(`SEO validate OK (${ROUTES.length} routes).`);
}

main();
