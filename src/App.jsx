import { useLocation, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import StickyCTA from "./sections/StickyCTA";
import LaunchPopup from "./sections/LaunchPopup";

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {isHome && <LaunchPopup />}
      {isHome && <StickyCTA />}
    </>
  );
}

export default App;
