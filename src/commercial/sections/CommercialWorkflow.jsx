import { WORKFLOW_STEPS } from "../data";

function CommercialWorkflow() {
  return (
    <section id="commercial-workflow" className="scroll-mt-36 bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#0A3D91] text-center mb-12">
          How Cleenzo Commercial Laundry Works
        </h2>
        <ol className="space-y-4">
          {WORKFLOW_STEPS.map((step, index) => (
            <li
              key={step.title}
              className={`grid md:grid-cols-[72px_1fr] gap-4 p-5 md:p-6 rounded-2xl border border-slate-200 ${
                index % 2 === 0 ? "bg-slate-50" : "bg-white"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-[#0A3D91] text-white flex items-center justify-center font-black text-lg">
                {index + 1}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0A3D91] mb-1">
                  Step {index + 1}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
                {step.codes && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {step.codes.map((code) => (
                      <span
                        key={code}
                        className="px-3 py-1 rounded-lg bg-[#0A3D91]/10 text-[#0A3D91] text-sm font-bold"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default CommercialWorkflow;
