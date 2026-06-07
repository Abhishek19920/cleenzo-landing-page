import { APP_LINKS, STORE_LAUNCH } from "../constants";
import { getLaunchCountdownLabel, isBeforeLaunchDay } from "../launchGate";
import { openWhatsAppBooking } from "../whatsapp";

function StoreOpeningBanner() {
  if (!isBeforeLaunchDay()) return null;

  const countdownLabel = getLaunchCountdownLabel();

  return (
    <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <p className="text-sm md:text-base font-semibold leading-snug">
          <span className="mr-1.5" aria-hidden="true">
            🎉
          </span>
          <span className="uppercase tracking-wide text-cyan-200 text-xs font-bold mr-2">
            {STORE_LAUNCH.label}
          </span>
          Store opens <strong className="text-white">{STORE_LAUNCH.dateDisplay}</strong>
          <span className="hidden md:inline text-cyan-100"> · {countdownLabel}</span>
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() =>
              openWhatsAppBooking(
                "Hi Cleenzo! I'm excited about your store opening on 16 June 2026. Please keep me updated!",
              )
            }
            className="text-xs md:text-sm font-bold bg-white/15 hover:bg-white/25 border border-white/25 px-3 py-1.5 rounded-full transition"
          >
            Notify me
          </button>
          <a
            href={APP_LINKS.android === "#" ? "#download" : APP_LINKS.android}
            className="text-xs md:text-sm font-bold bg-cyan-300 hover:bg-cyan-200 text-slate-900 px-3 py-1.5 rounded-full transition"
          >
            Get the app
          </a>
        </div>
      </div>

      <p className="sm:hidden text-center text-xs text-cyan-100 pb-2 -mt-0.5">{countdownLabel}</p>
    </div>
  );
}

export default StoreOpeningBanner;
