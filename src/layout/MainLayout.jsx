import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <header>
        <Navbar />
        <div className="site-nav-spacer" aria-hidden="true" />
      </header>
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
