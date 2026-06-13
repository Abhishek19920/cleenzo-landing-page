import { TRUST_BADGES, INDUSTRIES } from "../data";
import commercialHeroImage from "../../assets/image/commercial-hero-laundry.jpg";
import "../commercial-hero.css";

const HERO_FEATURES = [
  { icon: "🧺", text: TRUST_BADGES[0] },
  { icon: "📅", text: TRUST_BADGES[1] },
  { icon: "📄", text: TRUST_BADGES[2] },
  { icon: "🤝", text: TRUST_BADGES[3] },
];

const HERO_TRUST = [
  { icon: "🛡️", label: "Hygienic Care" },
  { icon: "🏅", label: "Quality Assured" },
  { icon: "🌿", label: "Fabric Safe" },
];

const INDUSTRY_STRIP = INDUSTRIES.filter((item) =>
  ["Hotels & Guest Houses", "Restaurants & Cafés", "Salons & Spas", "PGs & Hostels", "Corporate Offices"].includes(
    item.title,
  ),
);

function CommercialHero({ onQuoteClick, onMeetingClick }) {
  return (
    <section id="commercial-hero" className="commercial-hero-section">
      <div className="commercial-hero-banner">
        <div className="commercial-hero-main">
          <div className="commercial-hero-copy">
            <h1 className="commercial-hero-title">Commercial Laundry Solutions</h1>
            <p className="commercial-hero-subtitle">
              Reliable Laundry Partner for Hotels, Restaurants, Salons, Hostels &amp; Businesses
            </p>

            <div className="commercial-hero-features">
              {HERO_FEATURES.map((item) => (
                <div key={item.text} className="commercial-hero-feature">
                  <span className="commercial-hero-feature-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="commercial-hero-feature-text">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="commercial-hero-ctas">
              <button type="button" className="commercial-hero-btn-primary" onClick={onQuoteClick}>
                <span aria-hidden="true">📋</span>
                Request Commercial Quote
              </button>
              <button type="button" className="commercial-hero-btn-secondary" onClick={onMeetingClick}>
                <span aria-hidden="true">📅</span>
                Schedule a Meeting
              </button>
            </div>

            <div className="commercial-hero-trust">
              {HERO_TRUST.map((item) => (
                <div key={item.label} className="commercial-hero-trust-item">
                  <span className="commercial-hero-trust-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="commercial-hero-visual">
            <img
              src={commercialHeroImage}
              alt="Cleenzo commercial laundry facility with industrial washers and professional linen handling"
              className="commercial-hero-image"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <div className="commercial-hero-industries">
          {INDUSTRY_STRIP.map((item) => (
            <div key={item.title} className="commercial-hero-industry">
              <span className="commercial-hero-industry-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="commercial-hero-industry-label">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommercialHero;
