import { createContext, useContext, useMemo, useState } from "react";
import { CAROUSEL_BANNERS } from "../constants";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";

const CarouselStripContext = createContext(null);

const DARK_CAROUSEL_THEMES = new Set(["brand", "express"]);

export function isCarouselThemeDark(theme) {
  return DARK_CAROUSEL_THEMES.has(theme);
}

/** Strip inverts carousel: blue carousel → white strip, light carousel → blue strip */
export function getStripToneForCarouselTheme(theme) {
  if (theme === "tiranga") return "tiranga";
  return isCarouselThemeDark(theme) ? "white" : "blue";
}

function getInitialCarouselTheme() {
  if (isHomeTirangaThemeActive()) return "tiranga";
  return CAROUSEL_BANNERS[0]?.theme ?? "express";
}

export function CarouselStripProvider({ children }) {
  const initialTheme = getInitialCarouselTheme();
  const [carouselTheme, setCarouselTheme] = useState(initialTheme);
  const homeTiranga = isHomeTirangaThemeActive();

  const value = useMemo(
    () => ({
      carouselTheme,
      stripTone: getStripToneForCarouselTheme(carouselTheme),
      homeTiranga,
      setCarouselTheme,
    }),
    [carouselTheme, homeTiranga],
  );

  return (
    <CarouselStripContext.Provider value={value}>{children}</CarouselStripContext.Provider>
  );
}

export function useCarouselStrip() {
  const ctx = useContext(CarouselStripContext);
  if (!ctx) {
    throw new Error("useCarouselStrip must be used within CarouselStripProvider");
  }
  return ctx;
}
