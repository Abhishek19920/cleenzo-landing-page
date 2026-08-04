import { Link } from "react-router-dom";
import logo from "../assets/image/cleenzo-logo.png";
import SocialLinks from "../components/SocialLinks";
import { useAppDownload } from "../context/AppDownloadContext";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS_LINES,
  STORE_MAPS_URL,
} from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

const HUB_LINKS = [
  { label: "Home", to: "/" },
  { label: "Laundry", to: "/laundry-service-ghaziabad" },
  { label: "Dry Cleaning", to: "/dry-cleaning-ghaziabad" },
  { label: "Shoe Cleaning", to: "/shoe-cleaning" },
  { label: "Commercial Laundry", to: "/commercial-laundry" },
];

const SERVICE_LINKS = [
  { label: "Dry cleaners Raj Nagar Extn", to: "/dry-cleaners-raj-nagar-extension" },
  { label: "Sofa cleaning", to: "/sofa-cleaning" },
  { label: "Carpet cleaning", to: "/carpet-cleaning" },
  { label: "Curtain cleaning", to: "/curtain-cleaning" },
  { label: "About Cleenzo", to: "/about" },
  { label: "Blog", to: "/blog" },
];

function Footer() {
  const telHref = `tel:${PHONE_TEL}`;
  const mapsHref = STORE_MAPS_URL;
  const { openAppDownload } = useAppDownload();

  return (
    <footer className="bg-black text-white py-12 px-6 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="inline-block mb-3">
            <img
              src={logo}
              alt="Cleenzo — laundry and dry cleaning in Raj Nagar, Ghaziabad"
              className="w-40 md:w-48 h-auto object-contain bg-white rounded-xl px-3 py-2"
            />
          </Link>
          <p className="text-slate-400 text-sm mb-4">Premium laundry · Express delivery</p>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
              Follow us
            </p>
            <SocialLinks className="justify-center md:justify-start" />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            Quick links
          </p>
          <ul className="space-y-2 text-sm mb-6">
            {HUB_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-slate-300 hover:text-white transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            More services
          </p>
          <ul className="space-y-2 text-sm">
            {SERVICE_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-slate-300 hover:text-white transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            Visit our store
          </p>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 text-sm leading-relaxed hover:text-white transition inline-block"
          >
            {STORE_ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </a>
        </div>

        <div className="flex flex-col gap-3 text-sm md:items-end">
          <button
            type="button"
            onClick={openAppDownload}
            className="text-cleenzo-sky font-semibold hover:underline text-left md:text-right"
          >
            Get the Cleenzo app
          </button>
          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="text-[#25D366] font-semibold hover:underline"
          >
            WhatsApp: {PHONE_DISPLAY}
          </button>
          <a href={telHref} className="text-slate-400 hover:text-white">
            Call: {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <p className="text-center text-slate-500 text-xs mt-10">
        © {new Date().getFullYear()} Cleenzo. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
