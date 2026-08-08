import { CORE_SERVICES, FABRIC_SERVICES } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";

const TIRANGA_ACCENTS = [
  "linear-gradient(135deg, #ff9933 0%, #e8850f 100%)",
  "linear-gradient(135deg, #138808 0%, #0f6b06 100%)",
  "linear-gradient(135deg, #002b5b 0%, #0a3d91 100%)",
  "linear-gradient(135deg, #ff9933 0%, #138808 100%)",
];

function FabricCategoryCard({ item, index, tiranga }) {
  if (tiranga) {
    const accent = TIRANGA_ACCENTS[index % TIRANGA_ACCENTS.length];
    return (
      <article className="group relative overflow-hidden rounded-2xl min-h-[168px] bg-white/90 border border-[#138808]/15 p-5 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: "linear-gradient(90deg, #ff9933, #ffffff, #138808)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-start justify-between gap-2">
          <span
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-2xl shrink-0 text-white shadow-sm"
            style={{ background: accent }}
            aria-hidden="true"
          >
            {item.icon}
          </span>
        </div>
        <div className="relative z-10 mt-auto pt-4">
          <h3 className="font-black text-base md:text-lg leading-tight text-[#002b5b]">
            {item.name}
          </h3>
          <p className="text-slate-600 text-xs mt-1.5 leading-relaxed line-clamp-2">{item.desc}</p>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group relative overflow-hidden rounded-2xl min-h-[168px] text-white p-5 flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{
        background: item.background,
        boxShadow: `0 12px 32px ${item.glow}`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <span
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 text-2xl shrink-0"
          aria-hidden="true"
        >
          {item.icon}
        </span>
      </div>

      <div className="relative z-10 mt-auto pt-4">
        <h3 className="font-black text-base md:text-lg leading-tight">{item.name}</h3>
        <p className="text-white/90 text-xs mt-1.5 leading-relaxed line-clamp-2">{item.desc}</p>
      </div>
    </article>
  );
}

function ServicesPreview() {
  const tiranga = isHomeTirangaThemeActive();

  return (
    <section
      id="services"
      className={`${tiranga ? "home-services-tiranga bg-transparent text-[#002b5b]" : "bg-white text-black"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10 md:mb-12">
          <p
            className={`uppercase tracking-widest font-bold text-sm mb-3 ${
              tiranga ? "text-[#b45309]" : "text-cleenzo"
            }`}
          >
            Laundry & dry cleaning services
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-cleenzo-deep">
            We handle every fabric, every garment
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            From daily laundry to sofa, carpet & dry clean — Cleenzo covers home & wardrobe care
            with express pickup & delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-14">
          {CORE_SERVICES.map((s) => (
            <div
              key={s.name}
              className={`border rounded-2xl p-4 text-center hover:shadow-md transition ${
                tiranga
                  ? "border-[#138808]/20 bg-white/80 hover:border-[#ff9933]/40"
                  : "border-cleenzo-sky-light bg-cleenzo-pale/50 hover:border-cleenzo"
              }`}
            >
              <span className="text-3xl block mb-2" aria-hidden="true">
                {s.icon}
              </span>
              <h3 className="font-bold text-sm md:text-base">{s.name}</h3>
              <p className="text-slate-500 text-xs mt-1 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p
                className={`text-xs font-bold uppercase tracking-[0.18em] mb-2 ${
                  tiranga ? "text-[#138808]" : "text-slate-500"
                }`}
              >
                Fabric categories
              </p>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                Specialist care for every garment type
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              Each fabric gets its own process — colour-safe, stain-treated and finished to premium
              standards.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {FABRIC_SERVICES.map((item, index) => (
              <FabricCategoryCard key={item.name} item={item} index={index} tiranga={tiranga} />
            ))}
          </div>
        </div>
      </div>

      <PlaceOrderCTA title="Book laundry or dry cleaning today" variant={tiranga ? "cream" : "cream"} />
    </section>
  );
}

export default ServicesPreview;
