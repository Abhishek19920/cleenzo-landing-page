import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { COMMERCIAL_PAGE_PATH, COMMERCIAL_SECTIONS } from "./nav";

const CommercialNavContext = createContext(null);

export function CommercialNavProvider({ children }) {
  const { pathname, hash } = useLocation();
  const [activeSection, setActiveSection] = useState(null);
  const isCommercialPage = pathname === COMMERCIAL_PAGE_PATH;

  const scrollToTop = useCallback(() => {
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", COMMERCIAL_PAGE_PATH);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    setActiveSection(sectionId);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${COMMERCIAL_PAGE_PATH}#${sectionId}`);
  }, []);

  useEffect(() => {
    if (!isCommercialPage) return undefined;

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!hash) {
      window.scrollTo(0, 0);
      setActiveSection(null);
      return undefined;
    }

    const sectionId = hash.replace("#", "");
    const frame = window.requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "auto", block: "start" });
        setActiveSection(sectionId);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, isCommercialPage, pathname]);

  useEffect(() => {
    if (!isCommercialPage) return undefined;

    const sectionElements = COMMERCIAL_SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter(Boolean);
    const heroElement = document.getElementById("commercial-hero");

    if (!sectionElements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (heroElement) {
          const heroVisible = entries.find(
            (entry) => entry.target.id === "commercial-hero" && entry.isIntersecting,
          );
          if (heroVisible && window.scrollY < 120) {
            setActiveSection(null);
            return;
          }
        }

        const visible = entries
          .filter(
            (entry) =>
              entry.isIntersecting && COMMERCIAL_SECTIONS.some((s) => s.id === entry.target.id),
          )
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    if (heroElement) observer.observe(heroElement);
    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isCommercialPage, pathname]);

  const value = useMemo(
    () => ({
      activeSection,
      scrollToSection,
      scrollToTop,
      isCommercialPage,
    }),
    [activeSection, isCommercialPage, scrollToSection, scrollToTop],
  );

  return (
    <CommercialNavContext.Provider value={value}>{children}</CommercialNavContext.Provider>
  );
}

export function useCommercialNav() {
  const context = useContext(CommercialNavContext);
  if (!context) {
    throw new Error("useCommercialNav must be used within CommercialNavProvider");
  }
  return context;
}
