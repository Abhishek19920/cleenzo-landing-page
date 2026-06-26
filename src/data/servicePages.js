import { SERVICE_AREAS } from "../seo";

export const SERVICE_PAGE_PATHS = [
  "/laundry-service-ghaziabad",
  "/dry-cleaning-ghaziabad",
  "/shoe-cleaning",
  "/sofa-cleaning",
  "/carpet-cleaning",
  "/curtain-cleaning",
];

export const SERVICE_PAGES = {
  "/laundry-service-ghaziabad": {
    path: "/laundry-service-ghaziabad",
    h1: "Laundry Service in Ghaziabad | Free Pickup & Delivery | Cleenzo",
    badge: "Everyday & premium laundry",
    subtitle:
      "Professional wash, fold & iron with free doorstep pickup across Raj Nagar Extension, AVS City Square, Vaishali & Indirapuram.",
    seo: {
      title: "Laundry Service in Ghaziabad | Free Pickup & Delivery | Cleenzo",
      description:
        "Cleenzo laundry service in Ghaziabad — wash & fold, wash & iron, premium laundry by kg. Free pickup & express delivery in Raj Nagar Extension. Book on WhatsApp.",
      keywords:
        "laundry service in Ghaziabad, laundry near me, laundry pickup and delivery, best laundry service in Raj Nagar Extension, wash and fold Ghaziabad, laundry Raj Nagar",
    },
    serviceType: "Laundry Service",
    sections: [
      {
        title: "Professional Laundry Service in Raj Nagar Extension, Ghaziabad",
        body: [
          "Cleenzo is a modern laundry brand serving homes and families across Raj Nagar Extension, AVS City Square and greater Ghaziabad. We combine trained staff, professional machines and fabric-safe detergents for consistently fresh clothes — with free pickup and express delivery on every order.",
          "Whether you need everyday wash & fold, wash & iron, or premium per-kg laundry with individual packing, Cleenzo handles it with strict quality checks before every return.",
        ],
      },
      {
        title: "Why Choose Cleenzo?",
        items: [
          { icon: "🛵", title: "Free pickup & delivery", desc: "Doorstep collection and return across our service areas in Ghaziabad." },
          { icon: "⚡", title: "Express turnaround", desc: "Fast laundry without slow lanes or hidden express charges." },
          { icon: "✨", title: "Premium fabric care", desc: "Imported, fabric-safe chemicals and trained professionals." },
          { icon: "✅", title: "100% quality check", desc: "Every order inspected before packing and dispatch." },
        ],
      },
      {
        title: "Washing Process",
        steps: [
          "Garment inspection & care-label check",
          "Pre-treatment for stains & heavy soiling",
          "Machine wash with fabric-appropriate programs",
          "Drying, steam press or fold as per service",
          "Quality check & hygienic packing",
          "Express doorstep delivery",
        ],
      },
      {
        title: "Fabric Care & Hygiene Standards",
        body: [
          "We separate loads by colour, fabric type and soil level. Delicates, whites and everyday cotton are processed on dedicated cycles with hygienic, commercial-grade equipment.",
          "Cleenzo uses quality detergents and follows strict handling standards — so your family’s clothes come back clean, fresh and safe to wear.",
        ],
      },
      {
        title: "Express Laundry Service",
        body: [
          "Need laundry back quickly? Cleenzo offers express turnaround on everyday laundry — with free pickup and fast doorstep return. No extra “slow lane” — express care is our standard promise.",
        ],
      },
      {
        title: "Subscription Plans",
        body: [
          "Regular laundry every week? Ask about recurring pickup schedules for families, PGs and working professionals in Raj Nagar, Vaishali and Indirapuram. Save time with scheduled collections and consistent pricing.",
        ],
        cta: "Ask about weekly laundry plans on WhatsApp",
      },
    ],
    heroImage: "/images/banners/laundry-hero.jpg",
    showAreas: true,
    showPricing: true,
    faqs: [
      {
        question: "Do you offer free laundry pickup in Ghaziabad?",
        answer:
          "Yes. Cleenzo provides free doorstep pickup and delivery for laundry orders across Raj Nagar Extension, AVS City Square, Vaishali and Indirapuram.",
      },
      {
        question: "What is the laundry price per kg?",
        answer:
          "Everyday wash & fold starts from ₹99/kg, wash & iron from ₹139/kg, and premium laundry from ₹249/kg. See our full price list on the pricing section of our website.",
      },
      {
        question: "How fast is laundry delivery?",
        answer:
          "Standard laundry turnaround is 24–48 hours. Express options are available depending on load and service type.",
      },
    ],
  },

  "/dry-cleaning-ghaziabad": {
    path: "/dry-cleaning-ghaziabad",
    h1: "Best Dry Cleaning Service in Ghaziabad",
    badge: "Premium garment care",
    subtitle:
      "Expert dry cleaning for suits, sarees, blazers, wedding wear & curtains — with stain removal, steam press and free pickup in Raj Nagar, Ghaziabad.",
    seo: {
      title: "Best Dry Cleaning Service in Ghaziabad | Cleenzo Raj Nagar",
      description:
        "Premium dry cleaning in Ghaziabad — suits, sarees, blazers, wedding dresses & curtains. Stain removal, steam press, delicate fabric care. Free pickup & delivery. Cleenzo Raj Nagar.",
      keywords:
        "dry cleaning Ghaziabad, dry cleaning near me, dry cleaning Raj Nagar, saree dry cleaning, suit dry cleaning, wedding dress dry cleaning, curtain dry cleaning Ghaziabad",
    },
    serviceType: "Dry Cleaning",
    heroImage: "/images/banners/dry-cleaning-hero.jpg",
    sections: [
      {
        title: "Premium Garment Care",
        body: [
          "Cleenzo dry cleaning is built for garments that need more than a regular wash — formal wear, silks, woollens, designer pieces and household textiles. Every item is inspected, pre-treated and finished to a crisp, ready-to-wear standard.",
        ],
      },
      {
        title: "Steam Press & Stain Removal",
        items: [
          { icon: "💧", title: "Targeted stain treatment", desc: "Oil, ink, food & sweat marks treated before solvent cleaning." },
          { icon: "👔", title: "Steam press finish", desc: "Sharp creases and professional finishing on shirts, suits & formals." },
          { icon: "✅", title: "Quality inspection", desc: "Expert review before packing — nothing leaves without a final check." },
        ],
      },
      {
        title: "Saree Dry Cleaning",
        body: [
          "Silk, chiffon, georgette, zari and embroidered sarees need specialist care. Cleenzo handles pleats, borders and delicate work with fabric-safe solvents and careful finishing.",
        ],
      },
      {
        title: "Blazer & Suit Dry Cleaning",
        body: [
          "Keep your formal wardrobe sharp. We dry clean blazers, suits, coats and safari sets with structure-preserving processes and professional press.",
        ],
      },
      {
        title: "Wedding Dress Dry Cleaning",
        body: [
          "Bridal lehengas, gowns, sherwanis and party wear deserve premium handling. Cleenzo offers careful dry cleaning for heavy embellishments, layers and delicate fabrics.",
        ],
      },
      {
        title: "Curtain Dry Cleaning",
        body: [
          "Refresh home textiles with curtain and drape dry cleaning — dust, odour and light stain removal with pickup from your doorstep in Ghaziabad.",
        ],
      },
      {
        title: "Delicate Fabric Handling",
        body: [
          "From cashmere to linen blends, our team follows care labels and uses appropriate solvents and finishing techniques so colours stay true and fibres stay strong.",
        ],
      },
      {
        title: "Pickup & Delivery",
        body: [
          "Book free pickup on WhatsApp or schedule online. We collect from your home or office and return garments neatly packed — express delivery across Raj Nagar Extension, AVS City Square, Vaishali and Indirapuram.",
        ],
      },
    ],
    showAreas: true,
    showPricing: true,
    faqs: [
      {
        question: "How long does dry cleaning take?",
        answer:
          "Most dry cleaning orders are ready within 24 hours (T&C apply). Specialty or bulk orders may need slightly longer — we confirm at pickup.",
      },
      {
        question: "Do you remove tough stains?",
        answer:
          "Yes. We pre-treat oil, ink, food and collar stains before dry cleaning. Very old or set-in stains are assessed honestly — we do our best and advise if a mark may remain.",
      },
      {
        question: "What fabrics should be dry cleaned?",
        answer:
          "Silk, wool, rayon, acetate, suede, leather trim garments, structured suits, sarees with heavy work, and most items labelled “dry clean only” should be dry cleaned rather than washed.",
      },
    ],
  },

  "/shoe-cleaning": {
    path: "/shoe-cleaning",
    h1: "Professional Shoe Cleaning Service in Ghaziabad",
    badge: "Shoes & bags",
    subtitle:
      "Sports shoes, sneakers, leather footwear & white shoe restoration — deep cleaning, whitening and odour removal with home pickup in Ghaziabad.",
    seo: {
      title: "Shoe Cleaning Service in Ghaziabad | Sneaker & Sports Shoe Wash | Cleenzo",
      description:
        "Professional shoe cleaning in Ghaziabad — sports shoes, sneakers, leather care, white shoe restoration & odour removal. Pickup & delivery. Cleenzo Raj Nagar.",
      keywords:
        "shoe cleaning near me, sneaker cleaning Ghaziabad, shoe wash service, sports shoe cleaning, white shoes cleaning, leather shoe care Ghaziabad",
    },
    serviceType: "Shoe Cleaning",
    heroImage: "/images/banners/shoe-cleaning-hero.jpg",
    galleryTitle: "Our shoe cleaning work",
    galleryImages: [
      {
        src: "/images/banners/shoe-cleaning-hero.jpg",
        alt: "Professional sneaker cleaning at Cleenzo Ghaziabad",
        caption: "Sports & everyday footwear deep clean",
      },
      {
        src: "/images/gallery/shoe-gallery-2.jpg",
        alt: "Leather shoe polish and restoration in Ghaziabad",
        caption: "Leather care & sole restoration",
      },
      {
        src: "/images/gallery/shoe-gallery-3.jpg",
        alt: "Freshly cleaned sneakers after professional wash Cleenzo",
        caption: "Sneaker refresh & whitening",
      },
    ],
    sections: [
      {
        title: "Sports Shoes Cleaning",
        body: [
          "Running shoes, trainers and gym footwear collect sweat, dust and odour. Cleenzo deep-cleans mesh, soles and insoles so your sports shoes feel fresh again.",
        ],
      },
      {
        title: "White Shoes Restoration",
        body: [
          "Yellowed or stained white sneakers? Our whitening and restoration process brings back a cleaner, brighter look without damaging the upper material.",
        ],
      },
      {
        title: "Sneaker Deep Cleaning",
        body: [
          "Premium sneaker care includes sole scrubbing, upper cleaning, lace wash and deodorising — ideal for daily wear and collector pairs.",
        ],
      },
      {
        title: "Leather Shoe Care",
        body: [
          "Polish, condition and clean leather formal shoes and boots. We help maintain suppleness and shine while removing surface dirt and scuffs.",
        ],
      },
      {
        title: "Odour Removal",
        body: [
          "Bacteria and moisture cause persistent smell. Our process targets insoles and lining for lasting freshness — not just surface perfume.",
        ],
      },
      {
        title: "Shoe Whitening",
        body: [
          "Canvas and synthetic whites benefit from dedicated whitening treatment after deep clean — popular for school shoes and everyday sneakers.",
        ],
      },
    ],
    showAreas: true,
    showPricing: true,
    faqs: [
      {
        question: "Do you clean all types of shoes?",
        answer:
          "We clean sports shoes, sneakers, canvas, synthetic and leather footwear. Bring pairs to our Raj Nagar store or ask about pickup with your laundry order.",
      },
      {
        question: "How long does shoe cleaning take?",
        answer: "Most shoe cleaning orders are ready in 24–48 hours depending on material and condition.",
      },
    ],
  },

  "/sofa-cleaning": {
    path: "/sofa-cleaning",
    h1: "Sofa Cleaning Service in Ghaziabad",
    badge: "Home upholstery",
    subtitle:
      "Fabric & leather sofa cleaning at home — vacuum extraction, shampooing, stain removal and dust mite treatment in Raj Nagar & Ghaziabad.",
    seo: {
      title: "Sofa Cleaning Service in Ghaziabad | Home Sofa Shampooing | Cleenzo",
      description:
        "Sofa cleaning in Ghaziabad — fabric & leather sofas, vacuum extraction, stain removal, dust mite treatment. Home service available. Cleenzo Raj Nagar Extension.",
      keywords:
        "sofa cleaning near me, sofa shampooing, sofa cleaning service Ghaziabad, upholstery cleaning Raj Nagar, leather sofa cleaning, home sofa cleaning",
    },
    serviceType: "Sofa Cleaning",
    heroImage: "/images/banners/sofa-cleaning-hero.jpg",
    galleryTitle: "Our sofa cleaning work",
    galleryImages: [
      {
        src: "/images/banners/sofa-cleaning-hero.jpg",
        alt: "Professional sofa extraction cleaning in Ghaziabad by Cleenzo",
        caption: "Upholstery extraction & deep clean",
      },
      {
        src: "/images/gallery/sofa-gallery-2.jpg",
        alt: "Sofa steam cleaning and sanitization Ghaziabad",
        caption: "Steam cleaning & sanitization",
      },
      {
        src: "/images/gallery/sofa-gallery-3.jpg",
        alt: "Fresh clean sofa upholstery after professional cleaning Cleenzo",
        caption: "Fabric refresh & stain removal",
      },
      {
        src: "/images/gallery/sofa-gallery-4.jpg",
        alt: "Sectional sofa cleaning at home Cleenzo Ghaziabad",
        caption: "Sectional & L-shaped sofas",
      },
    ],
    sections: [
      {
        title: "Fabric Sofa Cleaning",
        body: [
          "Deep shampoo and extraction for cotton, linen, polyester and blended upholstery. Removes embedded dust, spills and everyday grime from cushions and frames.",
        ],
      },
      {
        title: "Leather Sofa Cleaning",
        body: [
          "Gentle leather cleaning and conditioning to preserve finish and prevent cracking. Safe for living-room and office leather seating.",
        ],
      },
      {
        title: "Vacuum Extraction Process",
        body: [
          "We use professional extraction equipment to pull dirt and moisture from deep within fibres — not just surface wiping — for a noticeably fresher sofa.",
        ],
      },
      {
        title: "Dust Mite Removal",
        body: [
          "Upholstery harbours allergens. Deep cleaning reduces dust mites and allergens — especially helpful for families with children or sensitive skin.",
        ],
      },
      {
        title: "Stain Removal",
        body: [
          "Tea, coffee, food and ink stains are pre-treated before full sofa cleaning. Results depend on fabric and stain age — we assess on site.",
        ],
      },
      {
        title: "Home Service Available",
        body: [
          "Book sofa cleaning at your home in Raj Nagar Extension, Vaishali, Indirapuram and nearby areas. No need to move heavy furniture — we come to you.",
        ],
        cta: "Book sofa cleaning on WhatsApp",
      },
    ],
    showAreas: true,
    showPricing: false,
    faqs: [
      {
        question: "How long does a sofa take to dry?",
        answer:
          "Drying time depends on fabric and weather — typically a few hours with good ventilation. We use extraction to minimise moisture left in cushions.",
      },
      {
        question: "Do you clean sectional and L-shaped sofas?",
        answer: "Yes. We quote based on seating capacity and fabric type — message us photos on WhatsApp for a quick estimate.",
      },
    ],
  },

  "/carpet-cleaning": {
    path: "/carpet-cleaning",
    h1: "Carpet Cleaning Service in Ghaziabad",
    badge: "Carpets & rugs",
    subtitle:
      "Deep shampoo, vacuum extraction, pet odour removal and allergen treatment for home & commercial carpets in Ghaziabad.",
    seo: {
      title: "Carpet Cleaning Service in Ghaziabad | Deep Shampoo & Extraction | Cleenzo",
      description:
        "Professional carpet cleaning in Ghaziabad — deep shampoo, vacuum extraction, pet odour & allergen removal. Residential & commercial. Cleenzo home service.",
      keywords:
        "carpet cleaning Ghaziabad, carpet cleaning near me, carpet shampooing Raj Nagar, rug cleaning, commercial carpet cleaning Ghaziabad",
    },
    serviceType: "Carpet Cleaning",
    heroImage: "/images/banners/carpet-cleaning-hero.jpg",
    galleryTitle: "Our carpet cleaning work",
    galleryImages: [
      {
        src: "/images/banners/carpet-cleaning-hero.jpg",
        alt: "Professional carpet extraction cleaning in Ghaziabad by Cleenzo",
        caption: "Deep shampoo & extraction",
      },
      {
        src: "/images/gallery/carpet-gallery-2.jpg",
        alt: "Carpet stain treatment and spot cleaning Ghaziabad",
        caption: "Stain treatment & spot cleaning",
      },
      {
        src: "/images/gallery/carpet-gallery-3.jpg",
        alt: "Freshly cleaned carpet in modern home Cleenzo Ghaziabad",
        caption: "Living room carpet refresh",
      },
      {
        src: "/images/gallery/carpet-gallery-4.jpg",
        alt: "Persian and wool rug professional cleaning Cleenzo",
        caption: "Persian & wool rug care",
      },
    ],
    sections: [
      {
        title: "Deep Shampoo Cleaning",
        body: [
          "Thorough shampoo and agitation lifts years of foot traffic, dust and spills from carpet fibres — restoring colour and softness.",
        ],
      },
      {
        title: "Vacuum Extraction",
        body: [
          "Powerful extraction removes dirty solution and moisture deep from the pile, helping carpets dry faster and stay cleaner longer.",
        ],
      },
      {
        title: "Pet Odour Removal",
        body: [
          "Pet accidents leave smell and bacteria in padding. We treat odour at the source with deodorising pre-treatment and deep extraction.",
        ],
      },
      {
        title: "Dust & Allergen Removal",
        body: [
          "Carpets trap pollen, dust and allergens. Professional cleaning improves indoor air quality — especially before monsoon or after renovation.",
        ],
      },
      {
        title: "Residential & Commercial Cleaning",
        body: [
          "From living-room rugs to office carpets and retail spaces — Cleenzo serves homes, showrooms and small commercial sites across Ghaziabad.",
        ],
        cta: "Get a carpet cleaning quote",
      },
    ],
    showAreas: true,
    showPricing: false,
    faqs: [
      {
        question: "Do you clean carpets at home?",
        answer:
          "Yes. We provide on-site carpet and rug cleaning in Ghaziabad. Large loose rugs can also be collected depending on size — contact us on WhatsApp.",
      },
      {
        question: "How often should carpets be professionally cleaned?",
        answer:
          "For homes with pets or heavy footfall, every 6–12 months is recommended. Light-use rooms may need annual cleaning.",
      },
    ],
  },

  "/curtain-cleaning": {
    path: "/curtain-cleaning",
    h1: "Curtain Cleaning Service in Ghaziabad",
    badge: "Drapes & window textiles",
    subtitle:
      "Professional curtain & drape cleaning — silk, cotton, velvet and blackout panels. Off-site care with free pickup across Raj Nagar & Ghaziabad.",
    seo: {
      title: "Curtain Cleaning Service in Ghaziabad | Drapes & Blinds | Cleenzo",
      description:
        "Curtain cleaning in Ghaziabad — silk, cotton, velvet & blackout drapes. Dust, stain & odour removal. Free pickup & delivery. Cleenzo Raj Nagar Extension.",
      keywords:
        "curtain cleaning Ghaziabad, drape cleaning near me, curtain dry cleaning Raj Nagar, velvet curtain cleaning, blackout curtain wash",
    },
    serviceType: "Curtain Cleaning",
    sections: [
      {
        title: "Silk & delicate drapes",
        body: [
          "Silk and embroidered curtains need controlled cleaning to protect colour and weave. Cleenzo inspects fabric type before choosing dry clean or wet process.",
        ],
      },
      {
        title: "Cotton & everyday curtains",
        body: [
          "Living-room and bedroom cotton panels collect dust and cooking fumes over time. Professional washing restores brightness without shrinkage when care labels allow.",
        ],
      },
      {
        title: "Velvet & blackout panels",
        body: [
          "Heavy velvet and blackout curtains need structured handling off-site. We collect, clean, press and return ready to re-hang.",
        ],
      },
      {
        title: "Free pickup & delivery",
        body: [
          "Large curtains are awkward to transport — our team picks up from Raj Nagar Extension, AVS City Square, Vaishali and Indirapuram at no extra visit charge.",
        ],
        cta: "Book curtain cleaning on WhatsApp",
      },
    ],
    showAreas: true,
    showPricing: false,
    faqs: [
      {
        question: "Do you remove and re-hang curtains?",
        answer:
          "We collect curtains for off-site cleaning. Re-hanging can be discussed when you book — most customers prefer their own fitter for final installation.",
      },
      {
        question: "How long does curtain cleaning take?",
        answer:
          "Most curtain orders return within 3–5 days depending on fabric, lining and volume. Express slots may be available — ask on WhatsApp.",
      },
    ],
  },
};

export function getServicePageByPath(pathname) {
  return SERVICE_PAGES[pathname] ?? null;
}

export function getAllServicePages() {
  return SERVICE_PAGE_PATHS.map((path) => SERVICE_PAGES[path]);
}

export { SERVICE_AREAS };
