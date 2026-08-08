/**
 * Local `npm start` shows full campaign UI for design/QA.
 * Production builds always use IST date gates only (no env flags).
 */
export function isLocalFullCampaignUi() {
  return process.env.NODE_ENV === "development";
}
