import { useLocation, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import StickyCTA from "./sections/StickyCTA";
import LaunchPopup from "./sections/LaunchPopup";
import { STORE_LAUNCH } from "./constants";

function isBeforeLaunchDay() {
  const [y, m, d] = STORE_LAUNCH.launchDate.split("-").map(Number);
  const launch = new Date(y, m - 1, d);

  const now = new Date();
  const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today0 < launch;
}

function App() {
  const { pathname } = useLocation();

  if (isBeforeLaunchDay()) {
    // Block the entire app until the launch date (including refreshes).
    return <LaunchPopup />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {pathname === "/" && <StickyCTA />}
    </>
  );
}

export default App;
