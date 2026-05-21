import { openWhatsAppBooking } from "../whatsapp";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white min-h-[92vh] flex items-center pt-8">
      <div className="absolute top-[-120px] left-[-80px] w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-80px] w-80 h-80 bg-emerald-500/15 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-400/20 border border-cyan-400/30 px-4 py-2 rounded-full text-sm mb-4">
            <span>⚡</span> Express delivery on every order
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm mb-6 ml-0 sm:ml-3">
            <span className="text-green-400">●</span> Book on WhatsApp in 30 seconds
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-6">
            Premium laundry,
            <br />
            <span className="text-cyan-400">delivered express.</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Fast pickup, premium cleaning, and express doorstep delivery — always.
            Book on WhatsApp or track live in the Cleenzo app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => openWhatsAppBooking()}
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-bold px-8 py-4 rounded-2xl text-center transition shadow-lg shadow-green-500/20"
            >
              💬 Book on WhatsApp
            </button>
            <a
              href="#download"
              className="border border-white/20 bg-white/5 px-8 py-4 rounded-2xl text-center font-semibold hover:bg-white/10 transition"
            >
              Download App
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-10 text-sm text-slate-400">
            <span>✓ Express delivery</span>
            <span>✓ Free pickup</span>
            <span>✓ Live tracking</span>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <p className="font-bold">Cleenzo Support</p>
                <p className="text-green-400 text-sm">Online now</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                Hi! 👋 Ready to schedule your laundry pickup?
              </div>
              <div className="bg-cyan-500/20 text-cyan-100 rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto">
                Yes! 2 bags, tomorrow morning please.
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                Done ✅ Pickup booked for 9–11 AM. Track in the app!
              </div>
            </div>
            <button
              type="button"
              onClick={() => openWhatsAppBooking()}
              className="mt-6 w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#1fb855] transition"
            >
              Start chat to book
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
