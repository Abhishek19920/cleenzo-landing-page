import { createContext, useCallback, useContext, useMemo, useState } from "react";
import SchedulePickupModal from "../components/SchedulePickupModal";

const SchedulePickupContext = createContext(null);

const HOME_VISIT_PATHS = new Set([
  "/sofa-cleaning",
  "/carpet-cleaning",
  "/curtain-cleaning",
]);

const PATH_PREFILL = {
  "/sofa-cleaning": ["Sofa Cleaning"],
  "/carpet-cleaning": ["Carpet Cleaning"],
  "/curtain-cleaning": ["Curtain Cleaning"],
};

export function isHomeVisitServicePath(pathname) {
  if (!pathname) return false;
  const key = pathname.replace(/\/+$/, "") || "/";
  return HOME_VISIT_PATHS.has(key);
}

export function SchedulePickupProvider({ children }) {
  const [pickupOpen, setPickupOpen] = useState(false);
  const [homeVisit, setHomeVisit] = useState(null);

  const openSchedulePickup = useCallback(() => {
    setPickupOpen(true);
  }, []);

  const openScheduleHomeVisit = useCallback((opts = {}) => {
    setHomeVisit({
      initialServices: opts.initialServices || [],
    });
  }, []);

  const openForPath = useCallback(
    (pathname) => {
      const key = (pathname || "").replace(/\/+$/, "") || "/";
      if (HOME_VISIT_PATHS.has(key)) {
        openScheduleHomeVisit({ initialServices: PATH_PREFILL[key] || [] });
        return;
      }
      openSchedulePickup();
    },
    [openScheduleHomeVisit, openSchedulePickup],
  );

  const value = useMemo(
    () => ({
      openSchedulePickup,
      openScheduleHomeVisit,
      openForPath,
      closeSchedulePickup: () => setPickupOpen(false),
      closeScheduleHomeVisit: () => setHomeVisit(null),
    }),
    [openSchedulePickup, openScheduleHomeVisit, openForPath],
  );

  return (
    <SchedulePickupContext.Provider value={value}>
      {children}
      {pickupOpen ? (
        <SchedulePickupModal
          variant="pickup"
          onClose={() => setPickupOpen(false)}
        />
      ) : null}
      {homeVisit ? (
        <SchedulePickupModal
          variant="home-visit"
          initialServices={homeVisit.initialServices}
          onClose={() => setHomeVisit(null)}
        />
      ) : null}
    </SchedulePickupContext.Provider>
  );
}

export function useSchedulePickup() {
  const ctx = useContext(SchedulePickupContext);
  if (!ctx) {
    throw new Error("useSchedulePickup must be used within SchedulePickupProvider");
  }
  return ctx;
}
