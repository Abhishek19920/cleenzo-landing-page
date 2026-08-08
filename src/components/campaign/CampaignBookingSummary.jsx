import { useEffect, useState } from "react";
import { previewCampaignPricing } from "../../api/campaign";
import { isFreedomSaleActive } from "../../utils/freedomCampaign";

/**
 * Illustrative ₹1,000 eligible order estimate from backend when API + catalog IDs are configured.
 * Set REACT_APP_CAMPAIGN_DEMO_LINE in env as JSON for live amounts; otherwise shows labels only.
 */
export default function CampaignBookingSummary() {
  const [pricing, setPricing] = useState(null);
  const active = isFreedomSaleActive();

  useEffect(() => {
    if (!active || !process.env.REACT_APP_CLEENZO_API_URL) return undefined;
    let raw = process.env.REACT_APP_CAMPAIGN_DEMO_LINE;
    if (!raw) return undefined;
    let lineItems;
    try {
      lineItems = JSON.parse(raw);
    } catch {
      return undefined;
    }
    let cancelled = false;
    void previewCampaignPricing(lineItems)
      .then((data) => {
        if (!cancelled && data?.pricing) setPricing(data.pricing);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="rounded-2xl border border-cleenzo-sky-light/60 bg-cleenzo-pale-bg/80 p-4 text-sm text-slate-800"
      aria-live="polite"
    >
      <p className="font-black text-cleenzo-deep">Freedom &amp; Rakhi Sale</p>
      <p className="font-semibold text-emerald-700 mt-1">40% OFF Applied</p>
      {pricing ? (
        <dl className="mt-3 space-y-1 font-medium">
          <div className="flex justify-between gap-4">
            <dt>Subtotal</dt>
            <dd>₹{pricing.subtotal?.toFixed(2)}</dd>
          </div>
          {pricing.campaignDiscountAmount > 0 ? (
            <div className="flex justify-between gap-4 text-emerald-800">
              <dt>Freedom &amp; Rakhi Sale (40%)</dt>
              <dd>−₹{pricing.campaignDiscountAmount?.toFixed(2)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4 border-t border-slate-200 pt-2 font-black">
            <dt>Payable</dt>
            <dd>₹{pricing.payable?.toFixed(2)}</dd>
          </div>
          {pricing.cleenzoCreditEarned > 0 ? (
            <>
              <div className="flex justify-between gap-4 text-cleenzo-deep">
                <dt>Cleenzo Credit Earned</dt>
                <dd>₹{pricing.cleenzoCreditEarned?.toFixed(2)}</dd>
              </div>
              <p className="text-xs text-slate-600 pt-1">
                Available after the campaign period. Wallet cannot be used on this promotional order.
              </p>
            </>
          ) : null}
        </dl>
      ) : (
        <p className="text-xs text-slate-600 mt-2">
          Campaign pricing is calculated on our system when your order is placed — 40% off eligible items plus
          locked Cleenzo Credit after discount.
        </p>
      )}
    </div>
  );
}
