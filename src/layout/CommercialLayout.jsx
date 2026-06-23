import { Outlet } from "react-router-dom";
import { CommercialNavProvider } from "../commercial/CommercialNavContext";
import CommercialNavbar from "./CommercialNavbar";

function CommercialLayout() {
  return (
    <CommercialNavProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-white">
        <CommercialNavbar />
        <div className="h-[72px] sm:h-[76px] lg:h-[124px]" aria-hidden="true" />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </CommercialNavProvider>
  );
}

export default CommercialLayout;
