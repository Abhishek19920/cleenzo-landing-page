export const WHATSAPP_NUMBER = "919999225311";

export const WHATSAPP_BOOKING_MESSAGE =
  "Hi Cleenzo! I'd like to book a laundry pickup. Please share available slots.";

export const PHONE_DISPLAY = "+91 99992 25311";

export const PHONE_TEL = "+919999225311";

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

export const STORE_MAPS_URL =
  "https://www.google.com/maps/place/Cleenzo+Laundry+and+Dry+clean+hub/@28.7035856,77.4311244,17z/data=!4m6!3m5!1s0x390cf10040e7a323:0xb1faee4693d31d59!8m2!3d28.7035856!4d77.4311244!16s%2Fg%2F11nqf352yx";

export const COMMERCIAL_LAUNDRY_URL = "/commercial-laundry";

export const APP_LINKS = {
  android: "#",
  ios: "#",
};

export const APP_IS_LIVE = false;

export const APP_COMING_SOON = {
  title: "App will be live soon!",
  subtitle: "Google Play & App Store",
  message:
    "The Cleenzo mobile app isn't on the stores yet. Book on WhatsApp or schedule a free pickup on our website — we'll notify you when Android and iOS apps go live.",
  whatsappMessage:
    "Hi Cleenzo! Please notify me when your mobile app goes live on Google Play and the App Store.",
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
    handle: "Cleenzo Official",
    href: "https://www.youtube.com/channel/UC_05FWBPDFDa6e2Qb0n3EFQ",
  },
];

export const USP = {
  badge: "Our promise",
  headline: "Every delivery is express",
  description:
    "No slow lanes or extra charges — fast turnaround and doorstep delivery on every Cleenzo order.",
  cta: "Need express laundry today?",
};

export const PERSONAL_HERO = {
  badge: "Top-rated laundry in Raj Nagar Extension",
  title: "Laundry & Dry Cleaning in Raj Nagar Extension",
  accent: "Professional fabric care with free doorstep pickup",
  subtitle:
    "Premium wash, steam iron, dry clean and home textile care for Raj Nagar Extension, Sidharth Vihar, Kanawani, Ahinsa Khand, Indirapuram, Vaishali and nearby Ghaziabad homes.",
};

/** Highlight neighbourhoods near Raj Nagar Extension — free pickup & delivery. */
export const NEARBY_SERVICE_AREAS = [
  "Raj Nagar Extension",
  "Sidharth Vihar",
  "Kanawani",
  "Ahinsa Khand",
  "Indirapuram",
  "Vaishali",
];

/**
 * Last 30 days growth snapshot — marketing surface (orders / customer records).
 * Update when you refresh monthly figures.
 */
export const MONTHLY_GROWTH_STATS = {
  eyebrow: "This month at Cleenzo",
  headline: "Growing with Ghaziabad families",
  subline:
    "Real demand across Raj Nagar Extension and nearby societies — quality care people come back for.",
  total: {
    value: 319,
    label: "Orders this month",
    detail: "Laundry & dry clean jobs completed in the last 30 days",
  },
  returning: {
    value: 56,
    label: "Returning customers",
    detail: "Families who booked Cleenzo again",
  },
  newCustomers: {
    value: 148,
    label: "New customers",
    detail: "First-time pickups this month",
  },
};

export const LOCAL_TRUST_STATS = [
  {
    value: "319",
    label: "Orders this month",
    detail: "Active laundry & dry clean demand near Raj Nagar Extension",
  },
  {
    value: "148",
    label: "New customers",
    detail: "First-time families who chose Cleenzo this month",
  },
  {
    value: "56",
    label: "Returning customers",
    detail: "Repeat bookings — quality that earns trust",
  },
  {
    value: "5.0",
    label: "Google rating",
    detail: "Cleenzo Laundry and Dry clean hub at AVS City Square",
  },
];

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
    icon: "🤵",
    background: "linear-gradient(135deg, #334155 0%, #1e293b 55%, #0f172a 100%)",
    glow: "rgba(51, 65, 85, 0.35)",
  },
  {
    name: "Sarees & Ethnic",
    desc: "Silk & embroidered wear handled with care.",
    icon: "🥻",
    background: "linear-gradient(135deg, #f43f5e 0%, #db2777 45%, #ea580c 100%)",
    glow: "rgba(244, 63, 94, 0.35)",
  },
  {
    name: "Winter Wear",
    desc: "Coats & jackets refreshed like new.",
    icon: "🧥",
    background: "linear-gradient(135deg, #4f46e5 0%, #1d4ed8 50%, #312e81 100%)",
    glow: "rgba(79, 70, 229, 0.35)",
  },
  {
    name: "Kurtas & Sherwanis",
    desc: "Zari & embroidery preserved safely.",
    icon: "👘",
    background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #b45309 100%)",
    glow: "rgba(245, 158, 11, 0.35)",
  },
  {
    name: "Dresses & Gowns",
    desc: "Party & bridal wear precision care.",
    icon: "👗",
    background: "linear-gradient(135deg, #c026d3 0%, #9333ea 50%, #5b21b6 100%)",
    glow: "rgba(192, 38, 211, 0.35)",
  },
  {
    name: "Home Textiles",
    desc: "Curtains, drapes & soft furnishings.",
    icon: "🏠",
    background: "linear-gradient(135deg, #10b981 0%, #0d9488 50%, #065f46 100%)",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  {
    name: "Shoes & Bags",
    desc: "Premium shoe & bag cleaning service.",
    icon: "👞",
    background: "linear-gradient(135deg, #78716c 0%, #92400e 50%, #292524 100%)",
    glow: "rgba(120, 113, 108, 0.35)",
  },
  {
    name: "Daily Laundry",
    desc: "Affordable wash for everyday clothes.",
    icon: "🧺",
    background: "linear-gradient(135deg, #0a3d91 0%, #1565c0 50%, #0284c7 100%)",
    glow: "rgba(10, 61, 145, 0.35)",
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
  headline: "Why Raj Nagar Extension families choose Cleenzo",
  subtext:
    "Premium dry cleaning, hygienic laundry processing, clear pricing and dependable pickup-delivery from our AVS City Square store.",
  imageAlt:
    "Cleenzo laundry and dry cleaning service with express delivery in Ghaziabad",
  badge: "Local store · AVS City Square",
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

export const PRICING_SECTION = {
  badge: "Transparent pricing · Ghaziabad",
  headline: "Laundry & dry cleaning price list",
  headlineAccent: "Ghaziabad & nearby areas",
  subtext:
    "Per-piece dry clean & steam press, plus affordable laundry by the kilo — clear rates with free pickup across Raj Nagar Extension, Sidharth Vihar, Kanawani, Ahinsa Khand, Indirapuram, Vaishali and nearby localities.",
  disclaimer:
    "Prices shown are indicative for Ghaziabad and nearby service areas. Rates may vary for specialty garments, express service or seasonal offers. Contact us for bulk or commercial quotes.",
};

export const OFFERS = {
  badge: "Freedom & Rakhi Sale",
  headline: "FLAT 40% OFF",
  headlineAccent: "* GET 10% BACK as Cleenzo Credit",
  tagline: "Free pickup & delivery",
  promoStrip:
    "FLAT 40% OFF + 10% Cleenzo Credit back — FOR EVERYONE, 9th – 30th August. Free pickup & delivery.",
  subtext:
    "Freedom & Rakhi Sale at Cleenzo — premium laundry & dry cleaning with free pickup across Raj Nagar Extension, Ghaziabad.",
  intro: "Book on WhatsApp or schedule a free pickup today.",
  qualityLine: "Quality cleaning assured · Expert fabric care",
  featured: {
    icon: "🇮🇳",
    label: "Freedom & Rakhi Sale",
    title: "Flat 40% off",
    price: "* 10% credit back",
    note: "everyone · 9th – 30th August",
  },
  terms: "*Freedom & Rakhi Sale T&C apply. Cleenzo Credit rules as per offer details.",
  items: [
    {
      icon: "🔥",
      title: "40% OFF",
      price: "Freedom & Rakhi",
      desc: "Laundry & dry clean — everyone",
      highlight: true,
    },
    {
      icon: "💳",
      title: "10% credit back",
      price: "Next order",
      desc: "Cleenzo Credit on eligible orders",
      highlight: true,
    },
    {
      icon: "🛵",
      title: "FREE Pickup & Delivery",
      price: "On every order",
      desc: "Doorstep service across Ghaziabad",
      highlight: true,
    },
    {
      icon: "⚡",
      title: "Express turnaround",
      price: "12–48 hrs",
      desc: "Fast laundry & dry clean",
    },
    {
      icon: "✨",
      title: "Premium fabric care",
      price: "Safe & hygienic",
      desc: "German chemicals · trained staff",
    },
  ],
  benefits: [
    { icon: "👥", text: "Trained professionals" },
    { icon: "✨", text: "Premium quality detergents" },
    { icon: "⚙️", text: "Advanced machines" },
    { icon: "🚚", text: "On-time express delivery" },
  ],
  perks: [
    "Free pickup & delivery",
    "Quality cleaning assured",
    "Expert care for every fabric",
  ],
};

export const CAROUSEL_BANNERS = [
  {
    id: "offers",
    theme: "brand",
    badge: "Quality laundry · Season offer till 30th August",
    title: "FLAT 40% OFF",
    titleAccent: "+ 10% credit back",
    subtitle:
      "German chemicals, expert finish & free pickup across Raj Nagar Extension, Sidharth Vihar, Indirapuram & Vaishali.",
    primaryCta: { label: "Book now", action: "schedule" },
    secondaryCta: {
      label: "View price list",
      action: "link",
      href: "#pricing",
    },
    highlightOffer: {
      icon: "✦",
      title: "Quality care. Season savings.",
      price: "FLAT 40% OFF",
      subline: "+ 10% Cleenzo Credit on next order",
    },
    miniOffers: [
      { icon: "✦", text: "QC-checked · professional finish" },
      { icon: "🛵", text: "FREE pickup & delivery nearby" },
      { icon: "⚡", text: "Express 12–48 hr turnaround" },
    ],
  },
  {
    id: "express",
    theme: "express",
    badge: "⚡ Our promise · Express delivery",
    title: "Every delivery is",
    titleAccent: "express",
    subtitle:
      "No slow lanes or extra charges — fast turnaround with free pickup & doorstep delivery on every Cleenzo order.",
    primaryCta: { label: "Schedule free pickup", action: "schedule" },
    secondaryCta: { label: "Book on WhatsApp", action: "whatsapp" },
    expressFeatures: [
      { icon: "🛵", label: "Free pickup", desc: "Doorstep collection" },
      { icon: "⚡", label: "Fast turnaround", desc: "No slow lanes" },
      { icon: "🚚", label: "Express delivery", desc: "Fresh clothes back" },
    ],
    expressSteps: ["Book pickup", "Expert cleaning", "Express delivery"],
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
