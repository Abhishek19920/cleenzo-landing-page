import "./freedom-sale-carousel-banner.css";

function FreedomSaleCarouselBanner({ onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className="freedom-sale-banner"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className="freedom-sale-banner__tricolor" aria-hidden="true" />
      <div className="freedom-sale-banner__watermark" aria-hidden="true" />
      <div className="freedom-sale-banner__inner">
        <div className="freedom-sale-banner__left">
          <p className="freedom-sale-banner__headline">
            FREEDOM &amp; RAKHI SALE <span aria-hidden="true">🇮🇳</span>
          </p>
          <p className="freedom-sale-banner__dates">
            <span aria-hidden="true">📅</span> 9TH – 30TH AUGUST
          </p>
          <div className="freedom-sale-banner__mobile-perks" aria-hidden="true">
            <span>🛵 FREE PICKUP &amp; DELIVERY</span>
          </div>
        </div>

        <div className="freedom-sale-banner__offer">
          <p className="freedom-sale-banner__flat">FLAT</p>
          <p className="freedom-sale-banner__pct">40% OFF</p>
          <p className="freedom-sale-banner__credit">
            <span className="freedom-sale-banner__asterisk">*</span> GET <strong>10% BACK</strong>
            <span className="freedom-sale-banner__credit-sub">
              AS CLEENZO CREDIT ON YOUR NEXT ORDER
            </span>
          </p>
          <span className="freedom-sale-banner__audience">
            FOR EVERYONE
            <span className="freedom-sale-banner__audience-sub">New &amp; Existing Customers</span>
          </span>
        </div>

        <div className="freedom-sale-banner__right" aria-hidden="true">
          <div className="freedom-sale-banner__shirts">
            <span className="freedom-sale-banner__shirt freedom-sale-banner__shirt--1" />
            <span className="freedom-sale-banner__shirt freedom-sale-banner__shirt--2" />
            <span className="freedom-sale-banner__shirt freedom-sale-banner__shirt--3" />
            <span className="freedom-sale-banner__shirt freedom-sale-banner__shirt--4" />
          </div>
          <div className="freedom-sale-banner__bag">
            <span className="freedom-sale-banner__bag-icon">🚚</span>
            FREE PICKUP &amp; DELIVERY
          </div>
        </div>
      </div>
    </button>
  );
}

export default FreedomSaleCarouselBanner;
