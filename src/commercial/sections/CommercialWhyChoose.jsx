import { WHY_CHOOSE_COMMERCIAL } from "../data";

function CommercialWhyChoose() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#0A3D91] text-center mb-12">
          Why Businesses Choose Cleenzo
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE_COMMERCIAL.map((item) => (
            <div
              key={item}
              className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#0A3D91] text-white flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <p className="text-sm font-semibold text-slate-800 leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommercialWhyChoose;
