/**
 * Production static server for cleenzo.co.in build/
 *
 * - Serves prerendered build/<route>/index.html for canonical trailing-slash URLs
 * - 301: /path → /path/ for prerender routes
 * - 301: www host → apex https://cleenzo.co.in
 * - Serves build/static/* and other files as-is
 * - SPA fallback ONLY for /order/* and /invoice/* (token tracking)
 * - Unknown paths → real HTTP 404 with build/404.html (no soft-404 homepage shell)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const PORT = Number(process.env.PORT || process.env.WEBSITE_PORT || 3003);
const HOST = process.env.HOST || "0.0.0.0";
const APEX_HOST = "cleenzo.co.in";
const SITE_ORIGIN = `https://${APEX_HOST}`;

const { routes } = require("../src/seo/routes.json");

const PRERENDER_PATHS = new Set(
  routes
    .filter((r) => r.indexable !== false && r.path !== "/")
    .map((r) => r.path.replace(/\/$/, "") || r.path),
);

const SPA_PREFIXES = ["/order/", "/invoice/"];

/** Path → absolute path on apex (trailing slash for pages). */
const LEGACY_REDIRECTS = {
  "/laundry-service-raj-nagar-extension": "/laundry-service-ghaziabad/",
  "/laundry-service-raj-nagar-extension/": "/laundry-service-ghaziabad/",
  "/shoe-cleaning-ghaziabad": "/shoe-cleaning/",
  "/shoe-cleaning-ghaziabad/": "/shoe-cleaning/",
  "/commercial-laundry-ghaziabad": "/commercial-laundry/",
  "/commercial-laundry-ghaziabad/": "/commercial-laundry/",
  "/indirapuram": "/laundry-dry-cleaning-indirapuram/",
  "/indirapuram/": "/laundry-dry-cleaning-indirapuram/",
  "/vaishali": "/laundry-dry-cleaning-vaishali/",
  "/vaishali/": "/laundry-dry-cleaning-vaishali/",
  "/noida-extension": "/laundry-dry-cleaning-noida-extension/",
  "/noida-extension/": "/laundry-dry-cleaning-noida-extension/",
  "/greater-noida-west": "/laundry-dry-cleaning-noida-extension/",
  "/greater-noida-west/": "/laundry-dry-cleaning-noida-extension/",
  "/steam-ironing": "/laundry-service-ghaziabad/",
  "/steam-ironing/": "/laundry-service-ghaziabad/",
  "/pricing": "/#pricing",
  "/pricing/": "/#pricing",
};

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

function normalizeHost(hostHeader) {
  return String(hostHeader || "")
    .split(":")[0]
    .toLowerCase();
}

function isSpaPath(pathname) {
  return SPA_PREFIXES.some(
    (prefix) => pathname === prefix.slice(0, -1) || pathname.startsWith(prefix),
  );
}

function prerenderIndexPath(pathname) {
  const normalized =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;
  if (!PRERENDER_PATHS.has(normalized)) return null;
  const file = path.join(BUILD_DIR, normalized.replace(/^\//, ""), "index.html");
  return fs.existsSync(file) ? file : null;
}

function resolveStaticFile(pathname) {
  if (pathname === "/" || pathname === "") {
    return { file: path.join(BUILD_DIR, "index.html"), status: 200 };
  }

  const prerender = prerenderIndexPath(pathname);
  if (prerender) return { file: prerender, status: 200 };

  const relative = pathname.replace(/^\//, "").replace(/\/$/, "");
  const direct = path.join(BUILD_DIR, relative);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
    return { file: direct, status: 200 };
  }

  // SPA client routes (order tracking) — allow root shell
  if (isSpaPath(pathname)) {
    return { file: path.join(BUILD_DIR, "index.html"), status: 200 };
  }

  // Real 404 — never serve homepage meta as a soft-404
  const notFound = path.join(BUILD_DIR, "404.html");
  if (fs.existsSync(notFound)) {
    return { file: notFound, status: 404 };
  }
  return { file: null, status: 404 };
}

function shouldRedirectToTrailingSlash(pathname) {
  if (pathname === "/" || pathname.endsWith("/")) return false;
  if (PRERENDER_PATHS.has(pathname)) return true;
  const nestedIndex = path.join(
    BUILD_DIR,
    pathname.replace(/^\//, ""),
    "index.html",
  );
  return fs.existsSync(nestedIndex);
}

function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  res.statusCode = statusCode;
  res.setHeader("Content-Type", CONTENT_TYPES[ext] || "application/octet-stream");
  res.setHeader(
    "Cache-Control",
    ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  );
  fs.createReadStream(filePath).pipe(res);
}

function redirect(res, location) {
  res.statusCode = 301;
  res.setHeader("Location", location);
  res.end();
}

const server = http.createServer((req, res) => {
  try {
    const host = req.headers.host || `127.0.0.1:${PORT}`;
    const hostname = normalizeHost(host);
    const url = new URL(req.url || "/", `http://${host}`);
    const pathname = decodeURIComponent(url.pathname);

    if (req.method !== "GET" && req.method !== "HEAD") {
      res.statusCode = 405;
      res.end();
      return;
    }

    // www → apex (canonical host)
    if (hostname === `www.${APEX_HOST}`) {
      redirect(res, `${SITE_ORIGIN}${pathname}${url.search}`);
      return;
    }

    if (Object.prototype.hasOwnProperty.call(LEGACY_REDIRECTS, pathname)) {
      redirect(res, `${SITE_ORIGIN}${LEGACY_REDIRECTS[pathname]}${url.search}`);
      return;
    }

    if (shouldRedirectToTrailingSlash(pathname)) {
      const absolute =
        hostname === APEX_HOST || hostname.endsWith(`.${APEX_HOST}`)
          ? `${SITE_ORIGIN}${pathname}/${url.search}`
          : `${pathname}/${url.search}`;
      redirect(res, absolute);
      return;
    }

    const { file: filePath, status } = resolveStaticFile(pathname);

    if (!filePath || !fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not Found");
      return;
    }

    if (req.method === "HEAD") {
      res.statusCode = status;
      res.end();
      return;
    }

    sendFile(res, filePath, status);
  } catch (err) {
    console.error("serve-production error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`cleenzo serve-production: ${BUILD_DIR} → http://${HOST}:${PORT}`);
  console.log(`Prerender routes: ${PRERENDER_PATHS.size}`);
});
