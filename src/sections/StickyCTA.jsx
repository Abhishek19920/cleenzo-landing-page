import { useSchedulePickup } from "../context/SchedulePickupContext";
import { openWhatsAppBooking } from "../whatsapp";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";

function StickyCTA() {
  const { openSchedulePickup } = useSchedulePickup();
  const tiranga = isHomeTirangaThemeActive();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:bottom-6 md:px-6 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto bg-black/95 text-white rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl p-3 flex items-center gap-2">
        <button
          type="button"
          onClick={openSchedulePickup}
          className={`flex-1 text-white text-center py-3.5 rounded-xl font-bold text-xs sm:text-sm transition ${
            tiranga
              ? "bg-[#138808] hover:bg-[#0f6b06]"
              : "bg-cleenzo hover:bg-cleenzo-dark"
          }`}
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
