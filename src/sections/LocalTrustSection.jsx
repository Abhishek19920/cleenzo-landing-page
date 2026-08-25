import { LOCAL_TRUST_STATS, PHONE_DISPLAY, PHONE_TEL, STORE_ADDRESS } from "../constants";
import { GOOGLE_REVIEWS_URL } from "../data/googleReviews";

const LOCAL_KEYWORDS = [
  "Laundry service in Raj Nagar Extension",
  "Dry cleaners near AVS City Square",
  "Shoe cleaning in Ghaziabad",
  "Sofa and carpet cleaning at home",
  "Steam iron and wash by kg",
  "Free pickup and delivery laundry",
];

function LocalTrustSection() {
  return (
    <section className="bg-white border-b border-slate-200" aria-labelledby="local-trust-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-14">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center">
          <div>
            <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.22em] mb-3">
              Raj Nagar Extension laundry experts
            </p>
            <h2
              id="local-trust-heading"
              className="text-2xl md:text-4xl font-black text-slate-950 leading-tight"
            >
              Professional laundry, dry cleaning and doorstep garment care near you
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Cleenzo is built for busy families, professionals and premium garment owners who want
              clean clothes without store visits. Visit us at <strong>{STORE_ADDRESS}</strong>, or
              schedule pickup for wash and fold, wash and iron, dry cleaning, shoe cleaning, sofa
              cleaning, carpet cleaning and curtain cleaning.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-full bg-cleenzo px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-cleenzo-dark transition"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-cleenzo/25 bg-cleenzo-pale px-6 py-3 text-sm font-bold text-cleenzo hover:border-cleenzo transition"
              >
                View Google profile
              </a>
            </div>
          </div>

          <div>
            <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {LOCAL_TRUST_STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <p className="text-3xl md:text-4xl font-black text-cleenzo leading-none">
                    {stat.value}
                  </p>
                  <h3 className="mt-3 font-bold text-slate-950">{stat.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{stat.detail}</p>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2" aria-label="Popular Cleenzo searches">
              {LOCAL_KEYWORDS.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-cleenzo-sky-light bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocalTrustSection;
