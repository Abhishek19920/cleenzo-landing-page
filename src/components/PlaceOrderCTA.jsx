import { useSchedulePickup } from "../context/SchedulePickupContext";
import { openWhatsAppBooking } from "../whatsapp";

const variants = {
  light: "bg-slate-100 text-slate-800",
  cream: "bg-cleenzo-pale/80 text-slate-800",
  dark: "bg-slate-900/40 text-white",
  white: "bg-white text-slate-800 border-t border-slate-200",
};

function PlaceOrderCTA({ title = "To place your order", variant = "light", className = "" }) {
  const { openSchedulePickup } = useSchedulePickup();

  return (
    <div className={`py-8 px-4 ${variants[variant] || variants.light} ${className}`}>
      {title && (
        <p
          className={`text-center italic font-medium mb-5 text-lg ${
            variant === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {title}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => openWhatsAppBooking()}
          className="flex-1 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold py-4 px-6 rounded-full transition shadow-md"
        >
          Chat on WhatsApp
        </button>
        <button
          type="button"
          onClick={openSchedulePickup}
          className="flex-1 bg-cleenzo hover:bg-cleenzo-dark text-white font-bold py-4 px-6 rounded-full transition shadow-md"
        >
          Schedule free pickup
        </button>
      </div>
    </div>
  );
}

export default PlaceOrderCTA;
