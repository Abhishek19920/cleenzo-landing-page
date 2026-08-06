import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSchedulePickup } from "../context/SchedulePickupContext";
import { openWhatsAppBooking } from "../whatsapp";
import OfferCard from "../components/offers/OfferCard";
import OfferTermsModal from "../components/offers/OfferTermsModal";
import { getVisibleHomepageOffers, isOfferRedeemable } from "../data/offers";
import { trackOfferEvent } from "../utils/offerAnalytics";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";

function OffersSection() {
  const offers = useMemo(() => getVisibleHomepageOffers(), []);
  const { openSchedulePickup } = useSchedulePickup();
  const [termsOffer, setTermsOffer] = useState(null);
  const sectionRef = useRef(null);
  const viewedRef = useRef(new Set());

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !offers.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          offers.forEach((offer) => {
            if (viewedRef.current.has(offer.id)) return;
            viewedRef.current.add(offer.id);
            trackOfferEvent("offer_card_view", { offer_id: offer.id });
          });
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [offers]);

  const handleCta = useCallback(
    (offer) => {
      if (offer.cta.action === "whatsapp") {
        openWhatsAppBooking();
        return;
      }
      openSchedulePickup();
    },
    [openSchedulePickup],
  );

  if (!offers.length) return null;

  const featuredId = offers.find((o) => o.featured)?.id;
  const tirangaPage = isHomeTirangaThemeActive();

  return (
    <section
      ref={sectionRef}
      id="offers"
      className={`border-y text-slate-900 overflow-hidden ${
        tirangaPage
          ? "home-tiranga-offers border-[#138808]/10 bg-transparent"
          : "bg-cleenzo-pale-bg border-cleenzo-sky-light/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-cleenzo-deep tracking-tight">
            Offers Made For You
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2 font-medium">
            Save more on laundry &amp; dry cleaning
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:snap-none md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`min-w-[min(100%,340px)] sm:min-w-[300px] md:min-w-0 snap-center flex ${
                offer.id === featuredId ? "lg:row-span-1" : ""
              }`}
            >
              <OfferCard
                offer={offer}
                featured={offer.id === featuredId}
                redeemable={isOfferRedeemable(offer)}
                onCtaClick={handleCta}
                onTermsClick={setTermsOffer}
              />
            </div>
          ))}
        </div>
      </div>

      {termsOffer ? (
        <OfferTermsModal offer={termsOffer} onClose={() => setTermsOffer(null)} />
      ) : null}
    </section>
  );
}

export default OffersSection;
