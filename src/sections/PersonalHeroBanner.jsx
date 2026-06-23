import { useSchedulePickup } from "../context/SchedulePickupContext";
import { useAppDownload } from "../context/AppDownloadContext";
import { useCarouselStrip } from "../context/CarouselStripContext";
import { PERSONAL_HERO, USP } from "../constants";
import personalHeroImage from "../assets/image/personal-hero-banner.jpg";
import "./personal-hero.css";

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

const STRIP = [
  { icon: "🧺", label: "Laundry" },
  { icon: "🧥", label: "Dry Clean" },
  { icon: "🛵", label: "Free Pickup" },
  { icon: "⚡", label: "Express Delivery" },
];

function PersonalHeroBanner() {
  const { openSchedulePickup } = useSchedulePickup();
  const { openAppDownload } = useAppDownload();
  const { stripTone } = useCarouselStrip();

  return (
    <section id="hero" className="personal-hero" aria-label="Personal and home laundry services">
      <div className="personal-hero-grid">
        <div className="personal-hero-copy">
          <span className="personal-hero-badge">{PERSONAL_HERO.badge}</span>
          <h1 className="personal-hero-title">
            {PERSONAL_HERO.title}
            <span className="personal-hero-title-accent">{PERSONAL_HERO.accent}</span>
          </h1>
          <p className="personal-hero-subtitle">{PERSONAL_HERO.subtitle}</p>

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
            <button type="button" className="personal-hero-btn-secondary" onClick={openAppDownload}>
              Get the Cleenzo app
            </button>
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
            <p className="personal-hero-promise-badge">{USP.badge}</p>
            <h2 className="personal-hero-promise-title">{USP.headline}</h2>
            <p className="personal-hero-promise-desc">
              {USP.description} Fast laundry service with free pickup &amp; express doorstep delivery.
            </p>
          </div>
          <button
            type="button"
            className="personal-hero-promise-cta"
            onClick={openSchedulePickup}
          >
            {USP.cta}
          </button>
        </div>
      </div>

      <div className={`personal-hero-strip personal-hero-strip--${stripTone}`}>
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
