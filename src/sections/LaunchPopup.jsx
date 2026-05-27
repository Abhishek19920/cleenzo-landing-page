import { useEffect } from "react";
import { APP_LINKS, STORE_LAUNCH } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

function isBeforeLaunchDay() {
  const [y, m, d] = STORE_LAUNCH.launchDate.split("-").map(Number);
  const launch = new Date(y, m - 1, d);

  const now = new Date();
  const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today0 < launch;
}

function LaunchPopup() {
  const before = isBeforeLaunchDay();

  useEffect(() => {
    if (!before) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [before]);

  if (!before) return null;

  const androidHref = APP_LINKS.android === "#" ? "/#download" : APP_LINKS.android;
  const iosHref = APP_LINKS.ios === "#" ? "/#download" : APP_LINKS.ios;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-popup-title"
    >
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400" />

        <div className="p-8 pt-10 text-center">
          <p className="text-cyan-400 uppercase tracking-widest text-xs font-bold mb-3">
            {STORE_LAUNCH.label}
          </p>

          <p className="text-5xl mb-2">🎉</p>

          <h2 id="launch-popup-title" className="text-2xl md:text-3xl font-black mb-3">
            {STORE_LAUNCH.headline}
          </h2>

          <p className="text-4xl md:text-5xl font-black text-cyan-400 mb-4">
            {STORE_LAUNCH.dateDisplay}
          </p>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {STORE_LAUNCH.message}
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <a
              href={androidHref}
              className="block bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-2xl transition"
            >
              Download the app now (Android)
            </a>

            <a
              href={iosHref}
              className="block bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold py-4 rounded-2xl transition"
            >
              Download the app now (iOS)
            </a>

            <button
              type="button"
              onClick={() =>
                openWhatsAppBooking(
                  "Hi Cleenzo! I'm excited about your store opening on 16 June 2026. Please keep me updated!",
                )
              }
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
