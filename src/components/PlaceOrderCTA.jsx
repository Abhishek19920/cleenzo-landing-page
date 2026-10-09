import { useSchedulePickup } from "../context/SchedulePickupContext";
import { openWhatsAppBooking } from "../whatsapp";

const variants = {
  light: "bg-slate-100 text-slate-800",
  cream: "bg-cleenzo-pale/80 text-slate-800",
  dark: "bg-slate-900/40 text-white",
  white: "bg-white text-slate-800 border-t border-slate-200",
};

function PlaceOrderCTA({ title = "Ready to book a free pickup?", variant = "light", className = "" }) {
  const { openSchedulePickup } = useSchedulePickup();
  const isDark = variant === "dark";

  return (
    <div className={`py-8 px-4 ${variants[variant] || variants.light} ${className}`}>
      {title ? (
        <p
          className={`text-center font-medium mb-5 text-lg ${
            isDark ? "text-white" : "text-slate-800"
          }`}
        >
          {title}
        </p>
      ) : null}
      <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={openSchedulePickup}
          className="w-full bg-cleenzo hover:bg-cleenzo-dark text-white font-bold py-4 px-6 rounded-full transition shadow-md"
        >
          Book free pickup
        </button>
        <button
          type="button"
          onClick={() => openWhatsAppBooking()}
          className={`text-sm font-semibold underline-offset-2 hover:underline ${
            isDark ? "text-cleenzo-sky" : "text-[#128C7E]"
          }`}
        >
          Prefer WhatsApp? Message us
        </button>
      </div>
    </div>
  );
}

export default PlaceOrderCTA;
