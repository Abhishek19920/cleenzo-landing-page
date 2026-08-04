import { useEffect, useState } from "react";

import { fetchWebsitePricing } from "../api/pricing";
import { GHAZIABAD_PRICING } from "../data/ghaziabadPricing";

/**
 * Live pricing from Cleenzo backend when REACT_APP_CLEENZO_API_URL is set.
 * Falls back to bundled ghaziabadPricing.js for offline builds.
 */
export function useWebsitePricing() {
  const [pricing, setPricing] = useState(GHAZIABAD_PRICING);
  const [loading, setLoading] = useState(Boolean(process.env.REACT_APP_CLEENZO_API_URL));
  const [source, setSource] = useState("bundled");

  useEffect(() => {
    let cancelled = false;

    if (!process.env.REACT_APP_CLEENZO_API_URL) {
      setLoading(false);
      return undefined;
    }

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
