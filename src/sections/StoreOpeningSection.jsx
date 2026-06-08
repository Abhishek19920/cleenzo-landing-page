import { useEffect, useState } from "react";
import { APP_LINKS, PHONE_DISPLAY, PHONE_TEL, STORE_ADDRESS_LINES, STORE_MAPS_URL, STORE_LAUNCH } from "../constants";
import { getLaunchCountdown, isBeforeLaunchDay } from "../launchGate";
import { openWhatsAppBooking } from "../whatsapp";
import AppStoreButtons from "./AppStoreButtons";

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[72px] md:min-w-[88px]">
      <div className="w-full bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl py-4 md:py-5 shadow-lg">
        <p className="text-3xl md:text-5xl font-black tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </p>
      </div>
      <p className="mt-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-cyan-100">
        {label}
      </p>
    </div>
  );
}

function StoreOpeningSection() {
  const [countdown, setCountdown] = useState(getLaunchCountdown);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getLaunchCountdown()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!isBeforeLaunchDay()) return null;

  return (
    <section
      id="opening"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-cyan-950 text-white"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-400 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-widest text-cyan-200 mb-6">
            <span aria-hidden="true">📅</span>
            {STORE_LAUNCH.label}
          </p>

          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            {STORE_LAUNCH.headline}
          </h2>

          <p className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 mb-5">
            {STORE_LAUNCH.dateDisplay}
          </p>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            {STORE_LAUNCH.message}
          </p>

          <div className="inline-block text-left bg-white/5 border border-white/10 rounded-2xl px-5 py-4 mb-10 max-w-md mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-200 mb-2">
              Store location
            </p>
            <a
              href={STORE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-slate-200 hover:text-white transition leading-relaxed"
            >
              {STORE_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
            <p className="text-sm text-cyan-100 mt-3">
              WhatsApp / Call:{" "}
              <a href={`tel:${PHONE_TEL}`} className="font-bold hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3 md:gap-5 mb-10">
          <CountdownUnit value={countdown.days} label="Days" />
          <CountdownUnit value={countdown.hours} label="Hours" />
          <CountdownUnit value={countdown.minutes} label="Minutes" />
        </div>

        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 text-center backdrop-blur-sm">
          <p className="text-sm font-semibold text-cyan-200 mb-2">
            Be ready before we go live
          </p>
          <p className="text-lg md:text-xl font-bold mb-6">
            Download the app now & get notified when bookings open
          </p>

          <div className="flex justify-center mb-6">
            <AppStoreButtons variant="light" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() =>
                openWhatsAppBooking(
                  "Hi Cleenzo! I'm excited about your store opening on 16 June 2026. Please keep me updated!",
                )
              }
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-bold py-3.5 px-6 rounded-full transition"
            >
              Notify me on WhatsApp
            </button>
            <a
              href={APP_LINKS.android === "#" ? "#download" : APP_LINKS.android}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold py-3.5 px-6 rounded-full transition"
            >
              Download the app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreOpeningSection;
