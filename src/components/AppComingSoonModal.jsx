import { useEffect } from "react";
import { APP_COMING_SOON, STORE_LAUNCH } from "../constants";
import { showPreLaunchUI } from "../preLaunch";
import { openWhatsAppBooking } from "../whatsapp";

function AppComingSoonModal({ onClose }) {
  const preLaunch = showPreLaunchUI();
  const message = preLaunch
    ? APP_COMING_SOON.message
    : "Our store is open! Book on WhatsApp or schedule a free pickup on the website until the app is available.";
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-soon-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-cleenzo-deeper via-cleenzo-deep to-cleenzo text-white px-6 py-8 text-center">
          <p className="text-4xl mb-3" aria-hidden="true">
            📱
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-cleenzo-sky mb-2">
            Cleenzo app
          </p>
          <h2 id="app-soon-title" className="text-2xl font-black leading-tight">
            {APP_COMING_SOON.title}
          </h2>
          {preLaunch && (
            <p className="text-cleenzo-sky font-bold text-lg mt-2">{STORE_LAUNCH.dateDisplay}</p>
          )}
        </div>

        <div className="px-6 py-6 text-center">
          <p className="text-slate-600 text-sm leading-relaxed mb-6">{message}</p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                openWhatsAppBooking(APP_COMING_SOON.whatsappMessage);
                onClose();
              }}
              className="w-full bg-[#25D366] hover:bg-[#1fb855] text-white font-bold py-3.5 rounded-xl transition"
            >
              Notify me on WhatsApp
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3.5 rounded-xl transition"
            >
              Continue on website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppComingSoonModal;
