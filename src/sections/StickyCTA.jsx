import { PHONE_DISPLAY } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:bottom-6 md:px-6 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto bg-black/95 text-white rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl p-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => openWhatsAppBooking()}
          className="flex-1 bg-[#25D366] text-white text-center py-3.5 rounded-xl font-bold text-sm hover:bg-[#1fb855] transition"
        >
          💬 Book on WhatsApp
        </button>
        <a
          href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
          className="bg-white/10 px-4 py-3.5 rounded-xl text-lg hover:bg-white/20 transition"
          aria-label="Call Cleenzo"
        >
          📞
        </a>
      </div>
    </div>
  );
}

export default StickyCTA;
