const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why us", href: "#why" },
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
