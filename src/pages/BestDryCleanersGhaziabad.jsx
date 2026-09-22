import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS,
  STORE_MAPS_URL,
} from "../constants";
import { useSchedulePickup } from "../context/SchedulePickupContext";
import {
  BEST_DRY_CLEANERS_GHAZIABAD_CONTENT,
  BEST_DRY_CLEANERS_GHAZIABAD_PATH,
} from "../data/bestDryCleanersGhaziabad";
import { openWhatsAppBooking } from "../whatsapp";
import "./dry-cleaners-rne.css";

const content = BEST_DRY_CLEANERS_GHAZIABAD_CONTENT;

function SectionEyebrow({ children }) {
  return <p className="dcrne-eyebrow">{children}</p>;
}

function HeroCtaGroup() {
  const { openSchedulePickup } = useSchedulePickup();

  return (
    <div className="dcrne-cta-group">
      <button type="button" className="dcrne-btn dcrne-btn-primary" onClick={openSchedulePickup}>
        Book a Pickup
      </button>
      <Link className="dcrne-btn dcrne-btn-call" to="/#pricing">
        View Pricing
      </Link>
    </div>
  );
}

function CtaGroup({ className = "" }) {
  const { openSchedulePickup } = useSchedulePickup();

  return (
    <div className={`dcrne-cta-group ${className}`.trim()}>
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
            "Hi Cleenzo! I'm looking for dry cleaning pickup in Ghaziabad. Please share available slots.",
          )
        }
      >
        WhatsApp
      </button>
    </div>
  );
}

function Hero() {
  const img = content.heroImage;
  const { offer } = content;

  return (
    <header className="dcrne-hero">
      <div className="dcrne-hero-inner">
        <nav className="dcrne-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/dry-cleaning-ghaziabad">Dry cleaning</Link>
          <span aria-hidden="true">/</span>
          <span>Best Dry Cleaners in Ghaziabad</span>
        </nav>

        <div className="dcrne-hero-grid">
          <div>
            <span className="dcrne-badge">{content.badge}</span>
            <h1 className="dcrne-title">{content.h1}</h1>
            <p className="dcrne-subtitle">{content.subtitle}</p>

            <p className="dcrne-hero-meta" style={{ marginTop: "1rem" }}>
              <strong>{offer.title}</strong> · {offer.subtitle}
              <br />
              <span style={{ opacity: 0.75 }}>{offer.note}</span>
            </p>

            <HeroCtaGroup />

            <p className="dcrne-hero-meta">
              <strong>Store:</strong> {STORE_ADDRESS} · <strong>Phone:</strong>{" "}
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </p>
          </div>
          <div className="dcrne-hero-visual">
            <img
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <section className="dcrne-section dcrne-section-pale" aria-labelledby="bdcg-intro-heading">
      <div className="dcrne-container dcrne-prose">
        <SectionEyebrow>Best dry cleaners in Ghaziabad</SectionEyebrow>
        <h2 id="bdcg-intro-heading">What to look for in a dry cleaner</h2>
        {content.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ChooseCriteria() {
  return (
    <section className="dcrne-section" aria-labelledby="bdcg-why-heading">
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>Why Cleenzo</SectionEyebrow>
          <h2 id="bdcg-why-heading">Why Cleenzo is a top choice for dry cleaning in Ghaziabad</h2>
          <p>
            When you compare dry cleaners in Ghaziabad, look past the shopfront — process,
            transparency and real reviews matter more than promises.
          </p>
        </div>
        <ul className="dcrne-why-grid">
          {content.chooseCriteria.map((item) => (
            <li key={item.title}>
              <span className="dcrne-why-icon" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="dcrne-section dcrne-section-pale" aria-labelledby="bdcg-process-heading">
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 id="bdcg-process-heading">Booking dry cleaning with Cleenzo</h2>
          <p>A simple four-step process from doorstep pickup to doorstep delivery.</p>
        </div>
        <ol className="dcrne-process">
          {content.process.map((item) => (
            <li key={item.step}>
              <span className="dcrne-process-num" aria-hidden="true">
                {item.step}
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="dcrne-section" aria-labelledby="bdcg-services-heading">
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>Services</SectionEyebrow>
          <h2 id="bdcg-services-heading">Dry cleaning &amp; garment care in Ghaziabad</h2>
          <p>
            From everyday shirts to wedding wear, Cleenzo cleans the garments people across
            Ghaziabad bring to a trusted dry cleaner.
          </p>
        </div>
        <div className="dcrne-services">
          {content.services.map((service) => {
            const card = (
              <article className="dcrne-service-card">
                <div className="dcrne-service-body">
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  {service.href ? (
                    <span className="dcrne-service-link">Know more →</span>
                  ) : null}
                </div>
              </article>
            );

            return service.href ? (
              <Link key={service.title} to={service.href} className="dcrne-service-link-wrap">
                {card}
              </Link>
            ) : (
              <div key={service.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceAreas() {
  const { serviceAreas } = content;

  return (
    <section className="dcrne-section dcrne-section-pale" aria-labelledby="bdcg-areas-heading">
      <div className="dcrne-container dcrne-prose">
        <SectionEyebrow>Service areas</SectionEyebrow>
        <h2 id="bdcg-areas-heading">Dry Cleaning Services Across Ghaziabad</h2>
        <p>{serviceAreas.intro}</p>
        <ul className="dcrne-why-grid" style={{ marginTop: "1.25rem" }}>
          {serviceAreas.areas.map((area) => (
            <li key={area}>
              <span className="dcrne-why-icon" aria-hidden="true">
                📍
              </span>
              <div>
                <h3>{area}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PricingCta() {
  return (
    <section className="dcrne-pricing" aria-labelledby="bdcg-pricing-heading">
      <div className="dcrne-container dcrne-pricing-inner">
        <SectionEyebrow>Transparent pricing</SectionEyebrow>
        <h2 id="bdcg-pricing-heading">Know your dry cleaning rates before pickup</h2>
        <p>{content.pricingNote}</p>
        <div className="dcrne-pricing-actions">
          <Link to="/#pricing" className="dcrne-btn dcrne-btn-light">
            View full price list
          </Link>
          <CtaGroup />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="dcrne-section" aria-labelledby="bdcg-faq-heading">
      <div className="dcrne-container dcrne-faq">
        <div className="dcrne-section-head">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 id="bdcg-faq-heading">Best dry cleaners in Ghaziabad — FAQs</h2>
        </div>
        <dl className="dcrne-faq-list">
          {content.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className={`dcrne-faq-item ${isOpen ? "is-open" : ""}`}>
                <dt>
                  <button
                    type="button"
                    className="dcrne-faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {faq.question}
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </dt>
                {isOpen ? <dd>{faq.answer}</dd> : null}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact-best-dry-cleaners"
      className="dcrne-section dcrne-section-pale"
      aria-labelledby="bdcg-contact-heading"
    >
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>Contact</SectionEyebrow>
          <h2 id="bdcg-contact-heading">Visit or book a dry cleaning pickup</h2>
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
            <CtaGroup className="dcrne-cta-stack" />
          </address>
          <div className="dcrne-contact-card">
            <h3>Explore related services</h3>
            <ul className="dcrne-internal-links">
              {content.internalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <strong>{link.label}</strong>
                    <span>{link.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function BestDryCleanersGhaziabad() {
  return (
    <article className="dcrne-page" data-path={BEST_DRY_CLEANERS_GHAZIABAD_PATH}>
      <Hero />
      <Intro />
      <ChooseCriteria />
      <Process />
      <Services />
      <ServiceAreas />
      <PricingCta />
      <GoogleReviewsSection compact />
      <Faq />
      <Contact />
      <PlaceOrderCTA title="Book the best dry cleaning pickup in Ghaziabad" variant="cream" />
    </article>
  );
}

export default BestDryCleanersGhaziabad;
