import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import CommercialLayout from "./layout/CommercialLayout";
import Home from "./pages/Home";
import CommercialLaundry from "./pages/CommercialLaundry";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import OffersTermsPage from "./pages/OffersTermsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import DryCleanersRajNagarExtension from "./pages/DryCleanersRajNagarExtension";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import NotFound from "./pages/NotFound";
import PageSEO from "./components/PageSEO";
import TrailingSlashRedirect from "./components/TrailingSlashRedirect";
import StickyCTA from "./sections/StickyCTA";
import { SchedulePickupProvider } from "./context/SchedulePickupContext";
import { AppDownloadProvider } from "./context/AppDownloadContext";
import { SERVICE_PAGE_PATHS } from "./data/servicePages";
import { URL_REDIRECTS } from "./data/urlRedirects";
import { DRY_CLEANERS_RNE_PATH } from "./data/dryCleanersRajNagarExtension";

function App() {
  const { pathname } = useLocation();

  return (
    <AppDownloadProvider>
      <SchedulePickupProvider>
        <TrailingSlashRedirect />
        <PageSEO pathname={pathname} />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="offers-terms" element={<OffersTermsPage />} />
            <Route path="order/:accessToken" element={<OrderTrackingPage />} />
            <Route path="invoice/:accessToken" element={<OrderTrackingPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route
              path={DRY_CLEANERS_RNE_PATH.slice(1)}
              element={<DryCleanersRajNagarExtension />}
            />
            {SERVICE_PAGE_PATHS.map((path) => (
              <Route key={path} path={path.slice(1)} element={<ServicePage />} />
            ))}
            {Object.entries(URL_REDIRECTS).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/commercial-laundry" element={<CommercialLayout />}>
            <Route index element={<CommercialLaundry />} />
          </Route>
        </Routes>
        {pathname === "/" && <StickyCTA />}
      </SchedulePickupProvider>
    </AppDownloadProvider>
  );
}

export default App;
