import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/cleenzo-logo.png";
import { COMMERCIAL_NAV_LINKS, RETAIL_SITE_LABEL } from "../commercial/nav";

function CommercialNavbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-[#0A3D91]/5 border-b border-[#0A3D91]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between gap-3 text-sm">
          <p className="text-slate-600 hidden sm:block">
            B2B commercial laundry for hotels, restaurants & businesses
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-semibold text-[#0A3D91] hover:text-[#072d6b] transition ml-auto"
          >
            <span aria-hidden="true" className="text-base">←</span>
            {RETAIL_SITE_LABEL}
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <Link to="/commercial-laundry" className="flex items-center gap-3 shrink-0" onClick={closeMenu}>
          <img
            src={logo}
            alt="Cleenzo Commercial"
            className="h-9 md:h-10 w-auto object-contain"
          />
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#0A3D91] text-white text-xs font-bold uppercase tracking-wide">
            Commercial
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {COMMERCIAL_NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#0A3D91] transition">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 hover:text-[#0A3D91] px-3 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            {RETAIL_SITE_LABEL}
          </Link>
          <a
            href="#commercial-enquiry"
            className="bg-[#0A3D91] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#072d6b] transition"
          >
            Request Quote
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0A3D91] font-bold text-sm mb-2"
          >
            <span aria-hidden="true">←</span>
            {RETAIL_SITE_LABEL}
          </Link>
          {COMMERCIAL_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#commercial-enquiry"
            onClick={closeMenu}
            className="block text-center mt-3 bg-[#0A3D91] text-white font-bold px-4 py-3 rounded-xl"
          >
            Request Quote
          </a>
        </div>
      )}
    </header>
  );
}

export default CommercialNavbar;
