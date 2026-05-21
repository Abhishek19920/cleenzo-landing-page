const steps = [
  {
    step: "01",
    title: "Chat on WhatsApp",
    desc: "Send a message, tell us your address and preferred pickup slot.",
    icon: "💬",
  },
  {
    step: "02",
    title: "We pick up",
    desc: "Our partner collects your laundry from your doorstep.",
    icon: "📦",
  },
  {
    step: "03",
    title: "Expert cleaning",
    desc: "Wash, dry-clean, or iron — handled with premium care.",
    icon: "🧺",
  },
  {
    step: "04",
    title: "Express delivery",
    desc: "Fresh clothes back at your door — express delivery on every order, no exceptions.",
    icon: "🚚",
  },
];

function OurProcess() {
  return (
    <section id="process" className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-widest font-bold text-sm mb-3">
            Our process
          </p>
          <h2 className="text-4xl md:text-5xl font-black">4 easy steps</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <div key={item.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent" />
              )}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full">
                <span className="text-5xl mb-4 block">{item.icon}</span>
                <p className="text-cyan-400 font-black text-sm mb-2">{item.step}</p>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
