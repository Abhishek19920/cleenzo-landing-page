import siteData from "./site-data.json";

export const SITE_CANONICAL_ORIGIN = siteData.siteUrl;
export const SITE_NAME = siteData.siteName;
export const SITE_LOCALE = siteData.locale;
export const DEFAULT_OG_IMAGE_PATH = siteData.defaultOgImagePath;
export const BUSINESS_GEO = siteData.geo;
export const BUSINESS_HOURS = siteData.openingHours;
export const LOCAL_BUSINESS_ID = siteData.localBusinessId;
export const WEBSITE_ID = siteData.websiteId;

/** @see site-data.json — confirm with Google Business Profile */
export const SEO_DATA_TODOS = {
  coordinates: siteData.geo._note,
  openingHours: siteData.openingHours._note,
};
