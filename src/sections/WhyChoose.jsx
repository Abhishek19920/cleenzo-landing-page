import { WHY_CLEENZO, WHY_CLEENZO_USP } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function WhyChoose() {
  return (
    <section id="why" className="bg-cleenzo-pale-bg border-t border-cleenzo-sky-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-cleenzo font-bold text-sm uppercase tracking-widest mb-3">
            Why Cleenzo
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-cleenzo-deep leading-tight mb-4">
            {WHY_CLEENZO.headline}
          </h2>
          <span className="inline-block bg-cleenzo text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-md border border-cleenzo-sky/40 mb-4">
            {WHY_CLEENZO.badge}
          </span>
          <p className="text-slate-600 leading-relaxed">{WHY_CLEENZO.subtext}</p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {WHY_CLEENZO_USP.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 bg-white border border-cleenzo-sky-light rounded-2xl p-4 shadow-sm"
            >
              <span
                className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cleenzo to-cleenzo-light text-white flex items-center justify-center text-xl"
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

      <PlaceOrderCTA variant="white" />
    </section>
  );
}

export default WhyChoose;
