import PersonalHeroBanner from "../sections/PersonalHeroBanner";
import HeaderCarousel from "../sections/HeaderCarousel";
import StoreOpeningSection from "../sections/StoreOpeningSection";
import OurProcess from "../sections/OurProcess";
import OffersSection from "../sections/OffersSection";
import ServicesPreview from "../sections/ServicesPreview";
import WhyChoose from "../sections/WhyChoose";
import DownloadApp from "../sections/DownloadApp";
import ContactSection from "../sections/ContactSection";
import SeoContentSection from "../sections/SeoContentSection";
import { showPreLaunchUI } from "../preLaunch";

function Home() {
  return (
    <>
      <PersonalHeroBanner />
      <HeaderCarousel />
      {/* PRE_LAUNCH_CLEANUP — remove StoreOpeningSection import & block after launch */}
      {showPreLaunchUI() && <StoreOpeningSection />}
      <OurProcess />
      <OffersSection />
      <ServicesPreview />
      <WhyChoose />
      <SeoContentSection />
      <ContactSection />
      <DownloadApp />
    </>
  );
}

export default Home;
