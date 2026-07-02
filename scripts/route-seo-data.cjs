/** Route-level SEO used by postbuild static HTML generation for Google crawlers. */
const SITE_URL = "https://www.cleenzo.co.in";

const ROUTES = [
  {
    path: "/",
    title:
      "Cleenzo | Laundry & Dry Cleaning in Raj Nagar, Ghaziabad — Free Pickup & Express Delivery",
    description:
      "Cleenzo offers premium laundry, dry cleaning, sofa & carpet cleaning in Raj Nagar Extn, Ghaziabad (201017). Free doorstep pickup, express delivery & fabric-safe care. Serving Raj Nagar Extension, AVS City Square, Vaishali & Indirapuram. Book on WhatsApp.",
    keywords:
      "laundry service Raj Nagar Ghaziabad, dry cleaning Ghaziabad, laundry near me Raj Nagar, dry clean near AVS City Square, express laundry delivery Ghaziabad, laundry service Vaishali Ghaziabad, dry cleaning Indirapuram, sofa cleaning Raj Nagar, carpet cleaning Ghaziabad, Cleenzo laundry",
    h1: "Cleenzo — Premium Laundry & Dry Cleaning in Raj Nagar, Ghaziabad",
    intro:
      "Cleenzo offers premium laundry, dry cleaning, sofa and carpet cleaning in Raj Nagar Extension, Ghaziabad (201017). Free doorstep pickup, express delivery and fabric-safe care.",
  },
  {
    path: "/about",
    title: "About Cleenzo | Modern Laundry Brand in Raj Nagar, Ghaziabad",
    description:
      "Learn about Cleenzo — a modern laundry brand in Ghaziabad using German chemicals, professional machines, trained staff and 100% quality checks. Serving Raj Nagar Extension, AVS City Square, Vaishali & Indirapuram.",
    keywords:
      "about Cleenzo, Cleenzo laundry Ghaziabad, modern laundry brand Raj Nagar, professional laundry service",
    h1: "About Cleenzo — Modern Laundry Brand in Ghaziabad",
    intro:
      "Cleenzo is a modern laundry brand in Raj Nagar Extension, Ghaziabad with professional machines, trained staff and strict quality checks on every order.",
  },
  {
    path: "/commercial-laundry",
    title:
      "Commercial Laundry Services for Hotels, Restaurants & Hospitals | Cleenzo Ghaziabad",
    description:
      "Cleenzo commercial laundry for hotels, restaurants, cafes, hospitals, hostels, salons & gyms in Ghaziabad. Bulk capacity, monthly contracts, pickup & delivery, GST billing & quality control.",
    keywords:
      "commercial laundry Ghaziabad, hotel laundry service Ghaziabad, restaurant laundry Raj Nagar, B2B laundry Ghaziabad, bulk laundry pickup delivery",
    h1: "Commercial Laundry Services for Hotels, Restaurants & Hospitals",
    intro:
      "Cleenzo provides B2B commercial laundry for hotels, restaurants, hospitals, hostels and gyms in Ghaziabad with bulk capacity, GST billing and scheduled pickup.",
  },
  {
    path: "/laundry-service-ghaziabad",
    title: "Laundry Service in Ghaziabad | Free Pickup & Delivery | Cleenzo",
    description:
      "Cleenzo laundry service in Ghaziabad — wash & fold, wash & iron, premium laundry by kg. Free pickup & express delivery in Raj Nagar Extension. Book on WhatsApp.",
    keywords:
      "laundry service in Ghaziabad, laundry near me, laundry pickup and delivery, best laundry service in Raj Nagar Extension, wash and fold Ghaziabad",
    h1: "Laundry Service in Ghaziabad",
    intro:
      "Professional wash, fold and iron with free doorstep pickup across Raj Nagar Extension, AVS City Square, Vaishali and Indirapuram.",
  },
  {
    path: "/dry-cleaning-ghaziabad",
    title: "Best Dry Cleaning Service in Ghaziabad | Cleenzo Raj Nagar",
    description:
      "Premium dry cleaning in Ghaziabad — suits, sarees, blazers, wedding dresses & curtains. Stain removal, steam press, delicate fabric care. Free pickup & delivery. Cleenzo Raj Nagar.",
    keywords:
      "dry cleaning Ghaziabad, dry cleaning near me, dry cleaning Raj Nagar, saree dry cleaning, suit dry cleaning, wedding dress dry cleaning",
    h1: "Best Dry Cleaning Service in Ghaziabad",
    intro:
      "Expert dry cleaning for suits, sarees, blazers, wedding wear and curtains with stain removal, steam press and free pickup in Raj Nagar, Ghaziabad.",
  },
  {
    path: "/shoe-cleaning",
    title: "Shoe Cleaning Service in Ghaziabad | Sneaker & Sports Shoe Wash | Cleenzo",
    description:
      "Professional shoe cleaning in Ghaziabad — sports shoes, sneakers, leather care, white shoe restoration & odour removal. Pickup & delivery. Cleenzo Raj Nagar.",
    keywords:
      "shoe cleaning near me, sneaker cleaning Ghaziabad, shoe wash service, sports shoe cleaning, white shoes cleaning, leather shoe care Ghaziabad",
    h1: "Professional Shoe Cleaning Service in Ghaziabad",
    intro:
      "Sports shoes, sneakers, leather footwear and white shoe restoration with deep cleaning, whitening and odour removal.",
  },
  {
    path: "/sofa-cleaning",
    title: "Sofa Cleaning Service in Ghaziabad | Home Sofa Shampooing | Cleenzo",
    description:
      "Sofa cleaning in Ghaziabad — fabric & leather sofas, vacuum extraction, stain removal, dust mite treatment. Home service available. Cleenzo Raj Nagar Extension.",
    keywords:
      "sofa cleaning near me, sofa shampooing, sofa cleaning service Ghaziabad, upholstery cleaning Raj Nagar, leather sofa cleaning, home sofa cleaning",
    h1: "Sofa Cleaning Service in Ghaziabad",
    intro:
      "Fabric and leather sofa cleaning at home with vacuum extraction, shampooing, stain removal and dust mite treatment.",
  },
  {
    path: "/carpet-cleaning",
    title: "Carpet Cleaning Service in Ghaziabad | Deep Shampoo & Extraction | Cleenzo",
    description:
      "Professional carpet cleaning in Ghaziabad — deep shampoo, vacuum extraction, pet odour & allergen removal. Residential & commercial. Cleenzo home service.",
    keywords:
      "carpet cleaning Ghaziabad, carpet cleaning near me, carpet shampooing Raj Nagar, rug cleaning, commercial carpet cleaning Ghaziabad",
    h1: "Carpet Cleaning Service in Ghaziabad",
    intro:
      "Deep shampoo, vacuum extraction, pet odour removal and allergen treatment for home and commercial carpets in Ghaziabad.",
  },
  {
    path: "/curtain-cleaning",
    title: "Curtain Cleaning Service in Ghaziabad | Drapes & Blinds | Cleenzo",
    description:
      "Curtain cleaning in Ghaziabad — silk, cotton, velvet & blackout drapes. Dust, stain & odour removal. Free pickup & delivery. Cleenzo Raj Nagar Extension.",
    keywords:
      "curtain cleaning Ghaziabad, drape cleaning near me, curtain dry cleaning Raj Nagar, velvet curtain cleaning",
    h1: "Curtain Cleaning Service in Ghaziabad",
    intro:
      "Professional curtain and drape cleaning for silk, cotton, velvet and blackout panels with free pickup across Ghaziabad.",
  },
  {
    path: "/blog",
    title: "Cleenzo Blog | Spot Cleaning, Stain Removal & Fabric Care Tips",
    description:
      "Read how Cleenzo handles spot cleaning, stain removal with German chemicals, barcode garment tracking and quality checks — practical fabric care guides from Raj Nagar, Ghaziabad.",
    keywords:
      "Cleenzo blog, spot cleaning laundry, stain removal Ghaziabad, German chemicals laundry, fabric care tips",
    h1: "Cleenzo Blog — Fabric Care & How We Work",
    intro:
      "Practical guides on spot cleaning, stain removal, German chemicals, barcode tracking and choosing between laundry and dry clean.",
  },
  {
    path: "/blog/how-we-do-spot-cleaning",
    title: "How We Do Spot Cleaning | Cleenzo Laundry Ghaziabad",
    description:
      "Learn how Cleenzo treats oil, ink, food and collar stains with targeted spot cleaning before wash or dry clean — fabric-safe care in Raj Nagar, Ghaziabad.",
    keywords:
      "spot cleaning laundry, stain treatment Ghaziabad, professional laundry stain removal, Cleenzo spot clean",
    h1: "How We Do Spot Cleaning at Cleenzo",
    intro:
      "Spot cleaning is localized stain treatment before the main wash or dry clean cycle — diagnosis, fabric type and the right agent matter more than scrubbing harder.",
  },
  {
    path: "/blog/stain-removal-german-chemicals",
    title: "Stain Removal with German Chemicals | Cleenzo Ghaziabad",
    description:
      "How Cleenzo removes tough stains using German-formulated agents — oil, wine, ink and collar marks on cotton, silk and blends in Raj Nagar, Ghaziabad.",
    keywords:
      "stain removal laundry, German chemicals dry cleaning, professional stain treatment Ghaziabad, Cleenzo stain removal",
    h1: "How We Do Stain Removal with German Chemicals",
    intro:
      "Targeted stain removal with German-formulated agents matched to fabric type — oil, food, ink and collar marks treated before wash or dry clean.",
  },
  {
    path: "/blog/why-german-chemicals-fabric-care",
    title: "Why We Use German Chemicals for Fabric Care | Cleenzo",
    description:
      "Cleenzo uses German-formulated laundry and dry clean chemicals for colour-safe, fabric-gentle results — why quality agents matter for your clothes in Ghaziabad.",
    keywords:
      "German chemicals laundry, fabric safe detergent Ghaziabad, professional laundry chemicals, Cleenzo fabric care",
    h1: "Why Cleenzo Uses German Chemicals for Fabric Care",
    intro:
      "German-formulated agents deliver consistent stain removal and colour protection without harsh residue — safer for everyday wear and delicate fabrics.",
  },
  {
    path: "/blog/barcode-tracking-garments",
    title: "Barcode Tracking for Every Garment | Cleenzo Laundry",
    description:
      "Every Cleenzo order is barcode-tagged from pickup to delivery — how we track garments, prevent mix-ups and give you order visibility in Ghaziabad.",
    keywords:
      "laundry barcode tracking, garment tracking system, Cleenzo order tracking, laundry technology Ghaziabad",
    h1: "How Barcode Tracking Keeps Your Garments Safe",
    intro:
      "Each garment is tagged at pickup and scanned through wash, dry clean, press and packing — fewer mix-ups and full order traceability.",
  },
  {
    path: "/blog/express-laundry-quality-checks",
    title: "Express Laundry with 100% Quality Checks | Cleenzo",
    description:
      "Fast turnaround does not mean skipping steps — how Cleenzo runs express laundry with inspection, stain checks and steam press QC in Raj Nagar, Ghaziabad.",
    keywords:
      "express laundry Ghaziabad, laundry quality check, fast laundry delivery Raj Nagar, Cleenzo express service",
    h1: "Express Laundry Without Compromising Quality",
    intro:
      "Express service at Cleenzo still includes inspection, stain review, wash or dry clean, steam press and a final QC pass before delivery.",
  },
  {
    path: "/blog/dry-cleaning-vs-laundry-guide",
    title: "Dry Cleaning vs Laundry — Which Does Your Garment Need? | Cleenzo",
    description:
      "Not sure whether to laundry or dry clean? Cleenzo explains fabric labels, when to wash vs dry clean suits, sarees, kurtas and everyday cotton in Ghaziabad.",
    keywords:
      "dry cleaning vs laundry, when to dry clean, wash or dry clean guide, garment care Ghaziabad, Cleenzo laundry advice",
    h1: "Dry Cleaning vs Laundry — A Practical Guide",
    intro:
      "Read the care label, consider the fabric and stain type — everyday cotton for laundry, structured suits and delicate silks often need dry clean.",
  },
];

module.exports = { SITE_URL, ROUTES };
