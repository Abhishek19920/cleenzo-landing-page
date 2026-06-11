export const WHATSAPP_NUMBER = "919711924411";

export const WHATSAPP_BOOKING_MESSAGE =
  "Hi Cleenzo! I'd like to book a laundry pickup. Please share available slots.";

export const PHONE_DISPLAY = "+91 99992 25311";

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

export const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@CLEENZO_OFFICIAL",
    href: "https://www.instagram.com/cleenzo_official/",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "Cleenzo",
    href: "https://www.youtube.com/@CLEENZO_OFFICIAL",
  },
];

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

export const APP_PROMO_HEADLINE = {
  title: "Fresh clothes, one tap away",
  accent: "laundry & dry cleaning near you",
};

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

export const WHY_CLEENZO = {
  headline: "What makes Cleenzo laundry service the best choice",
  subtext:
    "Premium quality service, safe & hygienic cleaning, and on-time express delivery — grand store opening 16 June 2026 at Raj Nagar, Ghaziabad.",
  imageAlt:
    "Cleenzo grand store opening 16 June 2026 — 24 hour laundry and dry cleaning with launch offers in Ghaziabad",
  badge: "Grand opening · 16 June 2026",
};

export const WHY_CLEENZO_USP = [
  {
    title: "Trained professionals",
    desc: "Skilled team for laundry, dry clean & delicate garment care.",
    icon: "👥",
  },
  {
    title: "Premium quality",
    desc: "Imported fabric-safe chemicals with strict quality checks.",
    icon: "✅",
  },
  {
    title: "Advanced machines",
    desc: "Modern equipment for deep clean, steam iron & dry cleaning.",
    icon: "⚙️",
  },
  {
    title: "On-time delivery",
    desc: "Express pickup & doorstep return — clean clothes, happy you.",
    icon: "🚚",
  },
];

export const OFFERS = {
  badge: "Grand launch offer",
  headline: "Premium care. Unbelievable offers.",
  tagline: "Clean clothes, happy you",
  subtext:
    "Exclusive launch deals on dry clean, laundry & doorstep service — better savings than flat discounts.",
  terms: "*T&C apply",
  items: [
    { icon: "🧥", title: "Dry Clean", price: "Starts @ ₹49", highlight: true },
    { icon: "⭐", title: "Flat 51% OFF", price: "On select garments" },
    { icon: "👔", title: "5 Dry Clean", price: "@ ₹199" },
    { icon: "🏷️", title: "Flat 25% OFF", price: "On orders above ₹499" },
    { icon: "📅", title: "Monthly Laundry Plan", price: "@ ₹999" },
    {
      icon: "🛵",
      title: "FREE Pickup & Delivery",
      price: "Save time, we care!",
      highlight: true,
    },
  ],
  benefits: [
    "Trained professionals",
    "Premium quality",
    "Advanced machines",
    "On-time delivery",
  ],
};

export const CAROUSEL_BANNERS = [
  {
    id: "hero",
    theme: "light",
    badge: "⚡ Express delivery on every order",
    title: APP_PROMO_HEADLINE.title,
    titleAccent: APP_PROMO_HEADLINE.accent,
    subtitle:
      "Free pickup • Premium fabric care • Track orders in the Cleenzo app",
    primaryCta: { label: "Schedule free pickup", action: "schedule" },
    secondaryCta: { label: "Download app", action: "link", href: "#download" },
    visual: {
      emoji: "📱",
      title: "Cleenzo",
      tagline: "Book · Track · Delivered",
    },
  },
  {
    id: "offers",
    theme: "warm",
    badge: "🎉 Grand launch offer",
    title: "Premium care.",
    titleAccent: "Unbelievable offers.",
    subtitle:
      "Dry clean from ₹49 · 51% off select garments · free pickup & delivery",
    primaryCta: { label: "Book now on WhatsApp", action: "whatsapp" },
    secondaryCta: { label: "Schedule free pickup", action: "schedule" },
    highlightOffer: { icon: "🧥", title: "Dry Clean", price: "Starts @ ₹49" },
    miniOffers: [
      { icon: "👔", text: "5 Dry Clean @ ₹199" },
      { icon: "🏷️", text: "25% OFF above ₹499" },
      { icon: "📅", text: "Monthly plan @ ₹999" },
    ],
  },
  {
    id: "services",
    theme: "brand",
    badge: "🧺 Professional home & wardrobe care",
    title: "Laundry · Dry clean · Sofa & carpet",
    subtitle: "Steam iron, shoe cleaning & imported fabric-safe chemicals",
    primaryCta: {
      label: "Explore services",
      action: "link",
      href: "#services",
    },
    secondaryCta: { label: "Get a quote", action: "whatsapp" },
    serviceTags: ["Laundry", "Dry clean", "Sofa", "Carpet", "Steam iron"],
    visual: {
      emoji: "✨",
      title: "Premium care",
      tagline: "Every fabric, every garment",
    },
  },
];

export const CAROUSEL_AUTOPLAY_MS = 5500;
export const CAROUSEL_TRANSITION_MS = 700;
