import { OFFERS } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function OffersSection() {
  return (
    <section id="offers" className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-orange-600 uppercase tracking-widest font-bold text-sm mb-2">
            Laundry offers near you
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-black">{OFFERS.headline}</h2>
          <p className="text-slate-600 mt-2 text-sm md:text-base max-w-xl mx-auto">
            Save more than flat discounts — limited deals on wash, dry clean & first orders.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {OFFERS.items.map((offer) => (
            <div
              key={offer.title}
              className={`rounded-3xl p-6 text-center border-2 transition hover:scale-[1.02] ${
                offer.highlight
                  ? "bg-black text-white border-black shadow-xl"
                  : "bg-white text-black border-orange-200 shadow-md"
              }`}
            >
              <p className="text-4xl mb-3">{offer.icon}</p>
              <p className="font-black text-lg leading-tight">{offer.title}</p>
              <p className={`font-bold mt-1 ${offer.highlight ? "text-cyan-400" : "text-orange-600"}`}>
                {offer.price}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-orange-100 p-6 md:p-8 shadow-sm">
          <ul className="grid sm:grid-cols-3 gap-3 text-sm">
            {OFFERS.benefits.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-semibold text-slate-800"
              >
                <span className="text-green-600">✅</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PlaceOrderCTA title="Claim your offer — book now" variant="light" />
    </section>
  );
}

export default OffersSection;
