import { Link } from "react-router-dom";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import { PHONE_DISPLAY, STORE_ADDRESS } from "../constants";
import { SERVICE_AREAS } from "../seo";
import { openWhatsAppBooking } from "../whatsapp";
import personalHeroImage from "../assets/image/personal-hero-banner.jpg";
import facilityImage from "../assets/image/commercial-hero-laundry.jpg";
import "./about-page.css";

const STORY_POINTS = [
  {
    icon: "🏢",
    title: "Modern laundry brand",
    desc: "Cleenzo was built to bring organised, premium garment care to Raj Nagar Extension and greater Ghaziabad — with technology-friendly booking and express delivery.",
  },
  {
    icon: "🧪",
    title: "German chemicals",
    desc: "We use imported, fabric-safe detergents and solvents chosen for effective cleaning while protecting colours and fibres.",
  },
  {
    icon: "⚙️",
    title: "Professional machines",
    desc: "Commercial washers, dryers, steam presses and dry-cleaning equipment deliver consistent results order after order.",
  },
  {
    icon: "👥",
    title: "Trained staff",
    desc: "Our team is trained in garment inspection, stain treatment, pressing and quality control — not just loading machines.",
  },
  {
    icon: "✅",
    title: "100% quality check",
    desc: "Every order passes a final inspection before packing. Clean clothes, happy you — that is our standard.",
  },
  {
    icon: "📍",
    title: "Serving Raj Nagar & Ghaziabad",
    desc: "From AVS City Square we serve Raj Nagar Extension, Vaishali and Indirapuram with free pickup.",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/images/banners/laundry-hero.jpg",
    alt: "Fresh folded laundry at Cleenzo professional facility",
    caption: "Premium laundry care",
  },
  {
    src: "/images/banners/dry-cleaning-hero.jpg",
    alt: "Formal wear dry cleaning at Cleenzo Ghaziabad",
    caption: "Expert dry cleaning",
  },
  {
    src: "/images/banners/shoe-cleaning-hero.jpg",
    alt: "Professional shoe cleaning service at Cleenzo",
    caption: "Shoe & sneaker care",
  },
  {
    src: "/images/banners/sofa-cleaning-hero.jpg",
    alt: "Sofa upholstery cleaning by Cleenzo team",
    caption: "Home upholstery cleaning",
  },
];

function AboutPage() {
  return (
    <>
      <section className="about-page-hero">
        <div className="about-page-hero-inner">
          <div className="about-page-hero-grid">
            <div>
              <span className="about-page-badge">About Cleenzo</span>
              <h1 className="about-page-title">A modern laundry brand for Ghaziabad</h1>
              <p className="about-page-subtitle">
                Premium laundry, dry cleaning and home textile care at{" "}
                <strong className="text-white">{STORE_ADDRESS}</strong> — with free pickup,
                express delivery and fabric-safe processes you can trust.
              </p>
            </div>

            <div className="about-page-hero-visual">
              <img
                src={personalHeroImage}
                alt="Cleenzo staff handing a premium laundry bag to a customer at the Raj Nagar store"
                width={1536}
                height={1024}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="about-page-story-grid">
            <div className="about-page-story-visual">
              <img
                src={facilityImage}
                alt="Cleenzo commercial laundry facility with professional washing equipment"
                loading="lazy"
              />
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-base md:text-lg">
              <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.2em] mb-2 not-prose">
                Our story
              </p>
              <p>
                <strong className="text-slate-900">Cleenzo</strong> is your neighbourhood laundry and
                dry cleaning partner in <strong>Raj Nagar Extension, Ghaziabad</strong>. We combine
                professional equipment, quality chemicals and trained staff to care for everyday
                clothes, formal wear, sarees, home textiles and more.
              </p>
              <p>
                Our aim is simple: make premium garment care accessible — with transparent pricing,
                WhatsApp booking, scheduled pickup and express doorstep return. Whether you need
                weekly family laundry, specialist dry cleaning, or sofa and carpet cleaning at home,
                Cleenzo is built to deliver consistent quality.
              </p>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
            {STORY_POINTS.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 bg-cleenzo-pale/60 border border-cleenzo-sky-light rounded-2xl p-5"
              >
                <div>
                  <span className="text-2xl mb-1 block" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h2 className="font-black text-cleenzo-deep text-lg">{item.title}</h2>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-page-gallery py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.2em] mb-3">
              What we do
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-cleenzo-deep">
              Premium care, every service
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_IMAGES.map((image) => (
              <figure key={image.src} className="about-page-gallery-card aspect-[3/2]">
                <img src={image.src} alt={image.alt} loading="lazy" />
                {image.caption ? (
                  <figcaption className="about-page-gallery-caption">{image.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cleenzo-pale-bg py-14 border-y border-cleenzo-sky-light">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-black text-cleenzo-deep mb-6">Our services</h2>
          <nav className="flex flex-wrap justify-center gap-3 text-sm font-bold">
            <Link
              to="/laundry-service-ghaziabad"
              className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo"
            >
              Laundry
            </Link>
            <Link
              to="/dry-cleaning-ghaziabad"
              className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo"
            >
              Dry cleaning
            </Link>
            <Link
              to="/shoe-cleaning"
              className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo"
            >
              Shoe cleaning
            </Link>
            <Link
              to="/sofa-cleaning"
              className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo"
            >
              Sofa cleaning
            </Link>
            <Link
              to="/carpet-cleaning"
              className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo"
            >
              Carpet cleaning
            </Link>
            <Link
              to="/commercial-laundry"
              className="bg-cleenzo text-white rounded-full px-4 py-2 hover:bg-cleenzo-dark"
            >
              Commercial B2B
            </Link>
          </nav>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-black text-cleenzo-deep mb-4">Areas we serve</h2>
          <ul className="flex flex-wrap justify-center gap-2 mb-8">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area}
                className="text-sm font-semibold bg-cleenzo-pale border border-cleenzo-sky-light rounded-full px-3 py-1.5 text-cleenzo-dark"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="text-slate-600">
            Call or WhatsApp{" "}
            <button
              type="button"
              onClick={() => openWhatsAppBooking()}
              className="text-cleenzo font-bold hover:underline"
            >
              {PHONE_DISPLAY}
            </button>
          </p>
        </div>
      </section>

      <PlaceOrderCTA title="Experience Cleenzo — book your first pickup" variant="cream" />
    </>
  );
}

export default AboutPage;
