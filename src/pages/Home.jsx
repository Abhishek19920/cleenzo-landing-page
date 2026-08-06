import PersonalHeroBanner from "../sections/PersonalHeroBanner";
import HeaderCarousel from "../sections/HeaderCarousel";
import OurProcess from "../sections/OurProcess";
import OffersSection from "../sections/OffersSection";
import PricingSection from "../sections/PricingSection";
import ExpertServicesSection from "../sections/ExpertServicesSection";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import ServicesPreview from "../sections/ServicesPreview";
import WhyChoose from "../sections/WhyChoose";
import DownloadApp from "../sections/DownloadApp";
import ContactSection from "../sections/ContactSection";
import SeoContentSection from "../sections/SeoContentSection";
import { CarouselStripProvider } from "../context/CarouselStripContext";
import { isHomeTirangaThemeActive } from "../utils/freedomCampaign";
import "../styles/home-tiranga-first-page.css";

function Home() {
  const tirangaFirstPage = isHomeTirangaThemeActive();

  const firstPageSections = (
    <>
      <PersonalHeroBanner />
      <HeaderCarousel />
      <OffersSection />
      <OurProcess />
    </>
  );

  return (
    <CarouselStripProvider>
      {tirangaFirstPage ? (
        <div className="home-first-page-tiranga">
          <div className="home-first-page-tiranga__bar" aria-hidden="true" />
          {firstPageSections}
        </div>
      ) : (
        firstPageSections
      )}
      <PricingSection />
      <ExpertServicesSection />
      <ServicesPreview />
      <WhyChoose />
      <GoogleReviewsSection />
      <SeoContentSection />
      <ContactSection />
      <DownloadApp />
    </CarouselStripProvider>
  );
}

export default Home;
