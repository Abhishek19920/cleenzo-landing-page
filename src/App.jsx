import { useLocation, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import CommercialLayout from "./layout/CommercialLayout";
import Home from "./pages/Home";
import CommercialLaundry from "./pages/CommercialLaundry";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";
import PageSEO from "./components/PageSEO";
import TrailingSlashRedirect from "./components/TrailingSlashRedirect";
import StickyCTA from "./sections/StickyCTA";
import { SchedulePickupProvider } from "./context/SchedulePickupContext";
import { AppDownloadProvider } from "./context/AppDownloadContext";
import { SERVICE_PAGE_PATHS } from "./data/servicePages";

function App() {
  const { pathname } = useLocation();

  return (
    <AppDownloadProvider>
      <SchedulePickupProvider>
        <TrailingSlashRedirect />
        <PageSEO pathname={pathname} />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            {SERVICE_PAGE_PATHS.map((path) => (
              <Route key={path} path={path.slice(1)} element={<ServicePage />} />
            ))}
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
