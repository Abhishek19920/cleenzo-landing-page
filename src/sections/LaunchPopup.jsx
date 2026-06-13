/** PRE_LAUNCH_CLEANUP — remove entire file after store is live */
import { useEffect, useState } from "react";
import { APP_COMING_SOON, STORE_LAUNCH } from "../constants";
import { useAppDownload } from "../context/AppDownloadContext";
import { openWhatsAppBooking } from "../whatsapp";
import { getLaunchCountdown } from "../launchGate";
import { getStoreOpeningWhatsAppMessage, showPreLaunchUI } from "../preLaunch";

function LaunchPopup() {
  const before = showPreLaunchUI();
  const [countdown, setCountdown] = useState(getLaunchCountdown);
  const { openAppDownload } = useAppDownload();

  useEffect(() => {
    if (!before) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [before]);

  useEffect(() => {
    if (!before) return;
    const timer = setInterval(() => setCountdown(getLaunchCountdown()), 60_000);
    return () => clearInterval(timer);
  }, [before]);

  if (!before) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-popup-title"
    >
      <div className="relative w-full max-w-md bg-gradient-to-br from-cleenzo-deeper via-cleenzo-deep to-cleenzo text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cleenzo-sky via-white to-cleenzo-sky" />

        <div className="p-8 pt-10 text-center">
          <p className="text-cleenzo-sky uppercase tracking-widest text-xs font-bold mb-3">
            {STORE_LAUNCH.label}
          </p>

          <p className="text-5xl mb-2">🎉</p>

          <h2 id="launch-popup-title" className="text-2xl md:text-3xl font-black mb-3">
            {STORE_LAUNCH.headline}
          </h2>

          <p className="text-4xl md:text-5xl font-black text-cleenzo-sky mb-4">
            {STORE_LAUNCH.dateDisplay}
          </p>

          <div className="flex justify-center gap-3 mb-5">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hrs" },
              { value: countdown.minutes, label: "Min" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 border border-white/15 rounded-xl px-3 py-2 min-w-[64px]"
              >
                <p className="text-2xl font-black tabular-nums leading-none">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {STORE_LAUNCH.message}
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <button
              type="button"
              onClick={openAppDownload}
              className="block w-full bg-white hover:bg-cleenzo-pale text-cleenzo font-bold py-4 rounded-2xl transition"
            >
              {APP_COMING_SOON.title}
            </button>

            <button
              type="button"
              onClick={() => openWhatsAppBooking(getStoreOpeningWhatsAppMessage())}
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-bold py-4 rounded-2xl transition"
            >
              Notify me on WhatsApp
            </button>
          </div>

          <p className="text-slate-400 text-xs mt-4">
            Access will open after launch date.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LaunchPopup;
