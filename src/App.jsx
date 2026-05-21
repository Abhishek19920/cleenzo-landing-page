import { useLocation, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import StickyCTA from "./sections/StickyCTA";

function App() {
  const { pathname } = useLocation();

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
