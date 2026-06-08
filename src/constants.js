export const WHATSAPP_NUMBER = "919711924411";

export const WHATSAPP_BOOKING_MESSAGE =
  "Hi Cleenzo! I'd like to book a laundry pickup. Please share available slots.";

export const PHONE_DISPLAY = "+91 97119 24411";

export const PHONE_TEL = "+919711924411";

export const STORE_ADDRESS =
  "LGF-19, AVS City Square, Raj Nagar Extn, Ghaziabad — 201017";

export const STORE_ADDRESS_LINES = [
  "LGF-19, AVS City Square",
  "Raj Nagar Extn, Ghaziabad",
  "201017",
];

export const STORE_MAP_QUERY = encodeURIComponent(
  "LGF-19 AVS City Square Raj Nagar Extn Ghaziabad 201017",
);

export const STORE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${STORE_MAP_QUERY}`;

export const DISCOUNT = {
  label: "Limited offer",
  headline: "Get 20% OFF on your first order",
  subtext: "Book via WhatsApp today — mention code CLEENZO20",
  code: "CLEENZO20",
};

export const APP_LINKS = {
  android: "#",
  ios: "#",
};

export const USP = {
  badge: "Our promise",
  headline: "Every delivery is express",
  description:
    "No slow lanes or extra charges — fast turnaround and doorstep delivery on every Cleenzo order.",
};

export const STORE_LAUNCH = {
  label: "Grand opening",
  dateDisplay: "16 June 2026",
  launchDate: "2026-06-16",
  headline: "Store goes live soon!",
  message:
    "We're opening our Cleenzo store on 16 June 2026 — right after 15 June. Download the app and get ready for express laundry at your doorstep.",
};

export const ENABLE_LAUNCH_GATE =
  process.env.REACT_APP_DISABLE_LAUNCH_GATE !== "true";

export const CORE_SERVICES = [
  { name: "Laundry", desc: "Wash & fold for everyday wear", icon: "🧺" },
  { name: "Dry Clean", desc: "Suits, silk & delicate fabrics", icon: "🧥" },
  { name: "Sofa Clean", desc: "Deep upholstery cleaning", icon: "🛋️" },
  { name: "Carpet Clean", desc: "Stain-free carpet refresh", icon: "🧶" },
  { name: "Steam Iron", desc: "Crisp press & finish", icon: "👔" },
];

export const FABRIC_SERVICES = [
  {
    name: "Suits & Blazers",
    desc: "Formal wear cleaned with sharp finishing.",
    gradient: "from-slate-700 to-slate-900",
  },
  {
    name: "Sarees & Ethnic",
    desc: "Silk & embroidered wear handled with care.",
    gradient: "from-rose-600 to-orange-700",
  },
  {
    name: "Winter Wear",
    desc: "Coats & jackets refreshed like new.",
    gradient: "from-blue-700 to-indigo-900",
  },
  {
    name: "Kurtas & Sherwanis",
    desc: "Zari & embroidery preserved safely.",
    gradient: "from-amber-600 to-yellow-700",
  },
  {
    name: "Dresses & Gowns",
    desc: "Party & bridal wear precision care.",
    gradient: "from-fuchsia-600 to-pink-700",
  },
  {
    name: "Home Textiles",
    desc: "Curtains, drapes & soft furnishings.",
    gradient: "from-teal-600 to-cyan-800",
  },
  {
    name: "Shoes & Bags",
    desc: "Premium shoe & bag cleaning service.",
    gradient: "from-stone-600 to-stone-800",
  },
  {
    name: "Daily Laundry",
    desc: "Affordable wash for everyday clothes.",
    gradient: "from-emerald-600 to-green-800",
  },
];

export const APP_PROMO_STEPS = [
  { icon: "📅", label: "Schedule free pickup" },
  { icon: "📍", label: "Track your order" },
  { icon: "💳", label: "Pay online easily" },
];

export const DRY_CLEAN_PROCESS = [
  {
    title: "Care label check",
    desc: "Fabric, colour & stain inspection before cleaning.",
    icon: "🏷️",
  },
  {
    title: "Pre-treatment",
    desc: "Targeted stain removal for oil, ink & food marks.",
    icon: "💧",
  },
  {
    title: "Dry cleaning",
    desc: "Professional solvent wash for delicate garments.",
    icon: "🧺",
  },
  {
    title: "Finishing",
    desc: "Steam press for a crisp, ready-to-wear look.",
    icon: "👔",
  },
  {
    title: "Quality check",
    desc: "Expert review before packing your order.",
    icon: "✅",
  },
  {
    title: "Express delivery",
    desc: "Neat packing & fast doorstep return.",
    icon: "🚚",
  },
];

export const WHY_CLEENZO_USP = [
  {
    title: "Eco-friendly solvents",
    desc: "Safe, fabric-friendly cleaning for your family.",
  },
  {
    title: "Advanced fabric care",
    desc: "Colour-safe tech for shrink & bleed protection.",
  },
  {
    title: "Stain removal expertise",
    desc: "Tough stains treated with professional methods.",
  },
  {
    title: "Hygiene-first handling",
    desc: "Clean processes from pickup to packed delivery.",
  },
];

export const OFFERS = {
  headline: "Offers that save more",
  items: [
    { icon: "👕", title: "WASH 5 CLOTHES", price: "@ ₹299", highlight: true },
    { icon: "👟", title: "FREE SHOE CLEANING", price: "On orders above ₹999" },
    { icon: "🧺", title: "FIRST ORDER", price: "Starting @ ₹99" },
    { icon: "🚚", title: "Free Pickup & Delivery", price: "On every order" },
  ],
  benefits: [
    "Premium Laundry & Dry Cleaning",
    "Shoe & Bag Cleaning",
    "Imported Fabric Care Chemicals",
  ],
};

export const CAROUSEL_BANNERS = [
  {
    id: "hero",
    theme: "light",
    badge: "⚡ Express delivery on every order",
    title: "Fresh clothes, one tap away",
    titleAccent: "laundry & dry cleaning near you",
    subtitle: "Free pickup • Premium fabric care • Track orders in the Cleenzo app",
    primaryCta: { label: "Schedule free pickup", action: "schedule" },
    secondaryCta: { label: "Download app", action: "link", href: "#download" },
    visual: { emoji: "📱", title: "Cleenzo", tagline: "Book · Track · Delivered" },
  },
  {
    id: "offers",
    theme: "warm",
    badge: "🔥 Hot deals — better than flat discount",
    title: "Offers that save more",
    subtitle: "Book laundry pickup today & unlock exclusive Cleenzo deals",
    primaryCta: { label: "Schedule free pickup", action: "schedule" },
    secondaryCta: { label: "Chat on WhatsApp", action: "whatsapp" },
    highlightOffer: { icon: "👕", title: "WASH 5 CLOTHES", price: "@ ₹299" },
    miniOffers: [
      { icon: "👟", text: "Free shoe cleaning above ₹999" },
      { icon: "🧺", text: "First order from ₹99" },
    ],
  },
  {
    id: "services",
    theme: "brand",
    badge: "🧺 Professional home & wardrobe care",
    title: "Laundry · Dry clean · Sofa & carpet",
    subtitle: "Steam iron, shoe cleaning & imported fabric-safe chemicals",
    primaryCta: { label: "Explore services", action: "link", href: "#services" },
    secondaryCta: { label: "Get a quote", action: "whatsapp" },
    serviceTags: ["Laundry", "Dry clean", "Sofa", "Carpet", "Steam iron"],
    visual: { emoji: "✨", title: "Premium care", tagline: "Every fabric, every garment" },
  },
];

export const CAROUSEL_AUTOPLAY_MS = 5500;
export const CAROUSEL_TRANSITION_MS = 700;
