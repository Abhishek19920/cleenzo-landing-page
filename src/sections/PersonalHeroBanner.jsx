import { useSchedulePickup } from "../context/SchedulePickupContext";
import { useAppDownload } from "../context/AppDownloadContext";
import { useCarouselStrip } from "../context/CarouselStripContext";
import { PERSONAL_HERO, USP } from "../constants";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";
import personalHeroImage from "../assets/image/personal-hero-banner.jpg";
import "./personal-hero.css";

const TIRANGA_HERO = {
  badge: "Quality laundry · Season offer till 30th August",
  title: "FLAT 40% OFF laundry & dry clean",
  accent: "* GET 10% BACK as Cleenzo Credit",
  subtitle:
    "Premium fabric care with free pickup across Raj Nagar Extension, Sidharth Vihar, Kanawani, Ahinsa Khand, Indirapuram & Vaishali.",
  creditNote:
    "10% Cleenzo Credit is earned after discount — redeemable after the campaign ends, not an extra instant off.",
};

const FEATURES = [
  { icon: "⭐", label: "Quality Care" },
  { icon: "⏱️", label: "On-Time Delivery" },
  { icon: "💧", label: "Hygienic Process" },
];

const TRUST = [
  { icon: "✓", label: "Quality Assured" },
  { icon: "🌿", label: "Eco Friendly" },
  { icon: "🔒", label: "Safe Handling" },
];

const TIRANGA_USP = {
  badge: "FREE PICKUP & DELIVERY",
  headline: "Quality cleaning. Real savings.",
  description:
    "Flat 40% off plus 10% Cleenzo Credit on eligible orders — German chemicals, expert finish, doorstep service.",
  cta: "Book quality care",
};

const STRIP = [
  { icon: "🧺", label: "Laundry" },
  { icon: "🧥", label: "Dry Clean" },
  { icon: "🛵", label: "Free Pickup" },
  { icon: "⚡", label: "Express Delivery" },
];

function PersonalHeroBanner() {
  const { openSchedulePickup } = useSchedulePickup();
  const { openAppDownload } = useAppDownload();
  const { stripTone, homeTiranga } = useCarouselStrip();
  const tiranga = homeTiranga || isHomeTirangaThemeActive();
  const hero = tiranga ? TIRANGA_HERO : PERSONAL_HERO;
  const usp = tiranga ? TIRANGA_USP : USP;
  const stripClass = tiranga ? "tiranga" : stripTone;

  const scrollToOffers = () => {
    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className={`personal-hero ${tiranga ? "personal-hero--tiranga" : ""}`}
      aria-label="Personal and home laundry services"
    >
      <div className="personal-hero-grid">
        <div className="personal-hero-copy">
          <span className="personal-hero-badge">{hero.badge}</span>
          <h1 className="personal-hero-title">
            {tiranga ? (
              <>
                {hero.title}
                <span className="personal-hero-title-accent">{hero.accent}</span>
              </>
            ) : (
              <>
                {hero.title}
                <span className="personal-hero-title-accent">{hero.accent}</span>
              </>
            )}
          </h1>
          <p className="personal-hero-subtitle">{hero.subtitle}</p>
          {tiranga ? (
            <p className="personal-hero-credit-note">{hero.creditNote}</p>
          ) : null}

          <div className="personal-hero-features">
            {FEATURES.map((item) => (
              <div key={item.label} className="personal-hero-feature">
                <span className="personal-hero-feature-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="personal-hero-feature-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="personal-hero-ctas">
            <button type="button" className="personal-hero-btn-primary" onClick={openSchedulePickup}>
              Schedule free pickup
            </button>
            {tiranga ? (
              <button type="button" className="personal-hero-btn-secondary" onClick={scrollToOffers}>
                View offers
              </button>
            ) : (
              <button type="button" className="personal-hero-btn-secondary" onClick={openAppDownload}>
                Get the Cleenzo app
              </button>
            )}
          </div>

          <div className="personal-hero-trust">
            {TRUST.map((item) => (
              <span key={item.label} className="personal-hero-trust-item">
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="personal-hero-visual">
          <img
            src={personalHeroImage}
            alt="Cleenzo staff handing premium laundry bag to a customer at the store"
            className="personal-hero-image"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="personal-hero-promise">
        <div className="personal-hero-promise-inner">
          <div className="personal-hero-promise-copy">
            <p className="personal-hero-promise-badge">{usp.badge}</p>
            <h2 className="personal-hero-promise-title">{usp.headline}</h2>
            <p className="personal-hero-promise-desc">
              {tiranga
                ? usp.description
                : `${USP.description} Fast laundry service with free pickup & express doorstep delivery.`}
            </p>
          </div>
          <button
            type="button"
            className="personal-hero-promise-cta"
            onClick={openSchedulePickup}
          >
            {usp.cta}
          </button>
        </div>
      </div>

      <div className={`personal-hero-strip personal-hero-strip--${stripClass}`}>
        {STRIP.map((item) => (
          <div key={item.label} className="personal-hero-strip-item">
            <span className="personal-hero-strip-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PersonalHeroBanner;
