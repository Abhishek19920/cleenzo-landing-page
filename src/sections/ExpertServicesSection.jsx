import { Link } from "react-router-dom";
import { EXPERT_SERVICES } from "../data/expertServices";

function ServiceIcon({ type }) {
  const className = "w-5 h-5 text-white";

  switch (type) {
    case "laundry":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 3h12l-1 3H7L6 3z" />
          <path d="M4 8h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l1.2 4.2L17.5 7.5 13.2 8.7 12 13l-1.2-4.3L6.5 7.5l4.3-1.3L12 2zm7 7l.8 2.8L22.5 13l-2.7.8L19 17l-.8-2.8L15.5 13l2.7-.8L19 9zm-14 0l.8 2.8L8.5 13l-2.7.8L5 17l-.8-2.8L1.5 13l2.7-.8L5 9z" />
        </svg>
      );
    case "shoe":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M3 14c2-1 4-1 6 0s4 1 6 0 4-1 6 0v3H3v-3z" />
          <path d="M5 11c1.5-2 3.5-3 7-3s5.5 1 7 3" />
        </svg>
      );
    case "sofa":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
          <path d="M3 12v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
          <path d="M5 16v2M19 16v2" />
        </svg>
      );
    case "carpet":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 8h16v8H4z" />
          <path d="M4 10H2M22 10h-2M4 14H2M22 14h-2" />
        </svg>
      );
    case "curtain":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 4h16v16H4z" />
          <path d="M8 4v16M12 4v16M16 4v16" />
        </svg>
      );
    case "commercial":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    default:
      return null;
  }
}

function ExpertServicesSection() {
  return (
    <section id="expert-services" className="bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-cleenzo uppercase tracking-[0.2em] font-bold text-xs mb-3">
            Our expert services
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            One-stop shop for all your cleaning needs
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Professional laundry, dry cleaning &amp; home textile care with free pickup across
            Ghaziabad.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {EXPERT_SERVICES.map((service) => (
            <li key={service.href}>
              <Link
                to={service.href}
                className="group flex flex-col h-full rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-cleenzo/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cleenzo/40"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-sm`}
                  aria-hidden
                >
                  <ServiceIcon type={service.icon} />
                </span>
                <h3 className="mt-4 font-bold text-slate-900 text-base group-hover:text-cleenzo transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cleenzo">
                  Know More
                  <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">
                    ›
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ExpertServicesSection;
