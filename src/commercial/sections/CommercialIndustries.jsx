import { INDUSTRIES } from "../data";

function CommercialIndustries() {
  return (
    <section id="commercial-industries" className="scroll-mt-36 bg-slate-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#0A3D91] text-center mb-3">
          Industries We Serve
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Trusted commercial laundry programs for hospitality, food service, wellness and enterprise teams.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((item) => (
            <article
              key={item.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#0A3D91]/30 transition"
            >
              <span className="text-3xl mb-4 block" aria-hidden="true">{item.icon}</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommercialIndustries;
