import { useSchedulePickup } from "../../context/SchedulePickupContext";

export default function IndependenceUniformBlock() {
  const { openSchedulePickup } = useSchedulePickup();

  return (
    <section
      className="border-y border-[#138808]/15 bg-gradient-to-br from-[#fff7ed] via-white to-[#f0fdf4]"
      aria-label="Independence Day uniform special"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="max-w-2xl mx-auto text-center md:text-left md:max-w-none md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#FF671F]">
              SALUTING THOSE WHO SERVE 🇮🇳
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-cleenzo-deep mt-2">
              50% OFF
            </h2>
            <p className="text-lg font-semibold text-slate-800 mt-1">
              Police &amp; Force Uniform Cleaning
            </p>
            <p className="text-sm text-slate-600 mt-2 max-w-lg">
              Limited to eligible uniform services during 13–15 August — not a site-wide discount.
            </p>
          </div>
          <button
            type="button"
            onClick={openSchedulePickup}
            className="mt-6 md:mt-0 shrink-0 rounded-full bg-cleenzo-deep text-white font-black px-6 py-3 hover:bg-cleenzo transition-colors"
          >
            Book uniform care
          </button>
        </div>
      </div>
    </section>
  );
}
