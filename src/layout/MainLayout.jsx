import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <header>
        <Navbar />
        <div className="h-11 sm:h-12 md:h-[52px]" aria-hidden="true" />
      </header>
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
