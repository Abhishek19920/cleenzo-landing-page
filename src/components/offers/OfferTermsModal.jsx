import { useEffect } from "react";
import { Link } from "react-router-dom";

function OfferTermsModal({ offer, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!offer) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        aria-label="Close terms"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-terms-title"
        className="relative w-full sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-hidden bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col"
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-slate-100">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cleenzo mb-1">
              Terms &amp; conditions
            </p>
            <h2 id="offer-terms-title" className="text-lg font-black text-slate-900 pr-2">
              {offer.badge || offer.title || offer.discount}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {offer.termsSections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-bold text-cleenzo-deep">{section.heading}</h3>
              {section.body ? (
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{section.body}</p>
              ) : (
                <p className="text-sm text-slate-400 mt-1 italic">
                  {/* TODO: business rule pending from Cleenzo team */}
                  Details to be confirmed — contact Cleenzo on WhatsApp for this rule.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <Link
            to="/offers-terms"
            className="block text-center text-xs font-semibold text-cleenzo hover:text-cleenzo-dark underline-offset-2 hover:underline"
          >
            View all offer terms &amp; conditions
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-cleenzo hover:bg-cleenzo-dark text-white font-bold py-3 rounded-full text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferTermsModal;
