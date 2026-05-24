import { APP_LINKS } from "../constants";

function AppStoreButtons({ className = "", variant = "dark" }) {
  const iosClass =
    variant === "light"
      ? "bg-white/20 border border-white/30 text-white hover:bg-white/30"
      : "bg-white/15 border border-white/25 text-white hover:bg-white/25";

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href={APP_LINKS.android}
        className="inline-flex items-center justify-center gap-3 bg-black text-white font-bold px-6 py-3.5 rounded-2xl hover:bg-slate-900 transition"
      >
        <span className="text-xl">▶</span>
        <span>
          <span className="block text-[10px] font-normal opacity-80">Get it on</span>
          Google Play
        </span>
      </a>
      <a
        href={APP_LINKS.ios}
        className={`inline-flex items-center justify-center gap-3 font-bold px-6 py-3.5 rounded-2xl transition ${iosClass}`}
      >
        <span className="text-xl">🍎</span>
        <span>
          <span className="block text-[10px] font-normal opacity-80">Download on the</span>
          App Store
        </span>
      </a>
    </div>
  );
}

export default AppStoreButtons;
