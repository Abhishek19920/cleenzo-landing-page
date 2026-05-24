import { openWhatsAppBooking } from "../whatsapp";

function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:bottom-6 md:px-6 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto bg-black/95 text-white rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl p-3 flex items-center gap-2">
        <a
          href="#download"
          className="flex-1 bg-cyan-400 text-black text-center py-3.5 rounded-xl font-bold text-sm hover:bg-cyan-300 transition"
        >
          📱 Download the app now
        </a>
        <button
          type="button"
          onClick={() => openWhatsAppBooking()}
          className="bg-[#25D366] px-4 py-3.5 rounded-xl text-lg hover:bg-[#1fb855] transition"
          aria-label="Chat on WhatsApp"
        >
          💬
        </button>
      </div>
    </div>
  );
}

export default StickyCTA;
