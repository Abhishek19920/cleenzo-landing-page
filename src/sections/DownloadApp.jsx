import { APP_COMING_SOON } from "../constants";
import { showPreLaunchUI } from "../preLaunch";
import AppStoreButtons from "./AppStoreButtons";
import PlaceOrderCTA from "../components/PlaceOrderCTA";

function DownloadApp() {
  const preLaunch = showPreLaunchUI();
  return (
    <section id="download" className="bg-gradient-to-br from-cleenzo-deep via-cleenzo to-cleenzo-light text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <p className="uppercase tracking-widest font-bold text-sm mb-3 text-cleenzo-sky">
            Cleenzo mobile app
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Get your clothes cleaned with a tap
          </h2>
          <p className="text-cleenzo-pale mb-4 max-w-lg leading-relaxed text-sm sm:text-base">
            {preLaunch
              ? "Schedule pickup, track express laundry delivery & pay online — launching soon with our store opening."
              : "Schedule pickup, track express laundry delivery & pay online — book on the website while our app rolls out."}
          </p>
          {preLaunch && (
            <p className="inline-block bg-white/15 border border-white/25 text-cleenzo-sky text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg mb-6">
              {APP_COMING_SOON.title}
            </p>
          )}
          <AppStoreButtons variant="onDark" />
        </div>

        <div className="flex justify-center">
          <div className="bg-black/20 backdrop-blur border border-white/20 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 w-full max-w-xs shadow-2xl">
            <div className="bg-white text-black rounded-3xl p-6 text-center">
              <p className="text-4xl mb-2">📱</p>
              <p className="font-black text-2xl">Cleenzo</p>
              <p className="text-slate-500 text-sm mt-1">Laundry · Dry clean · Home care</p>
              <p className="text-cleenzo text-xs font-bold mt-3 uppercase tracking-wide">
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </div>

      <PlaceOrderCTA title="To place your order" variant="dark" className="!bg-cleenzo-dark/40" />
    </section>
  );
}

export default DownloadApp;
