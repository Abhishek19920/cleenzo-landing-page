import { DISCOUNT } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

function DiscountBanner() {
  const message = `Hi Cleenzo! I'd like to use code ${DISCOUNT.code} for my first order discount.`;

  return (
    <section className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-black py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">
            {DISCOUNT.label}
          </p>
          <p className="text-lg sm:text-xl font-black">{DISCOUNT.headline}</p>
          <p className="text-sm font-medium opacity-90">{DISCOUNT.subtext}</p>
        </div>
        <button
          type="button"
          onClick={() => openWhatsAppBooking(message)}
          className="shrink-0 bg-black text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition"
        >
          Claim on WhatsApp →
        </button>
      </div>
    </section>
  );
}

export default DiscountBanner;
