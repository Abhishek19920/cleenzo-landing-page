export const GOOGLE_ADS_ID = "AW-18378385588";
export const GOOGLE_ADS_CONTACT_CONVERSION = "AW-18378385588/t-43CNSFqt4cELTRv7tE";

const CONTACT_CONVERSION_SESSION_KEY = "cleenzo_gads_contact_conversion";

/** Google Ads “Contact” conversion — once per browser session. */
export function reportGoogleAdsContactConversion() {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(CONTACT_CONVERSION_SESSION_KEY)) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", { send_to: GOOGLE_ADS_CONTACT_CONVERSION });
  sessionStorage.setItem(CONTACT_CONVERSION_SESSION_KEY, "1");
}
