import { openWhatsAppBooking } from "../whatsapp";
import AppStoreButtons from "./AppStoreButtons";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white min-h-[92vh] flex items-center pt-8">
      <div className="absolute top-[-120px] left-[-80px] w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-80px] w-80 h-80 bg-emerald-500/15 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-400/20 border border-cyan-400/30 px-4 py-2 rounded-full text-sm mb-6">
            <span>⚡</span> Express delivery on every order
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-6">
            Premium laundry,
            <br />
            <span className="text-cyan-400">delivered express.</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Download the Cleenzo app for express laundry pickup and delivery.
            Or chat with us on WhatsApp — we&apos;re here to help.
          </p>

          <a
            href="#download"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-black font-black px-10 py-5 rounded-2xl text-lg text-center transition shadow-lg shadow-cyan-400/30 mb-5"
          >
            📱 Download the app now
          </a>

          <AppStoreButtons className="mb-6" />

          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="text-[#25D366] font-semibold hover:underline text-sm"
          >
            💬 Prefer WhatsApp? Chat with us →
          </button>

          <div className="flex flex-wrap gap-6 mt-10 text-sm text-slate-400">
            <span>✓ Express delivery</span>
            <span>✓ Free pickup</span>
            <span>✓ Premium care</span>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 w-full max-w-sm shadow-2xl">
            <div className="bg-white text-black rounded-3xl p-6 text-center mb-5">
              <p className="text-5xl mb-2">📱</p>
              <p className="font-black text-2xl">Cleenzo</p>
              <p className="text-slate-500 text-sm mt-1">Laundry, simplified</p>
              <a
                href="#download"
                className="mt-5 block w-full bg-cyan-400 text-black font-bold py-3 rounded-xl hover:bg-cyan-300 transition"
              >
                Download the app now
              </a>
            </div>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-lg">
                💬
              </div>
              <div>
                <p className="font-bold text-sm">Need help?</p>
                <p className="text-green-400 text-xs">WhatsApp us anytime</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openWhatsAppBooking()}
              className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#1fb855] transition text-sm"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
