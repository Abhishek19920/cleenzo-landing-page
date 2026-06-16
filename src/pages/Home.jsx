import PersonalHeroBanner from "../sections/PersonalHeroBanner";
import HeaderCarousel from "../sections/HeaderCarousel";
import OurProcess from "../sections/OurProcess";
import OffersSection from "../sections/OffersSection";
import ServicesPreview from "../sections/ServicesPreview";
import WhyChoose from "../sections/WhyChoose";
import DownloadApp from "../sections/DownloadApp";
import ContactSection from "../sections/ContactSection";
import SeoContentSection from "../sections/SeoContentSection";
import { CarouselStripProvider } from "../context/CarouselStripContext";

function Home() {
  return (
    <CarouselStripProvider>
      <PersonalHeroBanner />
      <HeaderCarousel />
      <OurProcess />
      <OffersSection />
      <ServicesPreview />
      <WhyChoose />
      <SeoContentSection />
      <ContactSection />
      <DownloadApp />
    </CarouselStripProvider>
  );
}

export default Home;
