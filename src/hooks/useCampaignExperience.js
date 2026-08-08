import { useEffect, useState } from "react";
import { fetchCampaignState } from "../api/campaign";
import {
  getHomepageCampaignPhase,
  isFreedomSaleActive,
  isUniformSpecialActive,
} from "../utils/freedomCampaign";
import { isLocalFullCampaignUi } from "../utils/campaignUiVisibility";

/**
 * Campaign UI state — uses backend when API is configured, else local IST dates.
 */
export function useCampaignExperience() {
  const [remote, setRemote] = useState(null);
  const [loading, setLoading] = useState(Boolean(process.env.REACT_APP_CLEENZO_API_URL));

  useEffect(() => {
    let cancelled = false;
    if (!process.env.REACT_APP_CLEENZO_API_URL) {
      setLoading(false);
      return undefined;
    }
    void fetchCampaignState()
      .then((data) => {
        if (!cancelled && data) setRemote(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const phase = remote?.phase ?? getHomepageCampaignPhase();
  const devUi = isLocalFullCampaignUi();
  const freedomActive =
    devUi || (remote?.freedom?.active ?? isFreedomSaleActive());
  const uniformActive =
    devUi || (remote?.uniform?.active ?? isUniformSpecialActive());
  const credit = remote?.credit ?? {
    percent: 10,
    messaging: {
      headline: "Get 40% OFF + earn 10% Cleenzo Credit",
      subline: "Your Cleenzo Credit becomes redeemable after the campaign ends.",
    },
    availableFromYmd: "2026-08-30",
  };
  const noida = remote?.noidaExtension ?? {
    launchActive: true,
    headline: "NOW SERVING NOIDA EXTENSION",
    subline: "Premium Laundry & Dry Cleaning at Your Doorstep",
  };

  return {
    loading,
    phase,
    freedomActive,
    uniformActive,
    credit,
    noida,
    showCampaign: freedomActive,
    showUniformBlock: uniformActive,
  };
}
