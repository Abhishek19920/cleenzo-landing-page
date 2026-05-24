import Hero from "../sections/Hero";
import DownloadApp from "../sections/DownloadApp";
import DiscountBanner from "../sections/DiscountBanner";
import ExpressUSP from "../sections/ExpressUSP";
import ServicesPreview from "../sections/ServicesPreview";
import OurProcess from "../sections/OurProcess";
import WhyChoose from "../sections/WhyChoose";

function Home() {
  return (
    <>
      <Hero />
      <DownloadApp />
      <DiscountBanner />
      <ExpressUSP />
      <ServicesPreview />
      <OurProcess />
      <WhyChoose />
    </>
  );
}

export default Home;
