import { useEffect } from "react";
import { applyPageMeta, getMetaForPathname } from "../seoMeta";

function PageSEO({ pathname = "/" }) {
  useEffect(() => {
    const meta = getMetaForPathname(pathname);
    applyPageMeta(meta);
  }, [pathname]);

  return null;
}

export default PageSEO;
