import { useEffect } from "react";
import { APP_COMING_SOON } from "../constants";
import { AppStoreIcon, GooglePlayIcon } from "../components/StoreLogos";
import { openWhatsAppBooking } from "../whatsapp";

function StoreComingSoonBadge({ store, children }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
      <span className="shrink-0">{children}</span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900">{store}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-cleenzo">Coming soon</p>
      </div>
    </div>
  );
}

function AppComingSoonModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

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
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-slate-700 font-bold transition"
          aria-label="Close"
        >
          ×
        </button>

        <div className="bg-gradient-to-r from-cleenzo-deeper via-cleenzo-deep to-cleenzo text-white px-6 py-8 text-center">
          <p className="text-4xl mb-3" aria-hidden="true">
            📱
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-cleenzo-sky mb-2">
            Cleenzo mobile app
          </p>
          <h2 id="app-soon-title" className="text-2xl font-black leading-tight">
            {APP_COMING_SOON.title}
          </h2>
          <p className="text-cleenzo-sky font-bold text-sm mt-2">{APP_COMING_SOON.subtitle}</p>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <StoreComingSoonBadge store="Google Play">
              <GooglePlayIcon className="w-8 h-8" />
            </StoreComingSoonBadge>
            <StoreComingSoonBadge store="App Store">
              <AppStoreIcon className="w-8 h-8 text-slate-900" />
            </StoreComingSoonBadge>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed text-center mb-6">
            {APP_COMING_SOON.message}
          </p>

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
