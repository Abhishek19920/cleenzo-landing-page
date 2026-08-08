import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSchedulePickup } from "../context/SchedulePickupContext";
import { useAppDownload } from "../context/AppDownloadContext";
import {
  CAROUSEL_AUTOPLAY_MS,
  CAROUSEL_BANNERS,
  CAROUSEL_TRANSITION_MS,
} from "../constants";
import FreedomSaleCarouselBanner from "../components/carousel/FreedomSaleCarouselBanner";
import { getActivePromoCarouselSlides } from "../data/homePromoCarousel";
import { trackOfferEvent } from "../utils/offerAnalytics";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";
import { openWhatsAppBooking } from "../whatsapp";
import { useCarouselStrip } from "../context/CarouselStripContext";

const SWIPE_THRESHOLD = 40;

/** During Independence / Tiranga campaign, all carousel slides use Tiranga styling. */
function resolveSlideTheme(slide, homeTiranga) {
  if (!homeTiranga) return slide.theme;
  if (slide.theme === "express" || slide.theme === "brand" || slide.theme === "light") {
    return "tiranga";
  }
  return slide.theme;
}

const themes = {
  light: {
    section: "bg-gradient-to-br from-cleenzo-pale-bg via-white to-cleenzo-pale",
    badge: "bg-cleenzo-sky-light text-cleenzo-dark border-cleenzo-sky/40",
    title: "text-slate-900",
    accent: "text-cleenzo",
    subtitle: "text-slate-600",
    card: "bg-white border-slate-200 shadow-xl",
    cardText: "text-slate-900",
    cardMuted: "text-slate-500",
    dot: "bg-cleenzo",
    dotIdle: "bg-slate-300",
    arrow: "bg-white/90 text-cleenzo-dark border border-slate-200 shadow-md hover:bg-white",
    mobileArrow: "bg-white/95 text-cleenzo-dark border border-slate-200",
  },
  warm: {
    section: "bg-gradient-to-br from-cleenzo-pale via-cleenzo-sky-light/30 to-slate-50",
    badge: "bg-white/90 text-cleenzo-dark border-cleenzo-sky/40",
    title: "text-slate-900",
    accent: "text-cleenzo",
    subtitle: "text-slate-700",
    card: "bg-white border-cleenzo-sky-light shadow-xl",
    cardText: "text-slate-900",
    cardMuted: "text-slate-600",
    dot: "bg-cleenzo",
    dotIdle: "bg-cleenzo-sky/50",
    arrow: "bg-white/90 text-cleenzo-dark border border-cleenzo-sky-light shadow-md hover:bg-white",
    mobileArrow: "bg-white/95 text-cleenzo-dark border border-cleenzo-sky-light",
  },
  brand: {
    section: "bg-gradient-to-br from-cleenzo-deeper via-cleenzo-deep to-cleenzo",
    badge: "bg-white/15 text-cleenzo-sky border-white/20",
    title: "text-white",
    accent: "text-cleenzo-sky",
    subtitle: "text-slate-300",
    card: "bg-white/10 border-white/20 backdrop-blur-md shadow-2xl",
    cardText: "text-white",
    cardMuted: "text-slate-300",
    dot: "bg-cleenzo-sky",
    dotIdle: "bg-white/35",
    arrow: "bg-white/15 text-white border border-white/20 hover:bg-white/25",
    mobileArrow: "bg-white/15 text-white border border-white/25",
  },
  express: {
    section: "bg-gradient-to-br from-cleenzo-deeper via-cleenzo to-cleenzo-light",
    badge: "bg-white/20 text-white border-white/30",
    title: "text-white",
    accent: "text-cleenzo-sky",
    subtitle: "text-white/90",
    card: "bg-white/12 border-white/25 backdrop-blur-md shadow-2xl",
    cardText: "text-white",
    cardMuted: "text-white/80",
    dot: "bg-cleenzo-sky",
    dotIdle: "bg-white/40",
    arrow: "bg-white/20 text-white border border-white/30 hover:bg-white/30",
    mobileArrow: "bg-white/20 text-white border border-white/30",
  },
  tiranga: {
    section:
      "bg-gradient-to-br from-[#FFF4E8] via-white to-[#EEF8F0] relative overflow-hidden",
    badge: "bg-white text-cleenzo-deep border border-[#FF9933]/35 shadow-sm",
    title: "text-cleenzo-deep",
    accent: "text-[#138808]",
    subtitle: "text-slate-700",
    card: "bg-white border border-slate-200/90 shadow-xl",
    cardText: "text-cleenzo-deep",
    cardMuted: "text-slate-600",
    dot: "bg-[#FF9933]",
    dotIdle: "bg-[#138808]/25",
    arrow: "bg-white/95 text-cleenzo-deep border border-[#FF9933]/30 shadow-md hover:bg-white",
    mobileArrow: "bg-white/95 text-cleenzo-deep border border-[#138808]/25",
  },
};

function BannerCTA({ cta, theme, onSchedule, onWhatsApp, onApp, fullWidth = false }) {
  const widthClass = fullWidth ? "w-full" : "w-full sm:w-auto";

  if (cta.action === "schedule") {
    return (
      <button
        type="button"
        onClick={onSchedule}
        className={`inline-flex justify-center items-center text-white font-bold px-5 py-3 sm:py-3.5 rounded-full transition shadow-md text-sm sm:text-base ${widthClass} ${
          theme === "tiranga"
            ? "bg-[#138808] hover:bg-[#0f6b06]"
            : "bg-cleenzo hover:bg-cleenzo-dark"
        }`}
      >
        {cta.label}
      </button>
    );
  }

  if (cta.action === "whatsapp") {
    return (
      <button
        type="button"
        onClick={onWhatsApp}
        className={`inline-flex justify-center items-center bg-[#25D366] hover:bg-[#1fb855] text-white font-bold px-5 py-3 sm:py-3.5 rounded-full transition shadow-md text-sm sm:text-base ${widthClass}`}
      >
        {cta.label}
      </button>
    );
  }

  if (cta.action === "app") {
    return (
      <button
        type="button"
        onClick={onApp}
        className={`inline-flex justify-center items-center font-bold px-5 py-3 sm:py-3.5 rounded-full transition shadow-md text-sm sm:text-base ${widthClass} ${
          theme === "brand"
            ? "bg-white text-cleenzo hover:bg-cleenzo-pale"
            : theme === "tiranga"
              ? "bg-cleenzo text-white hover:bg-cleenzo-dark"
              : "bg-cleenzo text-white hover:bg-cleenzo-dark"
        }`}
      >
        {cta.label}
      </button>
    );
  }

  return (
    <a
      href={cta.href || "#"}
      className={`inline-flex justify-center items-center font-bold px-5 py-3 sm:py-3.5 rounded-full transition shadow-md text-sm sm:text-base ${widthClass} ${
        theme === "brand"
          ? "bg-white text-cleenzo hover:bg-cleenzo-pale"
          : theme === "tiranga"
            ? "border-2 border-cleenzo-deep text-cleenzo-deep bg-white hover:bg-cleenzo-pale"
            : "bg-cleenzo text-white hover:bg-cleenzo-dark"
      }`}
    >
      {cta.label}
    </a>
  );
}

function SlideVisual({ slide, theme, compact = false }) {
  const t = themes[theme];

  if (slide.id === "express") {
    const isTiranga = theme === "tiranga";
    if (isTiranga) {
      return (
        <div className={`rounded-2xl sm:rounded-3xl overflow-hidden ${t.card}`}>
          <div
            className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
            aria-hidden="true"
          />
          <div className="relative bg-gradient-to-br from-white to-[#F0FAF2] p-5 sm:p-6 md:p-7 border-t border-[#138808]/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative text-center mb-4 sm:mb-5">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FFF4E8] border border-[#FF9933]/30 text-4xl sm:text-5xl mb-3 shadow-md">
                ⚡
              </div>
              <p className="font-black text-xl sm:text-2xl text-cleenzo-deep">Express Delivery</p>
              <p className="text-xs sm:text-sm mt-1 text-slate-600">Pickup → Clean → Delivered</p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
              {slide.expressFeatures.map((item) => (
                <div
                  key={item.label}
                  className="bg-white border border-[#138808]/15 rounded-xl p-2.5 sm:p-3 text-center shadow-sm"
                >
                  <span className="text-xl sm:text-2xl block mb-1" aria-hidden="true">
                    {item.icon}
                  </span>
                  <p className="text-[10px] sm:text-xs font-bold text-cleenzo-deep leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-1 bg-white rounded-xl px-3 py-3 border border-[#FF9933]/20 shadow-sm">
              {slide.expressSteps.map((step, i) => (
                <div key={step} className="flex items-center flex-1 min-w-0">
                  <div className="text-center flex-1 min-w-0">
                    <span className="inline-flex w-6 h-6 sm:w-7 sm:h-7 items-center justify-center rounded-full bg-[#138808] text-white text-[10px] sm:text-xs font-black mb-1">
                      {i + 1}
                    </span>
                    <p className="text-[9px] sm:text-[10px] font-bold text-cleenzo-deep leading-tight truncate px-0.5">
                      {step}
                    </p>
                  </div>
                  {i < slide.expressSteps.length - 1 && (
                    <span className="text-[#FF9933] text-xs shrink-0 px-0.5" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#138808] mt-4">
              No extra charge for express
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={`rounded-2xl sm:rounded-3xl overflow-hidden ${compact ? "p-0" : "p-0"} ${t.card}`}>
        <div className="relative bg-gradient-to-br from-cleenzo-deep/80 to-cleenzo/90 p-5 sm:p-6 md:p-7">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cleenzo-sky/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative text-center mb-4 sm:mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 border border-white/25 text-4xl sm:text-5xl mb-3 shadow-lg">
              ⚡
            </div>
            <p className={`font-black text-xl sm:text-2xl ${t.cardText}`}>Express Delivery</p>
            <p className={`text-xs sm:text-sm mt-1 ${t.cardMuted}`}>Pickup → Clean → Delivered</p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
            {slide.expressFeatures.map((item) => (
              <div
                key={item.label}
                className="bg-white/10 border border-white/20 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-sm"
              >
                <span className="text-xl sm:text-2xl block mb-1" aria-hidden="true">
                  {item.icon}
                </span>
                <p className="text-[10px] sm:text-xs font-bold text-white leading-tight">{item.label}</p>
                <p className="text-[9px] sm:text-[10px] text-white/70 mt-0.5 hidden sm:block">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-1 bg-white/10 rounded-xl px-3 py-3 border border-white/15">
            {slide.expressSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1 min-w-0">
                <div className="text-center flex-1 min-w-0">
                  <span className="inline-flex w-6 h-6 sm:w-7 sm:h-7 items-center justify-center rounded-full bg-cleenzo-sky text-cleenzo-deep text-[10px] sm:text-xs font-black mb-1">
                    {i + 1}
                  </span>
                  <p className="text-[9px] sm:text-[10px] font-bold text-white leading-tight truncate px-0.5">
                    {step}
                  </p>
                </div>
                {i < slide.expressSteps.length - 1 && (
                  <span className="text-cleenzo-sky text-xs shrink-0 px-0.5" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cleenzo-sky mt-4">
            No extra charge for express
          </p>
        </div>
      </div>
    );
  }

  if (slide.id === "offers") {
    const isTiranga = theme === "tiranga";
    return (
      <div
        className={`rounded-2xl sm:rounded-3xl overflow-hidden ${compact ? "p-0" : "p-0"} ${t.card}`}
      >
        {isTiranga ? (
          <div
            className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
            aria-hidden="true"
          />
        ) : null}
        <div className={compact ? "p-4" : "p-5 sm:p-6 md:p-8"}>
          <div
            className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center mb-3 sm:mb-4 shadow-lg ${
              isTiranga
                ? "bg-cleenzo-deep text-white border border-[#FF9933]/20"
                : "bg-black text-white"
            }`}
          >
            <p className="text-3xl sm:text-4xl mb-1 sm:mb-2">{slide.highlightOffer.icon}</p>
            <p className="font-black text-lg sm:text-xl md:text-2xl">{slide.highlightOffer.title}</p>
            <p
              className={`font-black text-2xl sm:text-3xl md:text-4xl mt-1 ${
                isTiranga ? "text-[#FF9933]" : "text-cleenzo-sky"
              }`}
            >
              {slide.highlightOffer.price}
            </p>
            {slide.highlightOffer.subline ? (
              <p
                className={`font-bold text-sm sm:text-base mt-2 ${
                  isTiranga ? "text-[#8FD99A]" : "text-white/90"
                }`}
              >
                {slide.highlightOffer.subline}
              </p>
            ) : null}
          </div>
          <div className="space-y-2 sm:space-y-3">
            {slide.miniOffers.map((item) => (
              <div
                key={item.text}
                className={`flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 ${
                  isTiranga
                    ? "bg-white border border-[#138808]/15"
                    : "bg-cleenzo-pale border border-cleenzo-sky-light"
                }`}
              >
                <span className="text-xl sm:text-2xl shrink-0">{item.icon}</span>
                <p className="font-semibold text-slate-800 text-xs sm:text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slide.serviceTags) {
    return (
      <div className={`rounded-2xl sm:rounded-3xl ${compact ? "p-4" : "p-5 sm:p-6 md:p-8"} ${t.card}`}>
        <div className="text-center mb-4 sm:mb-6">
          <p className={`${compact ? "text-4xl" : "text-5xl sm:text-6xl"} mb-2 sm:mb-3`}>
            {slide.visual.emoji}
          </p>
          <p className={`font-black text-xl sm:text-2xl ${t.cardText}`}>{slide.visual.title}</p>
          <p className={`text-xs sm:text-sm mt-1 ${t.cardMuted}`}>{slide.visual.tagline}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {slide.serviceTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cleenzo-sky/20 border border-cleenzo-sky/30 text-cleenzo-sky text-[10px] sm:text-xs font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl sm:rounded-3xl ${compact ? "p-5" : "p-6 sm:p-8"} ${t.card} text-center`}>
      <p className={`${compact ? "text-5xl" : "text-6xl sm:text-7xl"} mb-3 sm:mb-4`}>
        {slide.visual.emoji}
      </p>
      <p className={`font-black text-2xl sm:text-3xl ${t.cardText}`}>{slide.visual.title}</p>
      <p className={`mt-1 sm:mt-2 text-xs sm:text-sm ${t.cardMuted}`}>{slide.visual.tagline}</p>
      <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-slate-600">
        <div className="bg-cleenzo-pale rounded-lg sm:rounded-xl py-2 sm:py-3">📅 Pickup</div>
        <div className="bg-cleenzo-sky-light/50 rounded-lg sm:rounded-xl py-2 sm:py-3">📍 Track</div>
        <div className="bg-cleenzo-sky-light rounded-lg sm:rounded-xl py-2 sm:py-3">🚚 Deliver</div>
      </div>
    </div>
  );
}

function FreedomBannerSlidePanel({ slide, onSchedule, onWhatsApp }) {
  const theme = slide.theme || "light";
  const t = themes[theme];
  const blendPage = isHomeTirangaThemeActive();

  const handleBannerClick = () => {
    trackOfferEvent("offer_banner_click", { offer_id: slide.offerId || slide.id });
    if (slide.clickAction === "whatsapp") {
      onWhatsApp();
      return;
    }
    onSchedule();
  };

  return (
    <div
      className={`carousel-slide-panel w-full min-w-full flex-shrink-0 ${
        blendPage ? "bg-transparent" : t.section
      } relative overflow-hidden`}
      aria-hidden="false"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8">
        <FreedomSaleCarouselBanner
          onClick={handleBannerClick}
          ariaLabel={slide.ariaLabel || slide.imageAlt}
        />
      </div>
    </div>
  );
}

function ImageSlidePanel({ slide, onSchedule, onWhatsApp }) {
  const theme = slide.theme || "light";
  const t = themes[theme];
  const blendPage = isHomeTirangaThemeActive();

  const handleBannerClick = () => {
    trackOfferEvent("offer_banner_click", { offer_id: slide.offerId || slide.id });
    if (slide.clickAction === "whatsapp") {
      onWhatsApp();
      return;
    }
    onSchedule();
  };

  return (
    <div
      className={`carousel-slide-panel w-full min-w-full flex-shrink-0 ${
        blendPage ? "bg-transparent" : t.section
      } relative overflow-hidden`}
      aria-hidden="false"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8">
        <button
          type="button"
          onClick={handleBannerClick}
          className="group w-full block rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cleenzo focus-visible:ring-offset-2"
          aria-label={slide.imageAlt || "View offer and book"}
        >
          <span className="block w-full aspect-[7/3] max-h-[min(42vw,300px)] sm:max-h-[min(36vw,320px)] md:max-h-none bg-cleenzo-pale/30">
            <img
              src={slide.imageSrc}
              alt={slide.imageAlt || ""}
              width={1400}
              height={600}
              className="w-full h-full object-contain object-center md:object-cover md:object-center transition group-hover:opacity-[0.98]"
              decoding="async"
              fetchPriority={slide.id === "freedom-rakhi-sale-2026" ? "high" : "auto"}
            />
          </span>
        </button>
      </div>
    </div>
  );
}

function SlidePanel({ slide, onSchedule, onWhatsApp, onApp }) {
  const homeTiranga = isHomeTirangaThemeActive();
  const theme = resolveSlideTheme(slide, homeTiranga);
  const t = themes[theme] ?? themes.tiranga;
  const sectionClass = homeTiranga ? "bg-transparent" : t.section;

  return (
    <div
      className={`carousel-slide-panel w-full min-w-full flex-shrink-0 ${sectionClass} relative overflow-hidden`}
      aria-hidden="false"
    >
      {theme === "tiranga" ? (
        <div
          className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-90 pointer-events-none"
          aria-hidden="true"
        />
      ) : null}
      {theme === "tiranga" ? (
        <>
          <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#FF9933]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-[#138808]/10 rounded-full blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-cleenzo-sky/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-cleenzo/10 rounded-full blur-3xl pointer-events-none" />
          {slide.theme === "express" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          )}
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-20 sm:pt-10 sm:pb-22 md:py-14 lg:py-16">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-14 md:items-center">
          {/* Text — always first on mobile */}
          <div className="text-left order-1">
            <p
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold border mb-3 sm:mb-5 ${t.badge}`}
            >
              {slide.badge}
            </p>

            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.15] ${t.title}`}
            >
              {slide.title}
              {slide.titleAccent && (
                <>
                  <span className="hidden sm:inline"> </span>
                  <span className={`block sm:inline ${t.accent}`}>{slide.titleAccent}</span>
                </>
              )}
            </h2>

            <p
              className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed ${t.subtitle}`}
            >
              {slide.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-5 sm:mt-8">
              <BannerCTA
                cta={slide.primaryCta}
                theme={theme}
                onSchedule={onSchedule}
                onWhatsApp={onWhatsApp}
                onApp={onApp}
                fullWidth
              />
              <BannerCTA
                cta={slide.secondaryCta}
                theme={theme}
                onSchedule={onSchedule}
                onWhatsApp={onWhatsApp}
                onApp={onApp}
                fullWidth
              />
            </div>
          </div>

          {/* Visual — compact on mobile, full on md+ */}
          <div className="order-2 max-w-sm mx-auto w-full md:max-w-none">
            <SlideVisual slide={slide} theme={theme} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderCarousel() {
  const promoSlides = useMemo(() => getActivePromoCarouselSlides(), []);
  const slides = useMemo(() => {
    const otherBanners = CAROUSEL_BANNERS.filter((s) => s.id !== "offers");
    const offersSlide = CAROUSEL_BANNERS.find((s) => s.id === "offers");
    if (promoSlides.length > 0) {
      // Production: Freedom promo image first when sale is live (9–30 Aug IST).
      return [...promoSlides, ...otherBanners];
    }
    // Before promo starts: first slide is the in-carousel Freedom / Rakhi offer panel (same as prod).
    return [...(offersSlide ? [offersSlide] : []), ...otherBanners];
  }, [promoSlides]);
  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const { openSchedulePickup } = useSchedulePickup();
  const { openAppDownload } = useAppDownload();
  const { setCarouselTheme } = useCarouselStrip();
  const isPaused = hoverPaused || touchPaused;

  useEffect(() => {
    if (!slides.length) return;
    const slide = slides[active];
    const homeTiranga = isHomeTirangaThemeActive();
    setCarouselTheme(resolveSlideTheme(slide, homeTiranga) || "light");
  }, [active, slides, setCarouselTheme]);

  useEffect(() => {
    if (active >= slides.length && slides.length > 0) {
      setActive(0);
    }
  }, [active, slides.length]);

  const goTo = useCallback(
    (index) => {
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const handleWhatsApp = useCallback(() => {
    openWhatsAppBooking();
  }, []);

  useEffect(() => {
    if (isPaused || slides.length < 2) return undefined;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, CAROUSEL_AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleTouchStart = (e) => {
    setTouchPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    if (startX != null && startY != null) {
      const diffX = startX - e.changedTouches[0].clientX;
      const diffY = startY - e.changedTouches[0].clientY;

      // Only swipe horizontally if horizontal movement dominates
      if (Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(diffX) > Math.abs(diffY)) {
        setActive((prev) =>
          diffX > 0
            ? (prev + 1) % slides.length
            : (prev - 1 + slides.length) % slides.length,
        );
      }
    }
    setTimeout(() => setTouchPaused(false), 400);
  };

  if (!slides.length) return null;

  const homeTirangaActive = isHomeTirangaThemeActive();
  const theme =
    themes[resolveSlideTheme(slides[active] ?? { theme: "light" }, homeTirangaActive)] ??
    themes.tiranga;

  return (
    <section
      id="carousel"
      className="relative w-full overflow-hidden border-b border-cleenzo/10 select-none touch-pan-y"
      aria-label="Promotions carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null;
        touchStartY.current = null;
        setTouchPaused(false);
      }}
    >
      <div
        className="flex w-full"
        style={{
          transform: `translateX(-${active * 100}%)`,
          transition: `transform ${CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {slides.map((slide) =>
          slide.type === "freedom-banner" ? (
            <FreedomBannerSlidePanel
              key={slide.id}
              slide={slide}
              onSchedule={openSchedulePickup}
              onWhatsApp={handleWhatsApp}
            />
          ) : slide.type === "image" ? (
            <ImageSlidePanel
              key={slide.id}
              slide={slide}
              onSchedule={openSchedulePickup}
              onWhatsApp={handleWhatsApp}
            />
          ) : (
            <SlidePanel
              key={slide.id}
              slide={slide}
              onSchedule={openSchedulePickup}
              onWhatsApp={handleWhatsApp}
              onApp={openAppDownload}
            />
          ),
        )}
      </div>

      {/* Desktop arrows */}
      <button
        type="button"
        onClick={prev}
        className={`hidden md:flex absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 items-center justify-center rounded-full text-2xl transition ${theme.arrow}`}
        aria-label="Previous banner"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        className={`hidden md:flex absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 items-center justify-center rounded-full text-2xl transition ${theme.arrow}`}
        aria-label="Next banner"
      >
        ›
      </button>

      {/* Mobile arrows + dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            className={`md:hidden flex-shrink-0 w-9 h-9 items-center justify-center rounded-full text-xl transition ${theme.mobileArrow} flex`}
            aria-label="Previous banner"
          >
            ‹
          </button>

          <div className="flex justify-center gap-1.5 sm:gap-2 flex-1">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? `w-8 sm:w-10 ${theme.dot}` : `w-2 sm:w-2.5 ${theme.dotIdle}`
                }`}
                aria-label={`Banner ${i + 1} of ${slides.length}`}
                aria-current={i === active ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className={`md:hidden flex-shrink-0 w-9 h-9 items-center justify-center rounded-full text-xl transition ${theme.mobileArrow} flex`}
            aria-label="Next banner"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeaderCarousel;
