import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/cleenzo-logo.png";
import { useAppDownload } from "../context/AppDownloadContext";

const links = [
  { label: "Offers", href: "#offers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Services", href: "#services" },
  { label: "Commercial B2B", to: "/commercial-laundry" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Process", href: "#process" },
  { label: "Why us", href: "#why" },
];

function Navbar() {
  const { openAppDownload } = useAppDownload();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-cleenzo/10 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-1.5 sm:py-2">
        <a href="/" className="shrink-0">
          <img
            src={logo}
            alt="Cleenzo — laundry and dry cleaning in Raj Nagar, Ghaziabad"
            className="w-28 sm:w-32 md:w-36 h-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700">
          {links.map((link) =>
            link.to ? (
              <Link key={link.to} to={link.to} className="hover:text-black transition">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={`/${link.href}`} className="hover:text-black transition">
                {link.label}
              </a>
            ),
          )}
          <button
            type="button"
            onClick={openAppDownload}
            className="bg-cleenzo text-white font-bold px-4 py-1.5 rounded-full text-sm hover:bg-cleenzo-dark transition"
          >
            Get the app
          </button>
        </div>

        <button
          type="button"
          onClick={openAppDownload}
          className="md:hidden bg-cleenzo text-white font-bold px-3 py-1.5 rounded-full text-xs hover:bg-cleenzo-dark"
        >
          Get app
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
