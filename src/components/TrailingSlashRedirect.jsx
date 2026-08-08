import { Navigate, useLocation } from "react-router-dom";

/**
 * Canonical URLs use a trailing slash (sitemap, static HTML, JSON-LD).
 * Normalize client-side navigations so /about and /about/ stay consistent.
 */
export default function TrailingSlashRedirect() {
  const { pathname, search, hash } = useLocation();

  if (pathname.length > 1 && !pathname.endsWith("/")) {
    return <Navigate to={`${pathname}/${search}${hash}`} replace />;
  }

  return null;
}
