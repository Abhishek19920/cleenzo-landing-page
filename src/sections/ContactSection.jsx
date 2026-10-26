import { useEffect } from "react";
import SocialLinks from "../components/SocialLinks";
import { PHONE_DISPLAY, PHONE_TEL } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";
import { reportGoogleAdsContactConversion } from "../utils/googleAds";

function ContactSection() {
  useEffect(() => {
    const maybeReport = () => {
      if (window.location.hash === "#contact") {
        reportGoogleAdsContactConversion();
      }
    };
    maybeReport();
    window.addEventListener("hashchange", maybeReport);
    return () => window.removeEventListener("hashchange", maybeReport);
  }, []);

  return (
    <section id="contact" className="scroll-mt-28 bg-cleenzo-pale-bg border-y border-cleenzo-sky-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="text-center mb-8">
          <p className="text-cleenzo font-bold text-sm uppercase tracking-widest mb-2">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Contact & store location</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <a
            href={`tel:${PHONE_TEL}`}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:border-cleenzo hover:shadow-md transition"
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

        <div className="mt-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
            Follow us on social media
          </p>
          <SocialLinks className="justify-center" showLabels />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
