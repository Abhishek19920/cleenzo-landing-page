import { Link } from "react-router-dom";
import logo from "../assets/image/cleenzo-logo.png";
import { useAppDownload } from "../context/AppDownloadContext";

const links = [
  { label: "Offers", href: "#offers" },
  { label: "Services", href: "#services" },
  { label: "Commercial B2B", to: "/commercial-laundry" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Process", href: "#process" },
  { label: "Why us", href: "#why" },
];

function Navbar() {
  const { openAppDownload } = useAppDownload();

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-cleenzo/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        <a href="/" className="text-2xl md:text-3xl font-black text-black">
          <img
            src={logo}
            alt="Cleenzo — laundry and dry cleaning in Raj Nagar, Ghaziabad"
            className="w-40 md:w-52 h-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-6 text-base font-medium text-slate-700">
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
            className="bg-cleenzo text-white font-bold px-5 py-2.5 rounded-full hover:bg-cleenzo-dark transition"
          >
            Get the app
          </button>
        </div>

        <button
          type="button"
          onClick={openAppDownload}
          className="md:hidden bg-cleenzo text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-cleenzo-dark"
        >
          Get app
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
