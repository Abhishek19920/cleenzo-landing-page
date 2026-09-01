import {
  FESTIVE_FIRST3_MAX_ORDERS,
  FESTIVE_FIRST3_PERCENT_OFF,
  OFFER_PROGRAM_START,
} from "../../utils/festiveCampaign";
import "./festive-sale-carousel-banner.css";

function FestiveSaleCarouselBanner({ onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className="festive-sale-banner"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className="festive-sale-banner__accent" aria-hidden="true" />
      <div className="festive-sale-banner__inner">
        <div className="festive-sale-banner__left">
          <p className="festive-sale-banner__eyebrow">New customer offer</p>
          <p className="festive-sale-banner__headline">
            Welcome to Cleenzo.{" "}
            <span className="festive-sale-banner__headline-em">Start with savings.</span>
          </p>
          <p className="festive-sale-banner__tagline">
            German chemicals · Expert finishing · Free doorstep pickup
          </p>
          <p className="festive-sale-banner__dates">
            Always on · from 1 September 2026
          </p>
          <ul className="festive-sale-banner__areas" aria-label="Service areas">
            <li>Raj Nagar Extn</li>
            <li>Sidharth Vihar</li>
            <li>Kanawani</li>
            <li>Ahinsa Khand</li>
            <li>Indirapuram</li>
            <li>Vaishali</li>
          </ul>
        </div>

        <div className="festive-sale-banner__offer">
          <p className="festive-sale-banner__flat">New here?</p>
          <p className="festive-sale-banner__pct">{FESTIVE_FIRST3_PERCENT_OFF}% OFF</p>
          <p className="festive-sale-banner__credit">
            on your first <strong>{FESTIVE_FIRST3_MAX_ORDERS} orders</strong>
            <span className="festive-sale-banner__credit-sub">
              eligible laundry &amp; dry cleaning
            </span>
          </p>
          <span className="festive-sale-banner__audience">
            For new customers
            <span className="festive-sale-banner__audience-sub">
              No prior completed order before{" "}
              {OFFER_PROGRAM_START === "2026-09-01"
                ? "1 Sep 2026"
                : OFFER_PROGRAM_START}
            </span>
          </span>
        </div>

        <div className="festive-sale-banner__right" aria-hidden="true">
          <div className="festive-sale-banner__pillars">
            <div className="festive-sale-banner__pillar">
              <span className="festive-sale-banner__pillar-icon">✦</span>
              <span>QC checked</span>
            </div>
            <div className="festive-sale-banner__pillar">
              <span className="festive-sale-banner__pillar-icon">⚙</span>
              <span>Pro machines</span>
            </div>
            <div className="festive-sale-banner__pillar">
              <span className="festive-sale-banner__pillar-icon">🛵</span>
              <span>Free pickup</span>
            </div>
          </div>
          <p className="festive-sale-banner__cta-hint">Tap to book pickup →</p>
        </div>
      </div>
    </button>
  );
}

export default FestiveSaleCarouselBanner;
