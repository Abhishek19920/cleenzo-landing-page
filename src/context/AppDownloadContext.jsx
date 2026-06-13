import { createContext, useContext, useMemo, useState } from "react";
import AppComingSoonModal from "../components/AppComingSoonModal";
import { APP_IS_LIVE, APP_LINKS } from "../constants";

const AppDownloadContext = createContext(null);

export function isAppDownloadAvailable() {
  return APP_IS_LIVE && APP_LINKS.android !== "#" && APP_LINKS.ios !== "#";
}

export function AppDownloadProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      openAppDownload: () => {
        if (isAppDownloadAvailable()) {
          window.location.hash = "download";
          return;
        }
        setIsOpen(true);
      },
      closeAppDownload: () => setIsOpen(false),
    }),
    [],
  );

  return (
    <AppDownloadContext.Provider value={value}>
      {children}
      {isOpen && <AppComingSoonModal onClose={() => setIsOpen(false)} />}
    </AppDownloadContext.Provider>
  );
}

export function useAppDownload() {
  const ctx = useContext(AppDownloadContext);
  if (!ctx) {
    throw new Error("useAppDownload must be used within AppDownloadProvider");
  }
  return ctx;
}
