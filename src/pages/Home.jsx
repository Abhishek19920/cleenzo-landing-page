import PersonalHeroBanner from "../sections/PersonalHeroBanner";
import LocalTrustSection from "../sections/LocalTrustSection";
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
import { useCampaignExperience } from "../hooks/useCampaignExperience";
import NoidaExtensionSection from "../components/campaign/NoidaExtensionSection";
import IndependenceUniformBlock from "../components/campaign/IndependenceUniformBlock";
import "../styles/home-tiranga-first-page.css";

function Home() {
  const tirangaFirstPage = isHomeTirangaThemeActive();
  const { noida, showUniformBlock } = useCampaignExperience();

  const firstPageSections = (
    <>
      <PersonalHeroBanner />
      <LocalTrustSection />
      <HeaderCarousel />
      {tirangaFirstPage ? <NoidaExtensionSection noida={noida} /> : null}
      {showUniformBlock ? <IndependenceUniformBlock /> : null}
      <OffersSection />
      <OurProcess />
    </>
  );

  const belowFoldSections = (
    <>
      <PricingSection />
      <ExpertServicesSection />
      <ServicesPreview />
      <WhyChoose />
      <GoogleReviewsSection />
      <SeoContentSection />
      <ContactSection />
      <DownloadApp />
    </>
  );

  return (
    <CarouselStripProvider>
      {tirangaFirstPage ? (
        <div className="home-first-page-tiranga home-page-tiranga">
          <div className="home-first-page-tiranga__bar" aria-hidden="true" />
          {firstPageSections}
          {belowFoldSections}
        </div>
      ) : (
        <>
          {firstPageSections}
          {belowFoldSections}
        </>
      )}
    </CarouselStripProvider>
  );
}

export default Home;
