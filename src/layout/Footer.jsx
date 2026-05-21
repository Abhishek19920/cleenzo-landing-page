import { PHONE_DISPLAY } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="text-2xl font-black mb-1">Cleenzo</p>
          <p className="text-slate-400 text-sm">Premium laundry · WhatsApp booking</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="text-[#25D366] font-semibold hover:underline"
          >
            Chat on WhatsApp
          </button>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-slate-400 hover:text-white">
            {PHONE_DISPLAY}
          </a>
          <a href="#download" className="text-slate-400 hover:text-white">
            Download app
          </a>
        </div>
      </div>
      <p className="text-center text-slate-500 text-xs mt-8">
        © {new Date().getFullYear()} Cleenzo. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
