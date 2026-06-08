import { createContext, useContext, useMemo, useState } from "react";
import SchedulePickupModal from "../components/SchedulePickupModal";

const SchedulePickupContext = createContext(null);

export function SchedulePickupProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      openSchedulePickup: () => setIsOpen(true),
      closeSchedulePickup: () => setIsOpen(false),
    }),
    [],
  );

  return (
    <SchedulePickupContext.Provider value={value}>
      {children}
      {isOpen && <SchedulePickupModal onClose={() => setIsOpen(false)} />}
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
