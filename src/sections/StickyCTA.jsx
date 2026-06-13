import { useSchedulePickup } from "../context/SchedulePickupContext";
import { openWhatsAppBooking } from "../whatsapp";

function StickyCTA() {
  const { openSchedulePickup } = useSchedulePickup();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:bottom-6 md:px-6 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto bg-black/95 text-white rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl p-3 flex items-center gap-2">
        <button
          type="button"
          onClick={openSchedulePickup}
          className="flex-1 bg-cleenzo text-white text-center py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-cleenzo-dark transition"
        >
          Schedule pickup
        </button>
        <button
          type="button"
          onClick={() => openWhatsAppBooking()}
          className="flex-1 bg-[#25D366] text-center py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#1fb855] transition"
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}

export default StickyCTA;
