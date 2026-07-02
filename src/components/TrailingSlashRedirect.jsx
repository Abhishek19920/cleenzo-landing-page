import { Navigate, useLocation } from "react-router-dom";

/**
 * Nginx serves folder routes with a trailing slash (e.g. /laundry-service-ghaziabad/).
 * React Router paths are registered without it — normalize on load to avoid 404.
 */
export default function TrailingSlashRedirect() {
  const { pathname, search, hash } = useLocation();

  if (pathname.length > 1 && pathname.endsWith("/")) {
    return <Navigate to={`${pathname.slice(0, -1)}${search}${hash}`} replace />;
  }

  return null;
}
