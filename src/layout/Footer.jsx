import { PHONE_DISPLAY } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="text-2xl font-black mb-1">Cleenzo</p>
          <p className="text-slate-400 text-sm">Premium laundry · Express delivery</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <a href="#download" className="text-cyan-400 font-semibold hover:underline">
            Download the app now
          </a>
          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="text-[#25D366] font-semibold hover:underline"
          >
            WhatsApp support
          </button>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-slate-400 hover:text-white">
            {PHONE_DISPLAY}
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
