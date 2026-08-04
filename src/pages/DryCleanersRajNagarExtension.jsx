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
  DRY_CLEANERS_RNE_CONTENT,
  DRY_CLEANERS_RNE_PATH,
} from "../data/dryCleanersRajNagarExtension";
import { openWhatsAppBooking } from "../whatsapp";
import "./dry-cleaners-rne.css";

const content = DRY_CLEANERS_RNE_CONTENT;

function SectionEyebrow({ children }) {
  return (
    <p className="dcrne-eyebrow">{children}</p>
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
            "Hi Cleenzo! I need dry cleaning pickup in Raj Nagar Extension. Please share available slots.",
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

  return (
    <header className="dcrne-hero">
      <div className="dcrne-hero-inner">
        <nav className="dcrne-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/dry-cleaning-ghaziabad">Dry cleaning</Link>
          <span aria-hidden="true">/</span>
          <span>Raj Nagar Extension</span>
        </nav>

        <div className="dcrne-hero-grid">
          <div>
            <span className="dcrne-badge">{content.badge}</span>
            <h1 className="dcrne-title">{content.h1}</h1>
            <p className="dcrne-subtitle">{content.subtitle}</p>
            <CtaGroup />
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
    <section className="dcrne-section dcrne-section-pale" aria-labelledby="dcrne-intro-heading">
      <div className="dcrne-container dcrne-prose">
        <SectionEyebrow>Dry cleaners Raj Nagar Extension</SectionEyebrow>
        <h2 id="dcrne-intro-heading">Premium dry cleaning close to home</h2>
        {content.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        <p>
          Looking for the best dry cleaners without the chain-store runaround? Cleenzo focuses on
          garment care quality first — then convenience through free pickup, barcode tracking and
          clear pricing for dry cleaning Ghaziabad customers.
        </p>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="dcrne-section" aria-labelledby="dcrne-why-heading">
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>Why Cleenzo</SectionEyebrow>
          <h2 id="dcrne-why-heading">Why choose Cleenzo for dry cleaning</h2>
          <p>
            Residents searching dry clean near me in Raj Nagar Extension choose Cleenzo for local
            access, premium dry cleaning processes and express options that still include full
            quality checks.
          </p>
        </div>
        <ul className="dcrne-why-grid">
          {content.whyChoose.map((item) => (
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
    <section className="dcrne-section dcrne-section-pale" aria-labelledby="dcrne-process-heading">
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 id="dcrne-process-heading">How dry cleaning works at Cleenzo</h2>
          <p>
            A clear dry cleaning service flow — from doorstep pickup in Raj Nagar Extension to
            steam-pressed delivery — keeps results consistent order after order.
          </p>
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
    <section className="dcrne-section" aria-labelledby="dcrne-services-heading">
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>Services</SectionEyebrow>
          <h2 id="dcrne-services-heading">Dry cleaning &amp; garment care services</h2>
          <p>
            From wedding wear to leather jackets, curtains and blankets — Cleenzo covers the
            garments people in Raj Nagar Extension bring to their trusted dry cleaners.
          </p>
        </div>
        <div className="dcrne-services">
          {content.services.map((service) => {
            const card = (
              <article className="dcrne-service-card">
                <div className="dcrne-service-media">
                  <img
                    src={service.image.src}
                    alt={service.image.alt}
                    width={800}
                    height={533}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
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

function Benefits() {
  return (
    <section className="dcrne-section dcrne-section-pale" aria-labelledby="dcrne-benefits-heading">
      <div className="dcrne-container dcrne-prose">
        <SectionEyebrow>Benefits</SectionEyebrow>
        <h2 id="dcrne-benefits-heading">24 hour delivery, free pickup &amp; more</h2>
        {content.benefits.map((block) => (
          <div key={block.title} className="dcrne-benefit-block">
            <h3>{block.title}</h3>
            <p>{block.body}</p>
          </div>
        ))}
        <p>
          Cleenzo also supports{" "}
          <Link to="/laundry-service-raj-nagar-extension">laundry service in Raj Nagar Extension</Link>
          ,{" "}
          <Link to="/shoe-cleaning-ghaziabad">shoe cleaning in Ghaziabad</Link>, and{" "}
          <Link to="/commercial-laundry-ghaziabad">commercial laundry</Link> for hotels and
          businesses — so families and workplaces can consolidate garment care with one local
          partner.
        </p>
      </div>
    </section>
  );
}

function PricingCta() {
  return (
    <section className="dcrne-pricing" aria-labelledby="dcrne-pricing-heading">
      <div className="dcrne-container dcrne-pricing-inner">
        <SectionEyebrow>Transparent pricing</SectionEyebrow>
        <h2 id="dcrne-pricing-heading">Know your dry cleaning rates before pickup</h2>
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
    <section className="dcrne-section" aria-labelledby="dcrne-faq-heading">
      <div className="dcrne-container dcrne-faq">
        <div className="dcrne-section-head">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 id="dcrne-faq-heading">Dry cleaners Raj Nagar Extension — FAQs</h2>
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
      id="contact-dry-cleaners"
      className="dcrne-section dcrne-section-pale"
      aria-labelledby="dcrne-contact-heading"
    >
      <div className="dcrne-container">
        <div className="dcrne-section-head">
          <SectionEyebrow>Contact</SectionEyebrow>
          <h2 id="dcrne-contact-heading">Visit or book dry cleaning pickup</h2>
        </div>
        <div className="dcrne-contact-grid">
          <address className="dcrne-contact-card">
            <h3>Cleenzo store</h3>
            <p>{STORE_ADDRESS}</p>
            <p>
              Phone:{" "}
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
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
            <p className="dcrne-contact-note">
              Also see our main{" "}
              <Link to="/dry-cleaning-ghaziabad">dry cleaning Ghaziabad</Link> page for city-wide
              service details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DryCleanersRajNagarExtension() {
  return (
    <article className="dcrne-page" data-path={DRY_CLEANERS_RNE_PATH}>
      <Hero />
      <Intro />
      <WhyChoose />
      <Process />
      <Services />
      <Benefits />
      <PricingCta />
      <GoogleReviewsSection compact />
      <Faq />
      <Contact />
      <PlaceOrderCTA
        title="Book dry cleaning pickup in Raj Nagar Extension"
        variant="cream"
      />
    </article>
  );
}

export default DryCleanersRajNagarExtension;
