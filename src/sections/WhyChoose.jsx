const reasons = [
  {
    icon: "💬",
    title: "WhatsApp support",
    desc: "Questions or help? Message us anytime on WhatsApp.",
  },
  {
    icon: "🚚",
    title: "Doorstep pickup & delivery",
    desc: "We collect and return fresh laundry at your home.",
  },
  {
    icon: "📱",
    title: "All in one app",
    desc: "Download Cleenzo to place orders and get updates in one place.",
  },
  {
    icon: "✨",
    title: "Premium garment care",
    desc: "Fabric-safe cleaning for everyday wear and delicate items.",
  },
  {
    icon: "⚡",
    title: "Express delivery — always",
    desc: "Our USP: every order gets fast turnaround and express doorstep delivery.",
  },
  {
    icon: "🎁",
    title: "Rewards & offers",
    desc: "First-order discounts and loyalty perks for regular customers.",
  },
];

function WhyChoose() {
  return (
    <section id="why" className="bg-slate-950 text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-widest font-bold text-sm mb-3">
            Why Cleenzo
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            Laundry made simple & smart
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
            Built for busy people who want quality cleaning without the hassle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
