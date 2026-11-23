import { APP_LINKS } from "../constants";
import { AppStoreIcon, GooglePlayIcon } from "../components/StoreLogos";
import { isAppDownloadAvailable } from "../context/AppDownloadContext";

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

function StoreButton({ platform, variant }) {
  const styles = variants[variant] || variants.onLight;
  const href = platform === "android" ? APP_LINKS.android : APP_LINKS.ios;
  const canDownload =
    platform === "android"
      ? isAppDownloadAvailable()
      : Boolean(href && href !== "#");
  const className = `inline-flex items-center justify-center gap-3 font-bold px-6 py-3.5 rounded-2xl transition min-w-[200px] w-full sm:w-auto ${
    platform === "android" ? styles.android : styles.ios
  }`;

  const content =
    platform === "android" ? (
      <>
        <GooglePlayIcon className="w-8 h-8 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-normal opacity-80">
            Direct download
          </span>
          Android APK
        </span>
      </>
    ) : (
      <>
        <AppStoreIcon className={`w-8 h-8 shrink-0 ${styles.iosIcon}`} />
        <span className="text-left leading-tight">
          <span className="block text-xs font-normal opacity-80">
            Direct download
          </span>
          iPhone / iPad
        </span>
      </>
    );

  if (!canDownload) {
    return <span className={`${className} opacity-75`}>{content}</span>;
  }

  return (
    <a
      href={href}
      download={platform === "android" ? "cleenzo-user.apk" : "cleenzo-user.apk"}
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}

function AppStoreButtons({ className = "", variant = "onLight" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <StoreButton platform="android" variant={variant} />
        <StoreButton platform="ios" variant={variant} />
      </div>
      <p className="text-xs opacity-70 max-w-md">
        Install the APK on Android (allow install from this site if asked).
        iPhone cannot install APK files — use an Android phone, or ask us when
        the App Store listing is live.
      </p>
    </div>
  );
}

export default AppStoreButtons;
