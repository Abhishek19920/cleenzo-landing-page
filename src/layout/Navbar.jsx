import logo from "../assets/image/cleenzo-logo.png";

const links = [
  { label: "Offers", href: "#offers" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Process", href: "#process" },
  { label: "Why us", href: "#why" },
];

function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        <a href="/" className="text-2xl md:text-3xl font-black text-black">
          <img
            src={logo}
            alt="Cleenzo — laundry and dry cleaning in Raj Nagar, Ghaziabad"
            className="w-40 md:w-52 h-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-6 text-base font-medium text-slate-700">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-black transition"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            className="bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-full hover:bg-cyan-300 transition"
          >
            Download the app now
          </a>
        </div>

        <a
          href="#download"
          className="md:hidden bg-cyan-400 text-black font-bold px-4 py-2 rounded-full text-sm"
        >
          Get app
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
