import { useLocation, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import CommercialLayout from "./layout/CommercialLayout";
import Home from "./pages/Home";
import CommercialLaundry from "./pages/CommercialLaundry";
import NotFound from "./pages/NotFound";
import PageSEO from "./components/PageSEO";
import StickyCTA from "./sections/StickyCTA";
import LaunchPopup from "./sections/LaunchPopup";
import { SchedulePickupProvider } from "./context/SchedulePickupContext";
import { AppDownloadProvider } from "./context/AppDownloadContext";
import { ENABLE_LAUNCH_GATE } from "./constants";
import { showPreLaunchUI } from "./preLaunch";

function App() {
  const { pathname } = useLocation();
  // PRE_LAUNCH_CLEANUP — remove launch gate block after store is live
  const showLaunchGate = ENABLE_LAUNCH_GATE && showPreLaunchUI();

  if (showLaunchGate) {
    return (
      <AppDownloadProvider>
        <PageSEO pathname={pathname} />
        <LaunchPopup />
      </AppDownloadProvider>
    );
  }

  return (
    <AppDownloadProvider>
      <SchedulePickupProvider>
        <PageSEO pathname={pathname} />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
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
