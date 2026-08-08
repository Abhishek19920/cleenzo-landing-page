/**
 * Build sitemap.xml from authoritative route list (canonical www + trailing slash).
 */
const fs = require("fs");
const path = require("path");
const site = require("../src/seo/site-data.json");

function pageUrl(routePath) {
  if (routePath === "/") return `${site.siteUrl}/`;
  return `${site.siteUrl}${routePath.endsWith("/") ? routePath : `${routePath}/`}`;
}

function generateSitemap(buildDir, routes) {
  const urls = routes
    .filter((r) => r.indexable !== false)
    .map((r) => pageUrl(r.path));

  const body = urls
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`)
    .join("\n\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${body}

</urlset>
`;

  fs.writeFileSync(path.join(buildDir, "sitemap.xml"), xml, "utf8");
}

module.exports = { generateSitemap, pageUrl };
