import HeaderCarousel from "../sections/HeaderCarousel";
import StoreOpeningSection from "../sections/StoreOpeningSection";
import AppPromoBanner from "../sections/AppPromoBanner";
import OffersSection from "../sections/OffersSection";
import ExpressUSP from "../sections/ExpressUSP";
import ServicesPreview from "../sections/ServicesPreview";
import OurProcess from "../sections/OurProcess";
import WhyChoose from "../sections/WhyChoose";
import DownloadApp from "../sections/DownloadApp";
import ContactSection from "../sections/ContactSection";
import SeoContentSection from "../sections/SeoContentSection";

function Home() {
  return (
    <>
      <HeaderCarousel />
      <StoreOpeningSection />
      <AppPromoBanner />
      <OffersSection />
      <ExpressUSP />
      <ServicesPreview />
      <OurProcess />
      <WhyChoose />
      <SeoContentSection />
      <ContactSection />
      <DownloadApp />
    </>
  );
}

export default Home;
