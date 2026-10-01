/**
 * Opt-in local campaign preview for design/QA.
 * Production builds always use IST date gates only.
 *
 * Default `npm start` follows the same calendar as live (so expired
 * Freedom/Rakhi hero copy is not shown in September).
 * Set REACT_APP_CAMPAIGN_PREVIEW=1 to force every dated campaign on.
 */
export function isLocalFullCampaignUi() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_CAMPAIGN_PREVIEW === "1"
  );
}
