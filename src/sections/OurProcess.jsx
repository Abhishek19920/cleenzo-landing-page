import { DRY_CLEAN_PROCESS } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";

function OurProcess() {
  const tirangaPage = isHomeTirangaThemeActive();

  return (
    <section
      id="process"
      className={`relative border-b overflow-hidden ${
        tirangaPage
          ? "home-tiranga-process border-[#FF9933]/20 bg-white/40"
          : "bg-white border-cleenzo-sky-light"
      }`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          tirangaPage
            ? "bg-[radial-gradient(ellipse_at_top,rgba(255,153,51,0.06),transparent_55%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(10,61,145,0.06),transparent_55%)]"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.2em] mb-4">
            How we work
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.65rem] font-black text-cleenzo-deep leading-tight mb-5">
            6-step dry cleaning process built for quality
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            From free pickup to express delivery, every Cleenzo order follows a strict quality
            protocol — no shortcuts, premium fabric care every time.
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-6 gap-0 relative">
          <div className="absolute top-[2.25rem] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-cleenzo/25 to-transparent" />
          {DRY_CLEAN_PROCESS.map((item, i) => (
            <div key={item.title} className="relative flex flex-col items-center text-center px-3">
              <div className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-cleenzo to-cleenzo-light text-white flex flex-col items-center justify-center shadow-lg shadow-cleenzo/20 border-4 border-white mb-5">
                <span className="text-lg leading-none" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-[10px] font-black mt-0.5 opacity-90">{i + 1}</span>
              </div>
              <h3 className="font-bold text-cleenzo-dark text-sm mb-2 leading-snug">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="lg:hidden space-y-4">
          {DRY_CLEAN_PROCESS.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-4 items-start bg-cleenzo-pale/50 border border-cleenzo-sky-light rounded-2xl p-5"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-cleenzo text-white flex items-center justify-center font-black text-sm shadow-md">
                {i + 1}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="font-bold text-cleenzo-dark text-sm">{item.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Fabric-safe chemicals", icon: "🌿" },
            { label: "Expert quality checks", icon: "✓" },
            { label: "Express doorstep return", icon: "🚚" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cleenzo-pale border border-cleenzo-sky-light text-cleenzo-dark text-sm font-semibold"
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <PlaceOrderCTA title="Need express laundry today?" variant="cream" />
    </section>
  );
}

export default OurProcess;
