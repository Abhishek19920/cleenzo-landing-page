import AppStoreButtons from "./AppStoreButtons";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function DownloadApp() {
  return (
    <section id="download" className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-widest font-bold text-sm mb-3 text-white/80">
            Cleenzo mobile app
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Download the app now
          </h2>
          <p className="text-white/90 mb-8 max-w-lg leading-relaxed">
            Schedule pickup, track express laundry delivery & get offers — best
            dry cleaning app for busy homes in your city.
          </p>
          <AppStoreButtons variant="light" />
        </div>

        <div className="flex justify-center">
          <div className="bg-black/20 backdrop-blur border border-white/20 rounded-[40px] p-8 w-full max-w-xs shadow-2xl">
            <div className="bg-white text-black rounded-3xl p-6 text-center">
              <p className="text-4xl mb-2">📱</p>
              <p className="font-black text-2xl">Cleenzo</p>
              <p className="text-slate-500 text-sm mt-1">Laundry · Dry clean · Home care</p>
            </div>
          </div>
        </div>
      </div>

      <PlaceOrderCTA
        title="To place your order"
        variant="dark"
        className="!bg-blue-700/40"
      />
    </section>
  );
}

export default DownloadApp;
