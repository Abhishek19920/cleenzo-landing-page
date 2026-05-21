import { USP } from "../constants";

function ExpressUSP() {
  return (
    <section className="bg-cyan-400 text-black py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-3 opacity-80">
          {USP.badge}
        </p>
        <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          {USP.headline}
        </h2>
        <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
          {USP.description}
        </p>
      </div>
    </section>
  );
}

export default ExpressUSP;
