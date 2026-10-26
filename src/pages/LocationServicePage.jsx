import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS,
  STORE_MAPS_URL,
} from "../constants";
import { useSchedulePickup } from "../context/SchedulePickupContext";
import { getLocationPageByPath } from "../data/locationPages";
import { openWhatsAppBooking } from "../whatsapp";
import NotFound from "./NotFound";
import "./dry-cleaners-rne.css";

const SERVICE_LINKS = [
  { to: "/laundry-service-ghaziabad/", label: "Laundry service", desc: "Wash & fold, wash & iron" },
  { to: "/dry-cleaning-ghaziabad/", label: "Dry cleaning", desc: "Suits, sarees & delicates" },
  { to: "/sofa-cleaning/", label: "Sofa cleaning", desc: "At-home upholstery care" },
  { to: "/carpet-cleaning/", label: "Carpet cleaning", desc: "Deep shampoo & extraction" },
  { to: "/shoe-cleaning/", label: "Shoe cleaning", desc: "Sneakers & leather" },
  { to: "/curtain-cleaning/", label: "Curtain cleaning", desc: "Drapes & home textiles" },
  {
    to: "/dry-cleaners-raj-nagar-extension/",
    label: "Dry cleaners — Raj Nagar Extn",
    desc: "Our store neighbourhood",
  },
];

const SISTER_LOCATIONS = [
  { to: "/laundry-dry-cleaning-indirapuram/", label: "Indirapuram" },
  { to: "/laundry-dry-cleaning-vaishali/", label: "Vaishali" },
  { to: "/laundry-dry-cleaning-noida-extension/", label: "Noida Extension" },
  { to: "/dry-cleaners-raj-nagar-extension/", label: "Raj Nagar Extension" },
];

function CtaGroup({ areaName }) {
  const { openSchedulePickup } = useSchedulePickup();
  return (
    <div className="dcrne-cta-group">
      <button type="button" className="dcrne-btn dcrne-btn-primary" onClick={openSchedulePickup}>
        Book Pickup
      </button>
      <a className="dcrne-btn dcrne-btn-call" href={`tel:${PHONE_TEL}`}>
        Call Now
      </a>
      <button
        type="button"
        className="dcrne-btn dcrne-btn-whatsapp"
        onClick={() =>
          openWhatsAppBooking(
            `Hi Cleenzo! I need laundry / dry cleaning pickup in ${areaName}. Please share available slots.`,
          )
        }
      >
        WhatsApp
      </button>
    </div>
  );
}

function LocationServicePage() {
  const { pathname } = useLocation();
  const page = getLocationPageByPath(pathname);
  const [openFaq, setOpenFaq] = useState(0);

  if (!page) return <NotFound />;

  return (
    <article className="dcrne-page" data-path={page.path}>
      <header className="dcrne-hero">
        <div className="dcrne-hero-inner">
          <nav className="dcrne-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{page.name}</span>
          </nav>
          <div className="dcrne-hero-grid">
            <div>
              <span className="dcrne-badge">{page.badge}</span>
              <h1 className="dcrne-title">{page.h1}</h1>
              <p className="dcrne-subtitle">{page.subtitle}</p>
              <CtaGroup areaName={page.name} />
              <p className="dcrne-hero-meta">
                <strong>Store:</strong> {STORE_ADDRESS} · <strong>Phone:</strong>{" "}
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="dcrne-section" aria-labelledby="loc-intro">
        <div className="dcrne-container dcrne-prose">
          <p className="dcrne-eyebrow">Service area</p>
          <h2 id="loc-intro">Doorstep cleaning for {page.regionLabel}</h2>
          {page.intro.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
      </section>

      <section className="dcrne-section dcrne-section-pale" aria-labelledby="loc-areas">
        <div className="dcrne-container">
          <div className="dcrne-section-head">
            <p className="dcrne-eyebrow">Neighbourhoods</p>
            <h2 id="loc-areas">Areas we commonly pick up from in {page.name}</h2>
            <p>Share your society name when you book — we confirm the slot for your pin code.</p>
          </div>
          <ul className="dcrne-areas-grid">
            {page.neighbourhoods.map((area) => (
              <li key={area}>
                <h3>{area}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dcrne-section" aria-labelledby="loc-services">
        <div className="dcrne-container">
          <div className="dcrne-section-head">
            <p className="dcrne-eyebrow">Services</p>
            <h2 id="loc-services">What you can book in {page.name}</h2>
            <p>{page.servicesBlurb}</p>
          </div>
          <ul className="dcrne-internal-links" style={{ maxWidth: "42rem", margin: "0 auto" }}>
            {SERVICE_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>
                  <strong>{link.label}</strong>
                  <span>{link.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GoogleReviewsSection compact />

      <section className="dcrne-section dcrne-faq" aria-labelledby="loc-faq">
        <div className="dcrne-container">
          <div className="dcrne-section-head">
            <p className="dcrne-eyebrow">FAQ</p>
            <h2 id="loc-faq">{page.name} laundry & dry cleaning — FAQs</h2>
          </div>
          <dl>
            {page.faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.question} className="dcrne-faq-item">
                  <dt>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      {faq.question}
                    </button>
                  </dt>
                  {open ? <dd>{faq.answer}</dd> : null}
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="dcrne-section dcrne-section-pale" aria-labelledby="loc-contact">
        <div className="dcrne-container">
          <div className="dcrne-section-head">
            <p className="dcrne-eyebrow">Contact</p>
            <h2 id="loc-contact">Book a pickup in {page.name}</h2>
          </div>
          <div className="dcrne-contact-grid">
            <address className="dcrne-contact-card">
              <h3>Cleenzo store</h3>
              <p>{STORE_ADDRESS}</p>
              <p>
                Phone: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </p>
              <p>
                <a href={STORE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </p>
              <CtaGroup areaName={page.name} />
            </address>
            <div className="dcrne-contact-card">
              <h3>Other service areas</h3>
              <ul className="dcrne-internal-links">
                {SISTER_LOCATIONS.filter((l) => !l.to.includes(page.slug)).map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>
                      <strong>{link.label}</strong>
                      <span>Laundry & dry cleaning pickup</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PlaceOrderCTA
        title={`Book free laundry pickup in ${page.name}`}
        variant="cream"
      />
    </article>
  );
}

export default LocationServicePage;
