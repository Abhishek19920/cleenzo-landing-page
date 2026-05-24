import { useEffect, useState } from "react";
import { STORE_LAUNCH } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

const DISMISS_KEY = "cleenzo-launch-popup-dismissed";

function isBeforeLaunchDay() {
  const launch = new Date(`${STORE_LAUNCH.launchDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today < launch;
}

function LaunchPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isBeforeLaunchDay()) return;
    if (localStorage.getItem(DISMISS_KEY) === "true") return;
    const timer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-popup-title"
    >
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400" />

        <button
          type="button"
          onClick={dismiss}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg leading-none transition"
          aria-label="Close"
        >
          ×
        </button>

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

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            {STORE_LAUNCH.message}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="#download"
              onClick={dismiss}
              className="block bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-2xl transition"
            >
              Download the app now
            </a>
            <button
              type="button"
              onClick={() => {
                openWhatsAppBooking(
                  "Hi Cleenzo! I'm excited about your store opening on 16 June 2026. Please keep me updated!",
                );
                dismiss();
              }}
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-bold py-4 rounded-2xl transition"
            >
              Notify me on WhatsApp
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="text-slate-400 text-sm hover:text-white transition py-2"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaunchPopup;
