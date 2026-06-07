import { DRY_CLEAN_PROCESS } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function OurProcess() {
  return (
    <section id="process" className="bg-[#fffdf5] text-slate-900 border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-orange-800 leading-tight mb-4">
              6-step dry cleaning process built for quality
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              From free pickup to express delivery, every Cleenzo order follows a
              strict quality protocol — no shortcuts, premium fabric care every time.
            </p>
            <div className="rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 h-48 md:h-64 flex items-center justify-center text-6xl">
              🧺
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {DRY_CLEAN_PROCESS.map((item, i) => (
              <div
                key={item.title}
                className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm relative"
              >
                <span className="absolute -top-2 -left-2 w-7 h-7 bg-orange-500 text-white text-xs font-black rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-2xl block mb-2">{item.icon}</span>
                <h3 className="font-bold text-orange-900 text-sm mb-1">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PlaceOrderCTA variant="cream" />
    </section>
  );
}

export default OurProcess;
