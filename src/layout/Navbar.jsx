import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/image/cleenzo-logo.png";
import { useAppDownload } from "../context/AppDownloadContext";

const links = [
  { label: "Offers", href: "/#offers" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Commercial B2B", to: "/commercial-laundry" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const serviceLinks = [
  { label: "All services overview", to: "/#services", hash: true },
  { label: "Laundry — Ghaziabad", to: "/laundry-service-ghaziabad" },
  { label: "Dry cleaning", to: "/dry-cleaning-ghaziabad" },
  { label: "Shoe cleaning", to: "/shoe-cleaning" },
  { label: "Sofa cleaning", to: "/sofa-cleaning" },
  { label: "Carpet cleaning", to: "/carpet-cleaning" },
];

function Navbar() {
  const { openAppDownload } = useAppDownload();
  const location = useLocation();
  const menuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!servicesOpen) return undefined;

    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setServicesOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-cleenzo/10 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-1.5 sm:py-2">
        <Link to="/" className="shrink-0" onClick={closeMobile}>
          <img
            src={logo}
            alt="Cleenzo — laundry and dry cleaning in Raj Nagar, Ghaziabad"
            className="w-28 sm:w-32 md:w-36 h-auto object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-slate-700">
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-black transition"
                onClick={
                  link.to === "/commercial-laundry"
                    ? () => window.scrollTo({ top: 0, behavior: "auto" })
                    : undefined
                }
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className="hover:text-black transition">
                {link.label}
              </a>
            ),
          )}

          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="hover:text-black transition inline-flex items-center gap-1 py-1"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
              <span
                className={`text-[10px] transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {servicesOpen ? (
              <div className="absolute left-0 top-full pt-2 z-50">
                <div
                  className="w-60 bg-white border border-slate-200 rounded-xl shadow-lg py-2"
                  role="menu"
                >
                  {serviceLinks.map((item) =>
                    item.hash ? (
                      <a
                        key={item.to}
                        href={item.to}
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-cleenzo-pale hover:text-cleenzo"
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-cleenzo-pale hover:text-cleenzo"
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={openAppDownload}
            className="bg-cleenzo text-white font-bold px-4 py-1.5 rounded-full text-sm hover:bg-cleenzo-dark transition"
          >
            Get the app
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openAppDownload}
            className="bg-cleenzo text-white font-bold px-3 py-1.5 rounded-full text-xs hover:bg-cleenzo-dark"
          >
            Get app
          </button>
          <button
            type="button"
            className="p-2 rounded-lg border border-slate-200 text-slate-700"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobile}
                className="block px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-50"
              >
                {link.label}
              </a>
            ),
          )}

          <p className="px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
            Services
          </p>
          {serviceLinks.map((item) =>
            item.hash ? (
              <a
                key={item.to}
                href={item.to}
                onClick={closeMobile}
                className="block px-4 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50 text-sm"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  closeMobile();
                  if (item.to === "/commercial-laundry") {
                    window.scrollTo({ top: 0, behavior: "auto" });
                  }
                }}
                className="block px-4 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50 text-sm"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
