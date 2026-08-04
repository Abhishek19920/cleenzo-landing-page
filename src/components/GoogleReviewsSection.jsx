import { useCallback, useEffect, useRef, useState } from "react";
import {
  GOOGLE_BUSINESS_NAME,
  GOOGLE_RATING,
  GOOGLE_REVIEWS_SHARE_URL,
  GOOGLE_REVIEWS_URL,
  getReviewSliderItems,
} from "../data/googleReviews";

const AUTOPLAY_MS = 5500;
const SWIPE_THRESHOLD = 48;

function StarRow({ rating = 5, size = "md" }) {
  const starClass = size === "lg" ? "text-xl" : "text-base";
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`${starClass} ${i < rating ? "text-amber-300" : "text-white/25"}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewSlide({ review }) {
  return (
    <article className="h-full flex flex-col justify-between rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_60px_rgba(10,61,145,0.18)]">
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <StarRow rating={review.rating} size="lg" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-white/90">
            <GoogleGlyph />
            Google
          </span>
        </div>
        <blockquote className="text-white text-lg md:text-xl leading-relaxed font-medium">
          “{review.text}”
        </blockquote>
      </div>
      <footer className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3 text-sm">
        <div>
          <p className="font-bold text-white">{review.author}</p>
          <p className="text-white/60 mt-0.5">{GOOGLE_BUSINESS_NAME}</p>
        </div>
        {review.datePublished ? (
          <time className="text-white/50 shrink-0" dateTime={review.datePublished}>
            {new Date(review.datePublished).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            })}
          </time>
        ) : null}
      </footer>
    </article>
  );
}

function GoogleReviewsSection({ compact = false }) {
  const slides = getReviewSliderItems();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (index) => {
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX == null) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    if (diff > 0) next();
    else prev();
  };

  return (
    <section
      id="reviews"
      className={`relative overflow-hidden border-t border-cleenzo-sky-light ${
        compact ? "py-12 md:py-14" : "py-16 md:py-24"
      }`}
      aria-labelledby="google-reviews-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-cleenzo-deeper via-cleenzo to-cleenzo-light"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(126,200,227,0.18),transparent_30%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="text-cleenzo-sky font-bold text-xs uppercase tracking-[0.24em] mb-3">
            Google reviews
          </p>
          <h2
            id="google-reviews-heading"
            className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight"
          >
            Trusted by customers in Raj Nagar Extension
          </h2>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-5 py-2.5 text-white/90">
            <StarRow rating={5} size="lg" />
            <span className="font-bold text-white">{GOOGLE_RATING.label}</span>
            <span className="text-sm text-white/70">· 5 customer reviews on Google</span>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Google customer reviews"
        >
          <div className="overflow-hidden rounded-[1.75rem]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {slides.map((review) => (
                <div key={review.id} className="w-full shrink-0 px-1 md:px-2">
                  <ReviewSlide review={review} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
            aria-label="Previous review"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
            aria-label="Next review"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Review slides">
            {slides.map((review, index) => (
              <button
                key={review.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Show review ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  active === index ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-cleenzo font-bold px-6 py-3.5 rounded-full hover:bg-cleenzo-pale transition shadow-lg"
          >
            <GoogleGlyph />
            Read on Google Maps
          </a>
          <a
            href={GOOGLE_REVIEWS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/25 bg-white/10 backdrop-blur-md text-white font-bold px-6 py-3.5 rounded-full hover:bg-white/15 transition"
          >
            Leave a Google review
          </a>
        </div>
      </div>
    </section>
  );
}

export default GoogleReviewsSection;
