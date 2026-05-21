import { APP_LINKS } from "../constants";

function DownloadApp() {
  return (
    <section id="download" className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-widest font-bold text-sm mb-3 text-white/80">
            Download now
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Get the Cleenzo app
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
            Track express deliveries live, view history, get notifications, and
            book faster than chat — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={APP_LINKS.android}
              className="inline-flex items-center justify-center gap-3 bg-black text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-900 transition"
            >
              <span className="text-2xl">▶</span>
              <span>
                <span className="block text-xs font-normal opacity-80">Get it on</span>
                Google Play
              </span>
            </a>
            <a
              href={APP_LINKS.ios}
              className="inline-flex items-center justify-center gap-3 bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transition"
            >
              <span className="text-2xl">🍎</span>
              <span>
                <span className="block text-xs font-normal opacity-80">Download on the</span>
                App Store
              </span>
            </a>
          </div>

          <p className="mt-6 text-sm text-white/70">
            App links coming soon — book on WhatsApp meanwhile!
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-black/20 backdrop-blur border border-white/20 rounded-[40px] p-8 w-full max-w-xs shadow-2xl">
            <div className="bg-white text-black rounded-3xl p-6 text-center">
              <p className="text-4xl mb-2">📱</p>
              <p className="font-black text-2xl">Cleenzo</p>
              <p className="text-slate-500 text-sm mt-1">Laundry, simplified</p>
              <div className="mt-6 space-y-2 text-left text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span>Active order</span>
                  <span className="font-bold text-cyan-600">#CLZ2045</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Status</span>
                  <span className="text-green-600 font-semibold">Out for delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadApp;
