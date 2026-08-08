import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CleenzoLogo, { CLEENZO_LOGO_ALT } from "../components/CleenzoLogo";
import { useCommercialNav } from "../commercial/CommercialNavContext";
import {
  COMMERCIAL_PAGE_PATH,
  COMMERCIAL_SECTIONS,
  RETAIL_SITE_LABEL,
} from "../commercial/nav";

function CommercialNavbar() {
  const { activeSection, scrollToSection, scrollToTop } = useCommercialNav();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const handleSectionClick = (sectionId) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="bg-[#0A3D91]/5 border-b border-[#0A3D91]/10">
        <div className="max-w-7xl mx-auto px-0 py-1 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <p className="text-slate-600 hidden sm:block">
            B2B commercial laundry for hotels, restaurants & businesses
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-semibold text-[#0A3D91] hover:text-[#072d6b] transition ml-auto"
          >
            <span aria-hidden="true" className="text-base">
              ←
            </span>
            {RETAIL_SITE_LABEL}
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-0 py-1.5 sm:py-2 flex items-center justify-between gap-4">
        <Link
          to={COMMERCIAL_PAGE_PATH}
          className="flex items-center gap-2 shrink-0"
          onClick={(event) => {
            closeMenu();
            event.preventDefault();
            scrollToTop();
          }}
        >
          <CleenzoLogo
            alt={`${CLEENZO_LOGO_ALT} — Commercial`}
            className="h-7 sm:h-8 w-auto object-contain"
            width={120}
            height={54}
          />
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#0A3D91] text-white text-xs font-bold uppercase tracking-wide">
            Commercial
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 hover:text-[#0A3D91] px-3 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            {RETAIL_SITE_LABEL}
          </Link>
          <button
            type="button"
            onClick={() => handleSectionClick("commercial-enquiry")}
            className="bg-[#0A3D91] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#072d6b] transition"
          >
            Request Quote
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      <div className="hidden lg:block border-t border-slate-100 bg-white">
        <div
          className="max-w-7xl mx-auto px-0 py-2 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Commercial page sections"
        >
          {COMMERCIAL_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSectionClick(section.id)}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold border transition ${
                  isActive
                    ? "bg-[#0A3D91] border-[#0A3D91] text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-[#0A3D91]/30"
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0A3D91] font-bold text-sm mb-2"
          >
            <span aria-hidden="true">←</span>
            {RETAIL_SITE_LABEL}
          </Link>
          {COMMERCIAL_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionClick(section.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
                  isActive
                    ? "bg-[#0A3D91] text-white"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {section.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleSectionClick("commercial-enquiry")}
            className="block w-full text-center mt-3 bg-[#0A3D91] text-white font-bold px-4 py-3 rounded-xl"
          >
            Request Quote
          </button>
        </div>
      ) : null}
    </header>
  );
}

export default CommercialNavbar;
