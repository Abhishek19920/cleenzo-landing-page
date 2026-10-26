import {
  NEARBY_SERVICE_AREAS,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../constants";
import { useSchedulePickup } from "../context/SchedulePickupContext";

const PICKUP_POINTS = [
  { label: "Free pickup", detail: "We collect from your home" },
  { label: "Free delivery", detail: "Clothes come back to your door" },
  { label: "Express return", detail: "Most orders in 12–48 hours" },
];

function LocalTrustSection() {
  const { openSchedulePickup } = useSchedulePickup();

  return (
    <section
      className="bg-white border-b border-slate-200"
      aria-labelledby="local-trust-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-5 lg:gap-12 items-center">
          <div>
            <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.22em] mb-2">
              Serving Raj Nagar Extension &amp; nearby
            </p>
            <h2
              id="local-trust-heading"
              className="text-2xl md:text-4xl font-black text-slate-950 leading-tight"
            >
              Free pickup &amp; delivery where you live
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base">
              Cleenzo picks up and returns laundry, dry clean, steam iron and home textiles
              around <strong>Raj Nagar Extension</strong>, including{" "}
              <strong>Sidharth Vihar</strong>, <strong>Kanawani</strong>,{" "}
              <strong>Ahinsa Khand</strong>, <strong>Indirapuram</strong> and{" "}
              <strong>Vaishali</strong>.
            </p>

            <ul
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Neighbourhoods we serve near Raj Nagar Extension"
            >
              {NEARBY_SERVICE_AREAS.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-cleenzo/20 bg-cleenzo-pale px-3 py-1 text-xs font-bold text-cleenzo-deep"
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2.5">
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
          </div>

          <div className="rounded-2xl border border-cleenzo/15 bg-gradient-to-br from-cleenzo-deep via-[#003d82] to-[#0b1f3a] p-4 sm:p-6 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-200/90">
              At your door
            </p>
            <h3 className="mt-2 text-xl sm:text-2xl font-black leading-tight">
              We come to your home
            </h3>
            <ul className="mt-4 grid gap-2">
              {PICKUP_POINTS.map((point) => (
                <li
                  key={point.label}
                  className="rounded-xl bg-white/10 border border-white/10 px-3 py-2.5"
                >
                  <p className="text-sm font-bold">{point.label}</p>
                  <p className="text-xs text-sky-100 mt-0.5">{point.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocalTrustSection;
