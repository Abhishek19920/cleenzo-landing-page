import { useLocation, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PageSEO from "./components/PageSEO";
import StickyCTA from "./sections/StickyCTA";
import LaunchPopup from "./sections/LaunchPopup";
import { SchedulePickupProvider } from "./context/SchedulePickupContext";
import { ENABLE_LAUNCH_GATE } from "./constants";
import { isBeforeLaunchDay } from "./launchGate";

function App() {
  const { pathname } = useLocation();
  const showLaunchGate = ENABLE_LAUNCH_GATE && isBeforeLaunchDay();

  if (showLaunchGate) {
    return (
      <>
        <PageSEO />
        <LaunchPopup />
      </>
    );
  }

  return (
    <SchedulePickupProvider>
      <PageSEO />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {pathname === "/" && <StickyCTA />}
    </SchedulePickupProvider>
  );
}

export default App;
