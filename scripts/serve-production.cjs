/**
 * Production static server for cleenzo.co.in build/
 *
 * - Serves prerendered build/<route>/index.html for canonical trailing-slash URLs
 * - 301: /path → /path/ for prerender routes
 * - Serves build/static/* and other files as-is
 * - Falls back to /index.html for unknown paths (React client router / 404 UI)
 *
 * Do NOT use `serve -s` — SPA mode returns root index.html for all deep URLs.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const PORT = Number(process.env.PORT || process.env.WEBSITE_PORT || 3003);
const HOST = process.env.HOST || "0.0.0.0";

const { routes } = require("../src/seo/routes.json");

const PRERENDER_PATHS = new Set(
  routes
    .filter((r) => r.indexable !== false && r.path !== "/")
    .map((r) => r.path.replace(/\/$/, "") || r.path),
);

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
    return path.join(BUILD_DIR, "index.html");
  }

  const prerender = prerenderIndexPath(pathname);
  if (prerender) return prerender;

  const relative = pathname.replace(/^\//, "").replace(/\/$/, "");
  const direct = path.join(BUILD_DIR, relative);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;

  const nestedIndex = path.join(BUILD_DIR, relative, "index.html");
  if (fs.existsSync(nestedIndex)) return nestedIndex;

  return path.join(BUILD_DIR, "index.html");
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
  res.setHeader("Cache-Control", ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable");
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  try {
    const host = req.headers.host || `127.0.0.1:${PORT}`;
    const url = new URL(req.url || "/", `http://${host}`);
    const pathname = decodeURIComponent(url.pathname);

    if (req.method !== "GET" && req.method !== "HEAD") {
      res.statusCode = 405;
      res.end();
      return;
    }

    if (shouldRedirectToTrailingSlash(pathname)) {
      res.statusCode = 301;
      // Prefer apex host even if request arrived via www / local proxy
      const locHost = String(host).toLowerCase().startsWith("www.")
        ? "cleenzo.co.in"
        : host.replace(/:\d+$/, "") === "127.0.0.1" || host.startsWith("localhost")
          ? host
          : host.replace(/^www\./i, "");
      const proto =
        req.headers["x-forwarded-proto"] === "http" ? "https" : "https";
      const absolute =
        locHost.includes("cleenzo.co.in")
          ? `${proto}://cleenzo.co.in${pathname}/${url.search}`
          : `${pathname}/${url.search}`;
      res.setHeader("Location", absolute);
      res.end();
      return;
    }

    const filePath = resolveStaticFile(pathname);
    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    if (req.method === "HEAD") {
      res.statusCode = 200;
      res.end();
      return;
    }

    sendFile(res, filePath);
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
