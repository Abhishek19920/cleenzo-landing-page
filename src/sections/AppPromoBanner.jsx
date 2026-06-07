import { APP_PROMO_STEPS } from "../constants";
import AppStoreButtons from "./AppStoreButtons";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function AppPromoBanner() {
  return (
    <section className="bg-white border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-slate-900 max-w-3xl mx-auto leading-snug">
          Fresh clothes, one tap away —{" "}
          <span className="text-orange-600">laundry & dry cleaning near you</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-10 mb-12">
          {APP_PROMO_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center text-center max-w-[140px]">
              <div className="relative">
                <span className="text-4xl">{step.icon}</span>
                {i < APP_PROMO_STEPS.length - 1 && (
                  <span className="hidden md:block absolute top-5 left-full w-16 h-0.5 bg-orange-300 ml-2" />
                )}
              </div>
              <p className="mt-3 text-sm font-bold text-orange-700">{step.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto text-center shadow-sm">
          <p className="text-cyan-700 font-semibold text-sm mb-2">For a seamless experience</p>
          <p className="text-3xl md:text-4xl font-black mb-2">
            <span className="text-cyan-600">DOWNLOAD</span>{" "}
            <span className="text-orange-600">OUR APP</span>
          </p>
          <p className="text-slate-600 text-sm mb-6">
            Book laundry pickup, track express delivery & pay online with Cleenzo.
          </p>
          <div className="flex justify-center">
            <AppStoreButtons />
          </div>
        </div>
      </div>

      <PlaceOrderCTA variant="light" />
    </section>
  );
}

export default AppPromoBanner;
