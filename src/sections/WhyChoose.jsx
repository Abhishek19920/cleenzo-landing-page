import whyChooseImage from "../assets/image/cleenzo-why-choose.png";
import { WHY_CLEENZO, WHY_CLEENZO_USP } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function WhyChoose() {
  return (
    <section id="why" className="bg-[#fffdf5] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-3 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-3xl blur-xl pointer-events-none" />
          <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-slate-50">
            <img
              src={whyChooseImage}
              alt={WHY_CLEENZO.imageAlt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -right-2 md:right-4 bg-slate-900 text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-full shadow-lg border border-teal-400/40">
            {WHY_CLEENZO.badge}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-teal-700 font-bold text-sm uppercase tracking-widest mb-3">
            Why Cleenzo
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-orange-800 leading-tight mb-4">
            {WHY_CLEENZO.headline}
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">{WHY_CLEENZO.subtext}</p>

          <ul className="space-y-4">
            {WHY_CLEENZO_USP.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 bg-white border border-amber-100 rounded-2xl p-4 shadow-sm"
              >
                <span
                  className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white flex items-center justify-center text-xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
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
