import { useEffect, useState } from "react";
import {
  MONTHLY_GROWTH_STATS,
  NEARBY_SERVICE_AREAS,
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS,
} from "../constants";
import { fetchStoreMilestone } from "../api/milestone";
import { GOOGLE_REVIEWS_URL } from "../data/googleReviews";
import { useSchedulePickup } from "../context/SchedulePickupContext";

function formatStat(n) {
  return n.toLocaleString("en-IN");
}

function LocalTrustSection() {
  const { openSchedulePickup } = useSchedulePickup();
  const { returning, newCustomers, eyebrow, headline, subline } = MONTHLY_GROWTH_STATS;
  const [live, setLive] = useState(null);

  useEffect(() => {
    let cancelled = false;
    void fetchStoreMilestone()
      .then((payload) => {
        if (cancelled || !payload) return;
        const month = payload.last30Days;
        setLive({
          returning: Number(month?.returningCustomers ?? 0),
          newCustomers: Number(month?.newCustomers ?? 0),
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const returningValue = live ? live.returning : returning.value;
  const newValue = live ? live.newCustomers : newCustomers.value;

  return (
    <section
      className="bg-white border-b border-slate-200"
      aria-labelledby="local-trust-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-14">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center">
          <div>
            <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.22em] mb-3">
              Serving Raj Nagar Extension &amp; nearby
            </p>
            <h2
              id="local-trust-heading"
              className="text-2xl md:text-4xl font-black text-slate-950 leading-tight"
            >
              Free pickup &amp; delivery where you live
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Cleenzo now serves homes around <strong>Raj Nagar Extension</strong> including{" "}
              <strong>Sidharth Vihar</strong>, <strong>Kanawani</strong>,{" "}
              <strong>Ahinsa Khand</strong>, <strong>Indirapuram</strong> and{" "}
              <strong>Vaishali</strong>. Visit us at <strong>{STORE_ADDRESS}</strong>, or book a
              doorstep pickup for laundry, dry clean, steam iron and home textile care.
            </p>

            <ul
              className="mt-5 flex flex-wrap gap-2"
              aria-label="Neighbourhoods we serve near Raj Nagar Extension"
            >
              {NEARBY_SERVICE_AREAS.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-cleenzo/20 bg-cleenzo-pale px-3.5 py-1.5 text-xs font-bold text-cleenzo-deep"
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={openSchedulePickup}
                className="site-cta-book inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold shadow-sm transition"
              >
                Book free pickup
              </button>
              <a
                href={`tel:${PHONE_TEL}`}
                className="site-cta-call inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Prefer to read first?{" "}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cleenzo underline-offset-2 hover:underline"
              >
                Google reviews
              </a>
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-cleenzo/15 bg-gradient-to-br from-cleenzo-deep via-[#003d82] to-[#0b1f3a] p-6 sm:p-8 text-white shadow-xl">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
              aria-hidden
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky-200/90">
              {eyebrow}
            </p>
            <h3 className="mt-3 text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight">
              {headline}
            </h3>
            <p className="mt-3 text-sm text-sky-100 leading-relaxed max-w-md">{subline}</p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-emerald-400/15 border border-emerald-300/25 p-4">
                <p className="text-3xl sm:text-4xl font-black tabular-nums leading-none text-emerald-200">
                  {formatStat(returningValue)}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-100">
                  {returning.label}
                </p>
                <p className="mt-1 text-[11px] text-emerald-100/70 leading-snug">
                  {returning.detail}
                </p>
              </div>
              <div className="rounded-2xl bg-amber-400/15 border border-amber-300/25 p-4">
                <p className="text-3xl sm:text-4xl font-black tabular-nums leading-none text-amber-100">
                  {formatStat(newValue)}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-amber-100">
                  {newCustomers.label}
                </p>
                <p className="mt-1 text-[11px] text-amber-100/70 leading-snug">
                  {newCustomers.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocalTrustSection;
