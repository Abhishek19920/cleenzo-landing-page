import { APP_LINKS } from "../constants";
import { isAppDownloadAvailable, useAppDownload } from "../context/AppDownloadContext";

function AppleIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M3.609 1.814 13.792 12 3.61 22.186a1.203 1.203 0 0 1-.805-1.13V2.944a1.203 1.203 0 0 1 .804-1.13z" />
      <path fill="#FBBC04" d="M16.548 15.326 5.303 23.23l8.49-8.49 2.755 2.586z" />
      <path fill="#34A853" d="M3.61 1.814 16.548 8.674l-2.755 2.586L5.303.77z" />
      <path fill="#4285F4" d="M16.548 15.326 5.303 23.23l11.245-7.904a1.203 1.203 0 0 0 0-1.952z" />
    </svg>
  );
}

const variants = {
  onLight: {
    android: "bg-black text-white hover:bg-slate-900",
    ios: "bg-white text-black border-2 border-slate-900 hover:bg-slate-50",
    iosIcon: "text-black",
  },
  onDark: {
    android: "bg-black text-white hover:bg-slate-900",
    ios: "bg-white/15 border border-white/30 text-white hover:bg-white/25",
    iosIcon: "text-white",
  },
};

function StoreButton({ platform, variant, onAppClick }) {
  const styles = variants[variant] || variants.onLight;
  const isLive = isAppDownloadAvailable();
  const href = platform === "android" ? APP_LINKS.android : APP_LINKS.ios;
  const className = `inline-flex items-center justify-center gap-3 font-bold px-6 py-3.5 rounded-2xl transition min-w-[200px] w-full sm:w-auto ${
    platform === "android" ? styles.android : styles.ios
  }`;

  const content =
    platform === "android" ? (
      <>
        <GooglePlayIcon />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-normal opacity-80">Get it on</span>
          Google Play
        </span>
      </>
    ) : (
      <>
        <AppleIcon className={`w-7 h-7 shrink-0 ${styles.iosIcon}`} />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-normal opacity-80">Download on the</span>
          App Store
        </span>
      </>
    );

  if (!isLive) {
    return (
      <button type="button" onClick={onAppClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  );
}

function AppStoreButtons({ className = "", variant = "onLight" }) {
  const { openAppDownload } = useAppDownload();

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <StoreButton platform="android" variant={variant} onAppClick={openAppDownload} />
      <StoreButton platform="ios" variant={variant} onAppClick={openAppDownload} />
    </div>
  );
}

export default AppStoreButtons;
