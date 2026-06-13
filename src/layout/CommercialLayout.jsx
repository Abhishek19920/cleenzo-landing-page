import { Outlet } from "react-router-dom";
import CommercialNavbar from "./CommercialNavbar";

function CommercialLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <CommercialNavbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default CommercialLayout;
