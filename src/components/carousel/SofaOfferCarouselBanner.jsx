import {
  FESTIVE_FIRST3_MAX_DISCOUNT_INR,
  FESTIVE_FIRST3_MAX_ORDERS,
  FESTIVE_FIRST3_PERCENT_OFF,
} from "../../utils/festiveCampaign";
import {
  SOFA_SHEET_LIST_INR,
  SOFA_SHEET_PERCENT_OFF,
  SOFA_SHEET_SALE_INR,
} from "../../utils/sofaDryCleanCampaign";
import "./sofa-offer-carousel-banner.css";

function SofaOfferCarouselBanner({ onClick, ariaLabel }) {
  return (
    <button type="button" className="sofa-offer-banner" onClick={onClick} aria-label={ariaLabel}>
      <div className="sofa-offer-banner__accent" aria-hidden="true" />
      <div className="sofa-offer-banner__inner">
        <div>
          <p className="sofa-offer-banner__eyebrow">Raj Nagar Extension · till 30 Nov</p>
          <p className="sofa-offer-banner__headline">
            Sofa sheets & dry clean
            <span className="sofa-offer-banner__headline-em">Fresh home. Sharper clothes.</span>
          </p>
          <p className="sofa-offer-banner__tagline">
            Home visit for sofa sheets · Free doorstep pickup for dry clean
          </p>
          <p className="sofa-offer-banner__dates">Offer live · 25 Oct – 30 Nov</p>
          <ul className="sofa-offer-banner__areas" aria-label="Service areas">
            <li>Raj Nagar Extn</li>
            <li>Sidharth Vihar</li>
            <li>Indirapuram</li>
            <li>Vaishali</li>
          </ul>
        </div>

        <div className="sofa-offer-banner__deals">
          <div className="sofa-offer-banner__deal">
            <p className="sofa-offer-banner__deal-kicker">Sofa sheets</p>
            <p className="sofa-offer-banner__deal-pct">{SOFA_SHEET_PERCENT_OFF}% off</p>
            <p className="sofa-offer-banner__price">
              <span className="sofa-offer-banner__was">₹{SOFA_SHEET_LIST_INR}</span>
              ₹{SOFA_SHEET_SALE_INR}
              <span className="sofa-offer-banner__deal-note">per sheet · for everyone</span>
            </p>
          </div>
          <div className="sofa-offer-banner__deal sofa-offer-banner__deal--accent">
            <p className="sofa-offer-banner__deal-kicker">Dry clean</p>
            <p className="sofa-offer-banner__deal-pct">{FESTIVE_FIRST3_PERCENT_OFF}% off</p>
            <p className="sofa-offer-banner__price">
              First {FESTIVE_FIRST3_MAX_ORDERS} orders
              <span className="sofa-offer-banner__deal-note">
                Max ₹{FESTIVE_FIRST3_MAX_DISCOUNT_INR} · blankets included
              </span>
            </p>
          </div>
        </div>

        <div className="sofa-offer-banner__side" aria-hidden="true">
          <span className="sofa-offer-banner__book">Book now →</span>
          <div className="sofa-offer-banner__points">
            <span>Home visit</span>
            <span>Free pickup</span>
            <span>QC checked</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default SofaOfferCarouselBanner;
