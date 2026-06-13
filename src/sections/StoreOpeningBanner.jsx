/** PRE_LAUNCH_CLEANUP — remove entire file after store is live */
import { STORE_LAUNCH } from "../constants";
import { useAppDownload } from "../context/AppDownloadContext";
import { getLaunchCountdownLabel } from "../launchGate";
import { getStoreOpeningWhatsAppMessage, showPreLaunchUI } from "../preLaunch";
import { openWhatsAppBooking } from "../whatsapp";

function StoreOpeningBanner() {
  const { openAppDownload } = useAppDownload();

  if (!showPreLaunchUI()) return null;

  const countdownLabel = getLaunchCountdownLabel();

  return (
    <div className="bg-gradient-to-r from-cleenzo-deeper via-cleenzo-deep to-cleenzo text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <p className="text-sm md:text-base font-semibold leading-snug">
          <span className="mr-1.5" aria-hidden="true">
            🎉
          </span>
          <span className="uppercase tracking-wide text-cleenzo-sky text-xs font-bold mr-2">
            {STORE_LAUNCH.label}
          </span>
          Store opens <strong className="text-white">{STORE_LAUNCH.dateDisplay}</strong>
          <span className="hidden md:inline text-cleenzo-pale"> · {countdownLabel}</span>
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => openWhatsAppBooking(getStoreOpeningWhatsAppMessage())}
            className="text-xs md:text-sm font-bold bg-white/15 hover:bg-white/25 border border-white/25 px-3 py-1.5 rounded-full transition"
          >
            Notify me
          </button>
          <button
            type="button"
            onClick={openAppDownload}
            className="text-xs md:text-sm font-bold bg-white hover:bg-cleenzo-pale text-cleenzo px-3 py-1.5 rounded-full transition"
          >
            Get the app
          </button>
        </div>
      </div>

      <p className="sm:hidden text-center text-xs text-cleenzo-pale pb-2 -mt-0.5">{countdownLabel}</p>
    </div>
  );
}

export default StoreOpeningBanner;
