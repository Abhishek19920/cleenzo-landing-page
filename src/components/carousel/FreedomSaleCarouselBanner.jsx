import "./freedom-sale-carousel-banner.css";

function FreedomSaleCarouselBanner({ onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className="freedom-sale-banner"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className="freedom-sale-banner__accent" aria-hidden="true" />
      <div className="freedom-sale-banner__inner">
        <div className="freedom-sale-banner__left">
          <p className="freedom-sale-banner__eyebrow">Premium laundry · Ghaziabad &amp; nearby</p>
          <p className="freedom-sale-banner__headline">
            Quality care.{" "}
            <span className="freedom-sale-banner__headline-em">Season savings.</span>
          </p>
          <p className="freedom-sale-banner__tagline">
            German chemicals · Expert finishing · Free doorstep pickup
          </p>
          <p className="freedom-sale-banner__dates">
            Offer live · 9th – 30th August
          </p>
          <ul className="freedom-sale-banner__areas" aria-label="Service areas">
            <li>Raj Nagar Extn</li>
            <li>Sidharth Vihar</li>
            <li>Kanawani</li>
            <li>Ahinsa Khand</li>
            <li>Indirapuram</li>
            <li>Vaishali</li>
          </ul>
        </div>

        <div className="freedom-sale-banner__offer">
          <p className="freedom-sale-banner__flat">Flat</p>
          <p className="freedom-sale-banner__pct">40% OFF</p>
          <p className="freedom-sale-banner__credit">
            + <strong>10% Cleenzo Credit</strong>
            <span className="freedom-sale-banner__credit-sub">
              on your next order after the campaign
            </span>
          </p>
          <span className="freedom-sale-banner__audience">
            For everyone
            <span className="freedom-sale-banner__audience-sub">New &amp; existing customers</span>
          </span>
        </div>

        <div className="freedom-sale-banner__right" aria-hidden="true">
          <div className="freedom-sale-banner__pillars">
            <div className="freedom-sale-banner__pillar">
              <span className="freedom-sale-banner__pillar-icon">✦</span>
              <span>QC checked</span>
            </div>
            <div className="freedom-sale-banner__pillar">
              <span className="freedom-sale-banner__pillar-icon">⚙</span>
              <span>Pro machines</span>
            </div>
            <div className="freedom-sale-banner__pillar">
              <span className="freedom-sale-banner__pillar-icon">🛵</span>
              <span>Free pickup</span>
            </div>
          </div>
          <p className="freedom-sale-banner__cta-hint">Tap to book pickup →</p>
        </div>
      </div>
    </button>
  );
}

export default FreedomSaleCarouselBanner;
