import { USP } from "../constants";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function ExpressUSP() {
  return (
    <section className="bg-gradient-to-r from-cleenzo-deep via-cleenzo to-cleenzo-light text-white">
      <div className="max-w-7xl mx-auto text-center px-6 py-14">
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-cleenzo-sky">
          {USP.badge}
        </p>
        <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          {USP.headline}
        </h2>
        <p className="text-base md:text-lg font-medium max-w-2xl mx-auto text-cleenzo-pale">
          {USP.description} Fast laundry service with free pickup & express doorstep delivery.
        </p>
      </div>
      <PlaceOrderCTA title="Need express laundry today?" variant="dark" className="!bg-cleenzo-dark/40" />
    </section>
  );
}

export default ExpressUSP;
