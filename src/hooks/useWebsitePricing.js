import { useEffect, useState } from "react";

import { fetchWebsitePricing, getCleenzoApiBase } from "../api/pricing";
import { GHAZIABAD_PRICING } from "../data/ghaziabadPricing";

/**
 * Live pricing from Cleenzo ERP catalog via GET /public/website/pricing.
 * Falls back to bundled ghaziabadPricing.js when the API is unreachable.
 */
export function useWebsitePricing() {
  const apiBase = getCleenzoApiBase();
  const [pricing, setPricing] = useState(GHAZIABAD_PRICING);
  const [loading, setLoading] = useState(Boolean(apiBase));
  const [source, setSource] = useState("bundled");

  useEffect(() => {
    let cancelled = false;
    const base = getCleenzoApiBase();

    if (!base) {
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    void fetchWebsitePricing()
      .then((data) => {
        if (cancelled || !data) return;
        setPricing(data);
        setSource("api");
      })
      .catch(() => {
        if (!cancelled) setSource("bundled");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { pricing, loading, source };
}
