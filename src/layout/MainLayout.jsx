import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StoreOpeningBanner from "../sections/StoreOpeningBanner";

function MainLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <header className="sticky top-0 z-40">
        <StoreOpeningBanner />
        <Navbar />
      </header>
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
