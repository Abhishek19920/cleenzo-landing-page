import { createContext, useContext, useMemo, useState } from "react";
import { CAROUSEL_BANNERS } from "../constants";

const CarouselStripContext = createContext(null);

const DARK_CAROUSEL_THEMES = new Set(["brand", "express"]);

export function isCarouselThemeDark(theme) {
  return DARK_CAROUSEL_THEMES.has(theme);
}

/** Strip inverts carousel: blue carousel → white strip, light carousel → blue strip */
export function getStripToneForCarouselTheme(theme) {
  return isCarouselThemeDark(theme) ? "white" : "blue";
}

export function CarouselStripProvider({ children }) {
  const initialTheme = CAROUSEL_BANNERS[0]?.theme ?? "express";
  const [carouselTheme, setCarouselTheme] = useState(initialTheme);

  const value = useMemo(
    () => ({
      carouselTheme,
      stripTone: getStripToneForCarouselTheme(carouselTheme),
      setCarouselTheme,
    }),
    [carouselTheme],
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
