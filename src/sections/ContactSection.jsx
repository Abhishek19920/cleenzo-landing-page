import { PHONE_DISPLAY, PHONE_TEL, STORE_ADDRESS, STORE_MAPS_URL } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

function ContactSection() {
  return (
    <section id="contact" className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-cyan-700 font-bold text-sm uppercase tracking-widest mb-2">
            Visit us
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Contact & store location</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href={STORE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:border-cyan-300 hover:shadow-md transition"
          >
            <p className="text-3xl mb-3" aria-hidden="true">
              📍
            </p>
            <p className="font-bold text-slate-900 mb-2">Store address</p>
            <p className="text-slate-600 text-sm leading-relaxed">{STORE_ADDRESS}</p>
            <p className="text-cyan-600 text-xs font-semibold mt-3">Open in Google Maps →</p>
          </a>

          <a
            href={`tel:${PHONE_TEL}`}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:border-cyan-300 hover:shadow-md transition"
          >
            <p className="text-3xl mb-3" aria-hidden="true">
              📞
            </p>
            <p className="font-bold text-slate-900 mb-2">Call us</p>
            <p className="text-slate-600 text-sm">{PHONE_DISPLAY}</p>
          </a>

          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:border-[#25D366] hover:shadow-md transition w-full"
          >
            <p className="text-3xl mb-3" aria-hidden="true">
              💬
            </p>
            <p className="font-bold text-slate-900 mb-2">WhatsApp</p>
            <p className="text-slate-600 text-sm">{PHONE_DISPLAY}</p>
            <p className="text-[#25D366] text-xs font-semibold mt-3">Chat with us →</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
