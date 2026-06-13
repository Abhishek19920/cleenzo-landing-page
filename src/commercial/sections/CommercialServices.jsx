import { SERVICE_CATEGORIES } from "../data";

function CommercialServices() {
  return (
    <section id="commercial-services" className="scroll-mt-36 bg-slate-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#0A3D91] text-center mb-12">
          Services We Process
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_CATEGORIES.map((category) => (
            <article
              key={category.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-[#0A3D91] mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700 text-sm">
                    <span className="text-[#0A3D91]" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommercialServices;
