import { CORE_SERVICES, FABRIC_SERVICES } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function ServicesPreview() {
  return (
    <section id="services" className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-orange-600 uppercase tracking-widest font-bold text-sm mb-3">
            Laundry & dry cleaning services
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-orange-800">
            We handle every fabric, every garment
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            From daily laundry to sofa, carpet & dry clean — Cleenzo covers home &
            wardrobe care with express pickup & delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {CORE_SERVICES.map((s) => (
            <div
              key={s.name}
              className="border border-orange-100 rounded-2xl p-4 text-center hover:border-cyan-400 hover:shadow-md transition bg-orange-50/50"
            >
              <span className="text-3xl block mb-2">{s.icon}</span>
              <h3 className="font-bold text-sm md:text-base">{s.name}</h3>
              <p className="text-slate-500 text-xs mt-1 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FABRIC_SERVICES.map((item) => (
            <div
              key={item.name}
              className={`relative rounded-2xl overflow-hidden min-h-[160px] bg-gradient-to-br ${item.gradient} text-white p-5 flex flex-col justify-end`}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10">
                <h3 className="font-black text-lg leading-tight">{item.name}</h3>
                <p className="text-white/90 text-xs mt-1 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PlaceOrderCTA title="Book laundry or dry cleaning today" variant="cream" />
    </section>
  );
}

export default ServicesPreview;
