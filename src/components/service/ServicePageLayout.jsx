import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PlaceOrderCTA from "../PlaceOrderCTA";
import GoogleReviewsSection from "../GoogleReviewsSection";
import { SERVICE_AREAS } from "../../data/servicePages";
import { canonicalPath, normalizePathKey } from "../../seo/routes";
import { openWhatsAppBooking } from "../../whatsapp";
import "./service-page.css";

const HERO_PILLS = [
  { icon: "🛵", label: "Free pickup" },
  { icon: "⚡", label: "Express delivery" },
  { icon: "✅", label: "Quality assured" },
];

/** Required hub links on every service page */
const HUB_LINKS = [
  { path: "/", label: "Home" },
  { path: "/laundry-service-ghaziabad", label: "Laundry" },
  { path: "/dry-cleaning-ghaziabad", label: "Dry Cleaning" },
  { path: "/shoe-cleaning", label: "Shoe Cleaning" },
  { path: "/commercial-laundry", label: "Commercial Laundry" },
];

const RELATED_SERVICES = [
  { path: "/laundry-service-ghaziabad", label: "Laundry", icon: "🧺", desc: "Wash & fold · Wash & iron" },
  { path: "/dry-cleaning-ghaziabad", label: "Dry cleaning", icon: "🧥", desc: "Suits, silk & woollens" },
  { path: "/dry-cleaners-raj-nagar-extension", label: "Dry cleaners RNE", icon: "📍", desc: "Raj Nagar Extension hub" },
  { path: "/shoe-cleaning", label: "Shoe cleaning", icon: "👟", desc: "Sneakers & leather care" },
  { path: "/sofa-cleaning", label: "Sofa cleaning", icon: "🛋️", desc: "Fabric & upholstery" },
  { path: "/carpet-cleaning", label: "Carpet cleaning", icon: "🧶", desc: "Rugs & room carpets" },
  { path: "/curtain-cleaning", label: "Curtain cleaning", icon: "🪟", desc: "Drapes & blackout" },
  { path: "/commercial-laundry", label: "Commercial B2B", icon: "🏢", desc: "Hotels & businesses" },
];

function displayTitle(page) {
  return page.h1.split("|")[0].trim();
}

function ServiceBreadcrumb({ title }) {
  return (
    <nav className="service-page-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">/</span>
      <Link to="/#services">Services</Link>
      <span aria-hidden="true">/</span>
      <span style={{ color: "rgba(255,255,255,0.85)" }}>{title}</span>
    </nav>
  );
}

function ServiceHubLinks({ currentPath }) {
  return (
    <nav className="service-hub-links" aria-label="Main services">
      <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
        {HUB_LINKS.map((link) => {
          const isActive =
            link.path === "/"
              ? normalizePathKey(currentPath) === "/"
              : normalizePathKey(currentPath) === normalizePathKey(link.path);
          return (
            <li key={link.path}>
              <Link
                to={canonicalPath(link.path)}
                className={`inline-flex text-xs md:text-sm font-bold px-3.5 py-2 rounded-full border transition ${
                  isActive
                    ? "bg-cleenzo text-white border-cleenzo"
                    : "bg-white text-cleenzo-deep border-cleenzo-sky-light hover:border-cleenzo hover:text-cleenzo"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ServiceHero({ page }) {
  const title = displayTitle(page);
  const imageAlt = page.heroImageAlt || title;

  return (
    <section className="service-page-hero">
      <div className="service-page-hero-inner">
        <ServiceBreadcrumb title={page.serviceType} />

        <div className={page.heroImage ? "service-page-hero-grid" : ""}>
          <div>
            <span className="service-page-badge">{page.badge}</span>
            <h1 className="service-page-title">{title}</h1>
            <p className="service-page-subtitle">{page.subtitle}</p>

            <div className="service-page-pills">
              {HERO_PILLS.map((pill) => (
                <span key={pill.label} className="service-page-pill">
                  <span aria-hidden="true">{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>

            <div className="service-page-ctas">
              <button type="button" className="service-page-btn-whatsapp" onClick={openWhatsAppBooking}>
                Book on WhatsApp
              </button>
              <Link to="/#pricing" className="service-page-btn-primary">
                View pricing
              </Link>
            </div>
          </div>

          {page.heroImage ? (
            <div className="service-page-hero-visual">
              <img
                src={page.heroImage}
                alt={imageAlt}
                width={1536}
                height={1024}
                fetchPriority="high"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ServiceGallery({ images, title }) {
  if (!images?.length) return null;

  return (
    <section className="service-page-gallery py-12 md:py-16">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.2em] mb-3">Our work</p>
          <h2 className="text-2xl md:text-3xl font-black text-cleenzo-deep">{title}</h2>
        </div>

        <div
          className={`grid gap-4 ${
            images.length >= 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : images.length === 3
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-2"
          }`}
        >
          {images.map((image) => (
            <figure key={image.src} className="service-page-gallery-card aspect-[3/2]">
              <img src={image.src} alt={image.alt} loading="lazy" />
              {image.caption ? (
                <figcaption className="service-page-gallery-caption">{image.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }) {
  return (
    <p className="text-cleenzo font-bold text-xs uppercase tracking-[0.2em] mb-3">{children}</p>
  );
}

function WhyChooseGrid({ section }) {
  return (
    <div className="bg-white rounded-2xl border border-cleenzo-sky-light p-6 md:p-8 shadow-sm">
      <h2 className="text-xl md:text-2xl font-black text-cleenzo-deep mb-6">{section.title}</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {section.items.map((item) => (
          <li
            key={item.title}
            className="flex gap-4 bg-cleenzo-pale/60 border border-cleenzo-sky-light rounded-xl p-4"
          >
            <span
              className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cleenzo to-cleenzo-light text-white flex items-center justify-center text-xl shadow-md"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessSteps({ section }) {
  return (
    <div className="bg-white rounded-2xl border border-cleenzo-sky-light p-6 md:p-8 shadow-sm overflow-hidden">
      <SectionEyebrow>How we do it</SectionEyebrow>
      <h2 className="text-xl md:text-2xl font-black text-cleenzo-deep mb-8">{section.title}</h2>

      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
        <div className="absolute top-6 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-cleenzo/20 to-transparent" />
        {section.steps.map((step, i) => (
          <div key={step} className="relative flex flex-col items-center text-center px-1">
            <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-cleenzo to-cleenzo-light text-white flex items-center justify-center font-black text-sm shadow-lg shadow-cleenzo/20 border-[3px] border-white mb-3">
              {i + 1}
            </div>
            <p className="text-xs font-semibold text-cleenzo-dark leading-snug">{step}</p>
          </div>
        ))}
      </div>

      <div className="md:hidden space-y-3">
        {section.steps.map((step, i) => (
          <div
            key={step}
            className="flex gap-3 items-start bg-cleenzo-pale/50 border border-cleenzo-sky-light rounded-xl p-4"
          >
            <span className="shrink-0 w-9 h-9 rounded-full bg-cleenzo text-white flex items-center justify-center font-black text-xs">
              {i + 1}
            </span>
            <p className="text-sm font-medium text-slate-700 pt-1.5">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentBlock({ section }) {
  return (
    <article className="relative bg-white rounded-2xl border border-cleenzo-sky-light p-6 md:p-8 shadow-sm pl-7 md:pl-9">
      <div
        className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-cleenzo to-cleenzo-sky"
        aria-hidden="true"
      />
      <h2 className="text-xl md:text-2xl font-black text-cleenzo-deep leading-tight mb-4">
        {section.title}
      </h2>
      {section.body?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-slate-600 leading-relaxed mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
      {section.cta ? (
        <button
          type="button"
          onClick={openWhatsAppBooking}
          className="mt-5 inline-flex bg-cleenzo hover:bg-cleenzo-dark text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-md"
        >
          {section.cta}
        </button>
      ) : null}
    </article>
  );
}

function ServiceContent({ sections }) {
  return (
    <section className="relative bg-cleenzo-pale-bg py-14 md:py-20 border-b border-cleenzo-sky-light">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,61,145,0.04),transparent_55%)] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 md:px-8 space-y-6 md:space-y-8">
        {sections.map((section) => {
          if (section.items) return <WhyChooseGrid key={section.title} section={section} />;
          if (section.steps) return <ProcessSteps key={section.title} section={section} />;
          return <ContentBlock key={section.title} section={section} />;
        })}
      </div>
    </section>
  );
}

function ServiceAreas({ serviceType }) {
  return (
    <section className="bg-white py-14 md:py-16 border-b border-cleenzo-sky-light">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <SectionEyebrow>Service areas</SectionEyebrow>
        <h2 className="text-2xl md:text-3xl font-black text-cleenzo-deep mb-4">Areas we serve</h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
          Cleenzo provides {serviceType.toLowerCase()} with free pickup laundry &amp; delivery across
          Raj Nagar Extension, Ghaziabad and nearby localities.
        </p>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {SERVICE_AREAS.map((area) => (
            <li
              key={area}
              className="text-sm font-bold bg-gradient-to-br from-cleenzo-pale to-white border border-cleenzo-sky-light text-cleenzo-dark rounded-full px-5 py-2.5 shadow-sm"
            >
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServicePricingBand() {
  return (
    <section className="py-12 md:py-14 px-4 bg-cleenzo-pale-bg">
      <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-cleenzo to-cleenzo-light p-8 md:p-10 text-center text-white shadow-xl shadow-cleenzo/20">
        <h2 className="text-2xl md:text-3xl font-black mb-3">Transparent pricing</h2>
        <p className="text-white/85 mb-6 max-w-md mx-auto leading-relaxed">
          Clear per-piece and per-kg rates for Raj Nagar Extension &amp; Ghaziabad — no hidden charges.
        </p>
        <Link
          to="/#pricing"
          className="inline-flex bg-white text-cleenzo font-bold px-8 py-3.5 rounded-full hover:bg-cleenzo-pale transition shadow-md"
        >
          View full price list →
        </Link>
      </div>
    </section>
  );
}

function ServiceFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs?.length) return null;

  return (
    <section className="bg-white py-14 md:py-16 border-t border-cleenzo-sky-light">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="text-2xl md:text-3xl font-black text-cleenzo-deep">
            Frequently asked questions
          </h2>
        </div>
        <dl className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className={`service-faq-item ${isOpen ? "is-open" : ""}`}>
                <dt>
                  <button
                    type="button"
                    className="service-faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {faq.question}
                    <span className="service-faq-chevron" aria-hidden="true">
                      ▼
                    </span>
                  </button>
                </dt>
                {isOpen ? <dd className="service-faq-answer">{faq.answer}</dd> : null}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function ServiceRelated({ currentPath }) {
  const currentKey = normalizePathKey(currentPath);
  const others = RELATED_SERVICES.filter(
    (s) => normalizePathKey(s.path) !== currentKey,
  );

  return (
    <section className="bg-cleenzo-pale-bg py-12 md:py-14 border-t border-cleenzo-sky-light">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <SectionEyebrow>Explore more</SectionEyebrow>
          <h2 className="text-xl md:text-2xl font-black text-cleenzo-deep">More Cleenzo services</h2>
        </div>
        <nav className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {others.map((service) => (
            <Link
              key={service.path}
              to={canonicalPath(service.path)}
              className="group flex items-center gap-4 rounded-2xl border border-cleenzo-sky-light bg-white p-4 hover:border-cleenzo hover:shadow-md transition"
            >
              <span
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cleenzo to-cleenzo-light text-white flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition"
                aria-hidden="true"
              >
                {service.icon}
              </span>
              <div className="min-w-0 text-left">
                <p className="font-bold text-cleenzo-deep group-hover:text-cleenzo">{service.label}</p>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{service.desc}</p>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

function ServicePageLayout({ page }) {
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/\/$/, "") || "/";

  return (
    <>
      <ServiceHero page={page} />

      <div className="bg-cleenzo-pale-bg border-b border-cleenzo-sky-light py-4 px-4">
        <ServiceHubLinks currentPath={currentPath} />
      </div>

      <ServiceGallery
        images={page.galleryImages}
        title={page.galleryTitle ?? `Our ${page.serviceType.toLowerCase()} work`}
      />

      <ServiceContent sections={page.sections} />

      {page.showAreas ? <ServiceAreas serviceType={page.serviceType} /> : null}

      {page.showPricing ? <ServicePricingBand /> : null}

      <ServiceFAQ faqs={page.faqs} />

      <GoogleReviewsSection compact />

      <ServiceRelated currentPath={currentPath} />

      <div className="bg-white border-t border-cleenzo-sky-light py-6 px-4">
        <ServiceHubLinks currentPath={currentPath} />
      </div>

      <PlaceOrderCTA title={`Book ${page.serviceType.toLowerCase()} with Cleenzo`} variant="cream" />
    </>
  );
}

export default ServicePageLayout;
