import { trackOfferEvent } from "../../utils/offerAnalytics";

const variantStyles = {
  freedom: {
    card: "border border-slate-200/80 bg-white shadow-md ring-1 ring-slate-100",
    accentBar: "bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-1",
    badge: "bg-cleenzo-deep text-white",
    discount: "text-cleenzo-deep",
    secondary: "text-[#138808] font-black",
    cta: "bg-cleenzo hover:bg-cleenzo-dark text-white",
  },
  heroes: {
    card: "border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-sm",
    accentBar: "bg-cleenzo h-1",
    badge: "bg-cleenzo/10 text-cleenzo-deep border border-cleenzo/15",
    discount: "text-cleenzo-deep",
    secondary: "text-cleenzo",
    cta: "bg-cleenzo hover:bg-cleenzo-dark text-white",
  },
  independence: {
    card: "border border-slate-200 bg-white shadow-sm",
    accentBar: "bg-gradient-to-r from-[#FF9933] to-[#138808] h-1",
    badge: "bg-cleenzo-pale text-cleenzo-deep border border-cleenzo/10",
    discount: "text-cleenzo-deep",
    secondary: "text-cleenzo",
    cta: "bg-cleenzo hover:bg-cleenzo-dark text-white",
  },
  benefit: {
    card: "border border-slate-200 bg-white shadow-sm",
    accentBar: "bg-cleenzo-sky/40 h-0.5",
    badge: "bg-cleenzo-pale text-cleenzo-dark",
    discount: "text-cleenzo-deep",
    secondary: "text-cleenzo",
    cta: "bg-white border-2 border-cleenzo text-cleenzo hover:bg-cleenzo-pale",
  },
};

function OfferCard({
  offer,
  featured = false,
  redeemable = true,
  onCtaClick,
  onTermsClick,
}) {
  const styles = variantStyles[offer.variant] || variantStyles.benefit;

  const handleCta = () => {
    if (!redeemable) return;
    trackOfferEvent("offer_book_now_click", { offer_id: offer.id });
    onCtaClick(offer);
  };

  const handleTerms = (e) => {
    e.stopPropagation();
    trackOfferEvent("offer_terms_view", { offer_id: offer.id });
    onTermsClick(offer);
  };

  return (
    <article
      className={`relative flex flex-col rounded-2xl overflow-hidden h-full ${styles.card} ${
        featured ? "lg:scale-[1.02] lg:shadow-lg" : ""
      }`}
    >
      <div className={styles.accentBar} aria-hidden="true" />

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {offer.badge ? (
          <p
            className={`inline-flex self-start text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 ${styles.badge}`}
          >
            {offer.badge}
          </p>
        ) : null}

        {offer.discount ? (
          <p className={`text-2xl sm:text-3xl font-black leading-none ${styles.discount}`}>
            {offer.discount}
          </p>
        ) : null}

        {offer.secondaryBenefit ? (
          <p className={`text-lg sm:text-xl font-black mt-1 ${styles.secondary}`}>
            {offer.secondaryBenefit}
          </p>
        ) : null}

        {offer.title ? (
          <h3 className="text-lg sm:text-xl font-black text-cleenzo-deep mt-2">{offer.title}</h3>
        ) : null}

        {offer.subtitle ? (
          <p
            className={`text-sm font-medium mt-0.5 ${
              offer.variant === "heroes" ? "text-cleenzo-deep italic" : "text-slate-500"
            }`}
          >
            {offer.subtitle}
          </p>
        ) : null}

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3 flex-1">
          {offer.description}
        </p>

        {offer.audience ? (
          <p className="text-xs font-semibold text-slate-500 mt-3">{offer.audience}</p>
        ) : null}

        <p className="text-xs font-bold text-cleenzo mt-2 uppercase tracking-wide">
          {offer.validityLabel}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="button"
            onClick={handleCta}
            disabled={!redeemable}
            aria-disabled={!redeemable}
            className={`w-full sm:w-auto inline-flex justify-center items-center font-bold text-sm px-6 py-3.5 rounded-full transition shadow-sm min-h-[44px] ${styles.cta} ${
              !redeemable ? "opacity-60 cursor-not-allowed hover:bg-inherit" : ""
            }`}
          >
            {redeemable ? offer.cta.label : `Starts ${offer.validityLabel.split("–")[0].trim()}`}
          </button>
          <button
            type="button"
            onClick={handleTerms}
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-cleenzo underline-offset-2 hover:underline min-h-[44px] sm:min-h-0"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default OfferCard;
