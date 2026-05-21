import { openWhatsAppBooking } from "../whatsapp";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why us", href: "#why" },
  { label: "App", href: "#download" },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        <a href="/" className="text-2xl md:text-3xl font-black text-black">
          Cleenzo
        </a>

        <div className="hidden md:flex items-center gap-8 text-base font-medium text-slate-700">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-black transition">
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="bg-[#25D366] text-white font-bold px-5 py-2.5 rounded-full hover:bg-[#1fb855] transition"
          >
            Book on WhatsApp
          </button>
        </div>

        <button
          type="button"
          onClick={() => openWhatsAppBooking()}
          className="md:hidden bg-[#25D366] text-white font-bold px-4 py-2 rounded-full text-sm"
        >
          Book
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
