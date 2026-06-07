import { WHY_CLEENZO_USP } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function WhyChoose() {
  return (
    <section id="why" className="bg-[#fffdf5] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 h-56 md:h-80 flex items-center justify-center text-7xl shadow-inner">
          🏭
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-black text-orange-800 leading-tight mb-4">
            What makes Cleenzo laundry service the best choice
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Looking for the best laundry & dry cleaners near you? Cleenzo delivers
            express pickup, premium cleaning & reliable doorstep delivery every order.
          </p>

          <ul className="space-y-5">
            {WHY_CLEENZO_USP.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PlaceOrderCTA variant="white" />
    </section>
  );
}

export default WhyChoose;
