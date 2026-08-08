import siteData from "./site-data.json";
import routeData from "./routes.json";

export { siteData };
export const STATIC_SEO_ROUTES = routeData.routes;

export function getStaticRouteSeo(path = "/") {
  const normalized =
    !path || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path.replace(/\/$/, "") || "/"
        : `/${path}`.replace(/\/$/, "") || "/";
  return STATIC_SEO_ROUTES.find((r) => r.path === normalized);
}

export function canonicalPath(path = "/") {
  if (!path || path === "/") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

/** Compare paths regardless of trailing slash (for nav active states). */
export function normalizePathKey(path = "/") {
  if (!path || path === "/") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.replace(/\/$/, "") || "/";
}
