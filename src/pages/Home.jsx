import Hero from "../sections/Hero";
import DiscountBanner from "../sections/DiscountBanner";
import ExpressUSP from "../sections/ExpressUSP";
import ServicesPreview from "../sections/ServicesPreview";
import OurProcess from "../sections/OurProcess";
import WhyChoose from "../sections/WhyChoose";
import DownloadApp from "../sections/DownloadApp";

function Home() {
  return (
    <>
      <Hero />
      <DiscountBanner />
      <ExpressUSP />
      <ServicesPreview />
      <OurProcess />
      <WhyChoose />
      <DownloadApp />
    </>
  );
}

export default Home;
