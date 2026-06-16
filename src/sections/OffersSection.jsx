import { OFFERS } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function OffersSection() {
  const offers = OFFERS;
  return (
    <section id="offers" className="bg-white border-y border-slate-200 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="text-center mb-10 md:mb-12 max-w-4xl mx-auto">
          <p className="text-cleenzo font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
            {offers.badge}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.12] tracking-tight text-slate-900">
            {offers.headline}
            <span className="block text-cleenzo mt-1">{offers.headlineAccent}</span>
          </h2>

          <p className="text-slate-500 font-medium text-base sm:text-lg mt-4 italic">
            {offers.tagline}
          </p>

          <div className="mt-6 inline-block bg-cleenzo-deep text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-3 rounded-lg tracking-wide">
            {offers.promoStrip}
          </div>

          <p className="text-slate-600 mt-6 text-sm sm:text-base leading-relaxed">
            {offers.subtext}
          </p>

          <p className="text-cleenzo-dark font-bold text-sm sm:text-base mt-3 uppercase tracking-wide">
            {offers.qualityLine}
          </p>
        </div>

        <div className="max-w-sm mx-auto mb-8 md:mb-10">
          <div className="border-2 border-cleenzo rounded-2xl p-6 sm:p-8 text-center bg-cleenzo-pale/60">
            <p className="text-xs font-bold uppercase tracking-widest text-cleenzo mb-2">
              {offers.featured.label}
            </p>
            <p className="text-4xl mb-2" aria-hidden="true">
              {offers.featured.icon}
            </p>
            <p className="text-xl font-black text-slate-900">{offers.featured.title}</p>
            <p className="text-5xl font-black text-cleenzo mt-1 leading-none">
              {offers.featured.price}
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-2">{offers.featured.note}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-10">
          {offers.perks.map((perk) => (
            <span
              key={perk}
              className="text-xs sm:text-sm font-semibold bg-cleenzo-pale border border-cleenzo-sky-light rounded-full px-3 sm:px-4 py-2 text-cleenzo-dark"
            >
              ✓ {perk}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 md:mb-10">
          {offers.items.map((offer) => (
            <div
              key={offer.title}
              className={`rounded-xl p-4 sm:p-5 border transition hover:shadow-md ${
                offer.highlight
                  ? "bg-cleenzo border-cleenzo text-white shadow-lg"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
                  {offer.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-black text-base sm:text-lg leading-tight">{offer.title}</p>
                  <p
                    className={`font-bold mt-1 text-sm ${
                      offer.highlight ? "text-cleenzo-sky" : "text-cleenzo"
                    }`}
                  >
                    {offer.price}
                  </p>
                  {offer.desc && (
                    <p
                      className={`text-xs sm:text-sm mt-1.5 leading-snug ${
                        offer.highlight ? "text-cleenzo-sky/90" : "text-slate-500"
                      }`}
                    >
                      {offer.desc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cleenzo-pale border border-cleenzo-sky-light rounded-2xl p-5 sm:p-6 md:p-8">
          <p className="text-center text-xs sm:text-sm font-bold uppercase tracking-widest text-cleenzo-dark/70 mb-4 sm:mb-5">
            More reasons to choose Cleenzo
          </p>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {offers.benefits.map((item) => (
              <li
                key={item.text}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-2 font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-3 text-center sm:text-left text-xs sm:text-sm"
              >
                <span className="text-lg shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-slate-400 text-[11px] sm:text-xs mt-5">{offers.terms}</p>
        </div>
      </div>

      <PlaceOrderCTA title="To place your order — book now" variant="white" />
    </section>
  );
}

export default OffersSection;
