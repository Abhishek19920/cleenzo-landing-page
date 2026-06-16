import { useCallback } from "react";
import CommercialHero from "../commercial/sections/CommercialHero";
import CommercialIndustries from "../commercial/sections/CommercialIndustries";
import CommercialWorkflow from "../commercial/sections/CommercialWorkflow";
import CommercialServices from "../commercial/sections/CommercialServices";
import CommercialWhyChoose from "../commercial/sections/CommercialWhyChoose";
import CommercialTrial from "../commercial/sections/CommercialTrial";
import CommercialEnquiryForm from "../commercial/sections/CommercialEnquiryForm";
import CommercialCtaFooter from "../commercial/sections/CommercialCtaFooter";

function CommercialLaundry() {
  const scrollToForm = useCallback(() => {
    document.getElementById("commercial-enquiry")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <CommercialHero onQuoteClick={scrollToForm} onMeetingClick={scrollToForm} />
      <CommercialIndustries />
      <CommercialWorkflow />
      <CommercialServices />
      <CommercialWhyChoose />
      <CommercialTrial onTrialClick={scrollToForm} />
      <CommercialEnquiryForm />
      <CommercialCtaFooter onMeetingClick={scrollToForm} />
    </>
  );
}

export default CommercialLaundry;
