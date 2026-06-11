import { OFFERS } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function OffersSection() {
  return (
    <section id="offers" className="bg-gradient-to-br from-slate-900 via-teal-950 to-cyan-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 bg-cyan-400/15 border border-cyan-400/30 text-cyan-200 uppercase tracking-widest font-bold text-xs md:text-sm px-4 py-2 rounded-full mb-4">
            <span aria-hidden="true">🎉</span>
            {OFFERS.badge}
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">{OFFERS.headline}</h2>
          <p className="text-cyan-300 font-semibold text-lg md:text-xl mt-3 italic">
            {OFFERS.tagline}
          </p>
          <p className="text-slate-300 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            {OFFERS.subtext}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
          {OFFERS.items.map((offer, index) => {
            const isTeal = offer.highlight || index % 2 === 0;

            return (
              <div
                key={offer.title}
                className={`rounded-2xl p-5 md:p-6 border transition hover:scale-[1.02] hover:shadow-xl ${
                  isTeal
                    ? "bg-gradient-to-br from-teal-600 to-cyan-600 border-teal-400/40 shadow-lg"
                    : "bg-slate-800/80 border-slate-600/50 shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl md:text-4xl shrink-0" aria-hidden="true">
                    {offer.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-black text-lg md:text-xl leading-tight">{offer.title}</p>
                    <p
                      className={`font-bold mt-1 text-sm md:text-base ${
                        isTeal ? "text-white/95" : "text-cyan-300"
                      }`}
                    >
                      {offer.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-cyan-200 mb-5">
            Why choose Cleenzo
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFERS.benefits.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-semibold text-slate-100 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base"
              >
                <span className="text-cyan-400 text-lg" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-center text-slate-400 text-xs mt-6">{OFFERS.terms}</p>
        </div>
      </div>

      <PlaceOrderCTA title="Book now & claim your launch offer" variant="dark" />
    </section>
  );
}

export default OffersSection;
