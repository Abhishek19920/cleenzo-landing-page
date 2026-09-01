import {
  GANESH_CHATURTHI_CREDIT_PERCENT,
  GANESH_CHATURTHI_MAX_ORDERS,
  GANESH_CHATURTHI_MIN_ORDER_INR,
  GANESH_CHATURTHI_PERCENT_OFF,
} from "../../utils/ganeshChaturthiCampaign";
import "./festive-sale-carousel-banner.css";

function GaneshChaturthiCarouselBanner({ onClick, ariaLabel }) {
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
          <p className="festive-sale-banner__eyebrow">Ganesh Chaturthi special</p>
          <p className="festive-sale-banner__headline">
            Celebrate with{" "}
            <span className="festive-sale-banner__headline-em">fresh, cared-for clothes.</span>
          </p>
          <p className="festive-sale-banner__tagline">
            German chemicals · Expert finishing · Free doorstep pickup
          </p>
          <p className="festive-sale-banner__dates">
            3rd – 15th September · Min order ₹{GANESH_CHATURTHI_MIN_ORDER_INR}
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
          <p className="festive-sale-banner__flat">Flat</p>
          <p className="festive-sale-banner__pct">{GANESH_CHATURTHI_PERCENT_OFF}% OFF</p>
          <p className="festive-sale-banner__credit">
            + <strong>{GANESH_CHATURTHI_CREDIT_PERCENT}% Cleenzo Credit</strong>
            <span className="festive-sale-banner__credit-sub">
              {GANESH_CHATURTHI_CREDIT_PERCENT}% credit on amount you pay after discount ·
              min gross ₹{GANESH_CHATURTHI_MIN_ORDER_INR} · first {GANESH_CHATURTHI_MAX_ORDERS} orders
            </span>
          </p>
          <span className="festive-sale-banner__audience">
            For everyone
            <span className="festive-sale-banner__audience-sub">
              Eligible laundry &amp; dry cleaning
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

export default GaneshChaturthiCarouselBanner;
