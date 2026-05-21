const services = [
  { name: "Wash & Fold", price: "From ₹49/kg", icon: "👕" },
  { name: "Dry Clean", price: "From ₹99/item", icon: "🧥" },
  { name: "Iron Only", price: "From ₹15/piece", icon: "👔" },
  { name: "Steam Press", price: "From ₹25/piece", icon: "✨" },
];

function ServicesPreview() {
  return (
    <section id="services" className="bg-white text-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-cyan-600 uppercase tracking-widest font-bold text-sm mb-3">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-black">What we offer</h2>
          <p className="text-slate-500 mt-4 text-lg">
            Message us on WhatsApp for exact pricing on your load.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.name}
              className="border border-slate-200 rounded-3xl p-8 hover:border-cyan-400 hover:shadow-lg transition text-center"
            >
              <span className="text-5xl block mb-4">{s.icon}</span>
              <h3 className="text-xl font-bold mb-1">{s.name}</h3>
              <p className="text-cyan-600 font-semibold">{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
