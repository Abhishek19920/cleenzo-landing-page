import { useLocation, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import CommercialLayout from "./layout/CommercialLayout";
import Home from "./pages/Home";
import CommercialLaundry from "./pages/CommercialLaundry";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import PageSEO from "./components/PageSEO";
import StickyCTA from "./sections/StickyCTA";
import { SchedulePickupProvider } from "./context/SchedulePickupContext";
import { AppDownloadProvider } from "./context/AppDownloadContext";
import { SERVICE_PAGE_PATHS } from "./data/servicePages";

function App() {
  const { pathname } = useLocation();

  return (
    <AppDownloadProvider>
      <SchedulePickupProvider>
        <PageSEO pathname={pathname} />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            {SERVICE_PAGE_PATHS.map((path) => (
              <Route key={path} path={path.slice(1)} element={<ServicePage />} />
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
