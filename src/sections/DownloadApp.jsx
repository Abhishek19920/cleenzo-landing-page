import AppStoreButtons from "./AppStoreButtons";

function DownloadApp() {
  return (
    <section id="download" className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-widest font-bold text-sm mb-3 text-white/80">
            Available on iOS & Android
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Download the app now
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
            Get express laundry pickup and delivery from your phone. Simple,
            fast, and built for your daily routine.
          </p>

          <AppStoreButtons variant="light" />

          <p className="mt-6 text-sm text-white/70">
            Store links coming soon — use WhatsApp on the homepage if you need help today.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-black/20 backdrop-blur border border-white/20 rounded-[40px] p-8 w-full max-w-xs shadow-2xl">
            <div className="bg-white text-black rounded-3xl p-6 text-center">
              <p className="text-4xl mb-2">📱</p>
              <p className="font-black text-2xl">Cleenzo</p>
              <p className="text-slate-500 text-sm mt-1">Laundry, simplified</p>
              <p className="mt-4 text-sm text-slate-600">
                Express pickup · Express delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadApp;
