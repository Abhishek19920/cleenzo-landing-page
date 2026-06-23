import { useLocation } from "react-router-dom";
import ServicePageLayout from "../components/service/ServicePageLayout";
import NotFound from "./NotFound";
import { getServicePageByPath } from "../data/servicePages";

function ServicePage() {
  const { pathname } = useLocation();
  const page = getServicePageByPath(pathname);

  if (!page) {
    return <NotFound />;
  }

  return <ServicePageLayout page={page} />;
}

export default ServicePage;
