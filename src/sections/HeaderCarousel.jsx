import { useCallback, useEffect, useRef, useState } from "react";
import { useSchedulePickup } from "../context/SchedulePickupContext";
import {
  CAROUSEL_AUTOPLAY_MS,
  CAROUSEL_BANNERS,
  CAROUSEL_TRANSITION_MS,
} from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

const SWIPE_THRESHOLD = 50;

const themes = {
  light: {
    section: "bg-gradient-to-br from-white via-orange-50/80 to-cyan-50/60",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
    title: "text-slate-900",
    accent: "text-orange-600",
    subtitle: "text-slate-600",
    card: "bg-white border-slate-200 shadow-xl",
    cardText: "text-slate-900",
    cardMuted: "text-slate-500",
    dot: "bg-orange-400",
    dotIdle: "bg-slate-300",
    arrow: "bg-white/90 text-slate-800 border border-slate-200 shadow-md hover:bg-white",
  },
  warm: {
    section: "bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100",
    badge: "bg-white/80 text-orange-800 border-orange-200",
    title: "text-slate-900",
    accent: "text-orange-700",
    subtitle: "text-slate-700",
    card: "bg-white border-orange-200 shadow-xl",
    cardText: "text-slate-900",
    cardMuted: "text-slate-600",
    dot: "bg-orange-600",
    dotIdle: "bg-orange-300",
    arrow: "bg-white/90 text-orange-900 border border-orange-200 shadow-md hover:bg-white",
  },
  brand: {
    section: "bg-gradient-to-br from-teal-800 via-cyan-900 to-slate-900",
    badge: "bg-white/15 text-cyan-100 border-white/20",
    title: "text-white",
    accent: "text-cyan-300",
    subtitle: "text-slate-300",
    card: "bg-white/10 border-white/20 backdrop-blur-md shadow-2xl",
    cardText: "text-white",
    cardMuted: "text-slate-300",
    dot: "bg-cyan-400",
    dotIdle: "bg-white/35",
    arrow: "bg-white/15 text-white border border-white/20 hover:bg-white/25",
  },
};

function BannerCTA({ cta, theme, onSchedule, onWhatsApp }) {
  if (cta.action === "schedule") {
    return (
      <button
        type="button"
        onClick={onSchedule}
        className="inline-flex justify-center items-center bg-lime-500 hover:bg-lime-600 text-white font-bold px-6 py-3.5 rounded-full transition shadow-md text-sm md:text-base"
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
        className="inline-flex justify-center items-center bg-[#25D366] hover:bg-[#1fb855] text-white font-bold px-6 py-3.5 rounded-full transition shadow-md text-sm md:text-base"
      >
        {cta.label}
      </button>
    );
  }

  return (
    <a
      href={cta.href || "#"}
      className={`inline-flex justify-center items-center font-bold px-6 py-3.5 rounded-full transition shadow-md text-sm md:text-base ${
        theme === "brand"
          ? "bg-cyan-400 text-black hover:bg-cyan-300"
          : "bg-teal-600 text-white hover:bg-teal-700"
      }`}
    >
      {cta.label}
    </a>
  );
}

function SlideVisual({ slide, theme }) {
  const t = themes[theme];

  if (slide.id === "offers") {
    return (
      <div className={`rounded-3xl p-6 md:p-8 ${t.card}`}>
        <div className="bg-black text-white rounded-2xl p-6 text-center mb-4 shadow-lg">
          <p className="text-4xl mb-2">{slide.highlightOffer.icon}</p>
          <p className="font-black text-xl md:text-2xl">{slide.highlightOffer.title}</p>
          <p className="text-cyan-400 font-black text-3xl md:text-4xl mt-1">
            {slide.highlightOffer.price}
          </p>
        </div>
        <div className="space-y-3">
          {slide.miniOffers.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="font-semibold text-slate-800 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.serviceTags) {
    return (
      <div className={`rounded-3xl p-6 md:p-8 ${t.card}`}>
        <div className="text-center mb-6">
          <p className="text-6xl mb-3">{slide.visual.emoji}</p>
          <p className={`font-black text-2xl ${t.cardText}`}>{slide.visual.title}</p>
          <p className={`text-sm mt-1 ${t.cardMuted}`}>{slide.visual.tagline}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {slide.serviceTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-100 text-xs font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-8 ${t.card} text-center`}>
      <p className="text-7xl mb-4">{slide.visual.emoji}</p>
      <p className={`font-black text-3xl ${t.cardText}`}>{slide.visual.title}</p>
      <p className={`mt-2 text-sm ${t.cardMuted}`}>{slide.visual.tagline}</p>
      <div className="mt-6 grid grid-cols-3 gap-2 text-xs font-bold text-slate-600">
        <div className="bg-orange-50 rounded-xl py-3">📅 Pickup</div>
        <div className="bg-cyan-50 rounded-xl py-3">📍 Track</div>
        <div className="bg-lime-50 rounded-xl py-3">🚚 Deliver</div>
      </div>
    </div>
  );
}

function SlidePanel({ slide, onSchedule, onWhatsApp }) {
  const theme = slide.theme;
  const t = themes[theme];

  return (
    <div
      className={`w-full flex-shrink-0 min-h-[440px] md:min-h-[500px] ${t.section} relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 h-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-left order-2 lg:order-1">
            <p
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold border mb-5 ${t.badge}`}
            >
              {slide.badge}
            </p>

            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight ${t.title}`}>
              {slide.title}
              {slide.titleAccent && (
                <>
                  <br />
                  <span className={t.accent}>{slide.titleAccent}</span>
                </>
              )}
            </h2>

            <p className={`mt-4 text-base md:text-lg max-w-lg leading-relaxed ${t.subtitle}`}>
              {slide.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <BannerCTA
                cta={slide.primaryCta}
                theme={theme}
                onSchedule={onSchedule}
                onWhatsApp={onWhatsApp}
              />
              <BannerCTA
                cta={slide.secondaryCta}
                theme={theme}
                onSchedule={onSchedule}
                onWhatsApp={onWhatsApp}
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SlideVisual slide={slide} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderCarousel() {
  const slides = CAROUSEL_BANNERS;
  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const touchStartX = useRef(null);
  const { openSchedulePickup } = useSchedulePickup();
  const isPaused = hoverPaused || touchPaused;
  const theme = themes[slides[active].theme];

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
    if (isPaused) return undefined;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, CAROUSEL_AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleTouchStart = (e) => {
    setTouchPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX != null) {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        setActive((prev) =>
          diff > 0
            ? (prev + 1) % slides.length
            : (prev - 1 + slides.length) % slides.length,
        );
      }
    }
    setTimeout(() => setTouchPaused(false), 400);
  };

  return (
    <section
      className="relative w-full overflow-hidden border-b border-orange-100 select-none"
      aria-label="Promotions carousel"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null;
        setTouchPaused(false);
      }}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${active * 100}%)`,
          transition: `transform ${CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {slides.map((slide) => (
          <SlidePanel
            key={slide.id}
            slide={slide}
            onSchedule={openSchedulePickup}
            onWhatsApp={handleWhatsApp}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full text-2xl transition ${theme.arrow}`}
        aria-label="Previous banner"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        className={`hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full text-2xl transition ${theme.arrow}`}
        aria-label="Next banner"
      >
        ›
      </button>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active ? `w-10 ${theme.dot}` : `w-2.5 ${theme.dotIdle}`
            }`}
            aria-label={`Banner ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default HeaderCarousel;
