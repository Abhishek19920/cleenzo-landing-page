import { PHONE_DISPLAY, PHONE_TEL, STORE_ADDRESS } from "../constants";
import { SEO_FAQ, SERVICE_AREAS } from "../seo";
import { openWhatsAppBooking } from "../whatsapp";

function SeoContentSection() {
  return (
    <section id="about" className="bg-white border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <p className="text-cleenzo font-bold text-sm uppercase tracking-widest mb-3 text-center">
          About Cleenzo
        </p>

        <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center leading-tight mb-6">
          Premium laundry & dry cleaning in Raj Nagar, Ghaziabad
        </h2>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-base md:text-lg">
          <p>
            <strong>Cleenzo</strong> is your trusted{" "}
            <strong>laundry and dry cleaning service in Raj Nagar Extension, Ghaziabad</strong>.
            Located at <strong>{STORE_ADDRESS}</strong>, we combine professional fabric care with
            fast, express doorstep delivery — so your everyday clothes and special garments always
            look their best.
          </p>

          <p>
            Whether you need wash-and-fold for daily wear, expert{" "}
            <strong>dry cleaning for suits, sarees, and blazers</strong>, or home services like{" "}
            <strong>sofa cleaning, carpet cleaning, and steam ironing</strong>, Cleenzo handles
            every order with imported fabric-safe chemicals and a hygiene-first process from pickup
            to delivery.
          </p>

          <p>
            Serving <strong>{SERVICE_AREAS.slice(0, 6).join(", ")}</strong>, and nearby neighbourhoods
            across Ghaziabad and Delhi NCR (pin code <strong>201017</strong>), Cleenzo offers{" "}
            <strong>free pickup and delivery</strong> on every order. Book in seconds on WhatsApp, call{" "}
            <a href={`tel:${PHONE_TEL}`} className="text-cleenzo font-semibold hover:underline">
              {PHONE_DISPLAY}
            </a>
            , schedule a pickup on our website, or download the Cleenzo app to track express laundry
            delivery in real time.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">
            Frequently asked questions
          </h3>
          <dl className="space-y-4">
            {SEO_FAQ.map((item) => (
              <div
                key={item.question}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6"
              >
                <dt className="font-bold text-slate-900 mb-2">{item.question}</dt>
                <dd className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="inline-flex bg-[#25D366] hover:bg-[#1fb855] text-white font-bold px-8 py-4 rounded-full transition shadow-md"
          >
            Book laundry pickup on WhatsApp — {PHONE_DISPLAY}
          </button>
        </div>
      </div>
    </section>
  );
}

export default SeoContentSection;
