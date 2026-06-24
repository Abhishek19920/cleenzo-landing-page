import { Link } from "react-router-dom";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import { PHONE_DISPLAY, STORE_ADDRESS } from "../constants";
import { SERVICE_AREAS } from "../seo";
import { openWhatsAppBooking } from "../whatsapp";

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

function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-cleenzo-deep via-cleenzo to-cleenzo-light text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <p className="text-cleenzo-sky font-bold text-xs uppercase tracking-[0.2em] mb-4">
            About Cleenzo
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            A modern laundry brand for Ghaziabad
          </h1>
          <p className="text-cleenzo-pale/90 mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Premium laundry, dry cleaning and home textile care at{" "}
            <strong className="text-white">{STORE_ADDRESS}</strong> — with free pickup, express
            delivery and fabric-safe processes you can trust.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-base md:text-lg">
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

          <ul className="grid sm:grid-cols-2 gap-4 mt-12">
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

      <section className="bg-cleenzo-pale-bg py-14 border-y border-cleenzo-sky-light">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-black text-cleenzo-deep mb-6">Our services</h2>
          <nav className="flex flex-wrap justify-center gap-3 text-sm font-bold">
            <Link to="/laundry-service-ghaziabad" className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo">
              Laundry
            </Link>
            <Link to="/dry-cleaning-ghaziabad" className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo">
              Dry cleaning
            </Link>
            <Link to="/shoe-cleaning" className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo">
              Shoe cleaning
            </Link>
            <Link to="/sofa-cleaning" className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo">
              Sofa cleaning
            </Link>
            <Link to="/carpet-cleaning" className="bg-white border border-cleenzo-sky-light rounded-full px-4 py-2 text-cleenzo hover:border-cleenzo">
              Carpet cleaning
            </Link>
            <Link to="/commercial-laundry" className="bg-cleenzo text-white rounded-full px-4 py-2 hover:bg-cleenzo-dark">
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
