import { APP_LINKS } from "../constants";
import { AppStoreIcon, GooglePlayIcon } from "../components/StoreLogos";
import { isAppDownloadAvailable, useAppDownload } from "../context/AppDownloadContext";

const variants = {
  onLight: {
    android: "bg-black text-white hover:bg-slate-900",
    ios: "bg-black text-white hover:bg-slate-900",
    iosIcon: "text-white",
  },
  onDark: {
    android: "bg-black text-white hover:bg-slate-900",
    ios: "bg-black text-white hover:bg-slate-900",
    iosIcon: "text-white",
  },
};

function StoreButton({ platform, variant, onAppClick }) {
  const styles = variants[variant] || variants.onLight;
  const href = platform === "android" ? APP_LINKS.android : APP_LINKS.ios;
  const canOpenStore = platform === "android" ? isAppDownloadAvailable() : Boolean(href && href !== "#");
  const className = `inline-flex items-center justify-center gap-3 font-bold px-6 py-3.5 rounded-2xl transition min-w-[200px] w-full sm:w-auto ${
    platform === "android" ? styles.android : styles.ios
  }`;

  const content =
    platform === "android" ? (
      <>
        <GooglePlayIcon className="w-8 h-8 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-normal opacity-80">Download</span>
          Android app
        </span>
      </>
    ) : (
      <>
        <AppStoreIcon className={`w-8 h-8 shrink-0 ${styles.iosIcon}`} />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-normal opacity-80">Download on the</span>
          App Store
        </span>
      </>
    );

  if (!canOpenStore) {
    return (
      <button
        type="button"
        onClick={onAppClick}
        className={className}
        aria-label={`${platform === "android" ? "Android" : "App Store"} app coming soon`}
      >
        {content}
      </button>
    );
  }

  return (
    <a href={href} rel="noopener noreferrer" className={className}>
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
