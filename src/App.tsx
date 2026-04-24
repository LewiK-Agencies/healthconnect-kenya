import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Shop from "./pages/Shop";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Consent from "./pages/Consent";
import Cookies from "./pages/Cookies";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BookingPayment from "./pages/BookingPayment";
import BookingSuccess from "./pages/BookingSuccess";
import Locations from "./pages/Locations";
import LocationPage from "./pages/LocationPage";
import LocationsSitemap from "./pages/LocationsSitemap";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { BookingProvider } from "./components/booking/BookingProvider";
import CookieBanner from "./components/layout/CookieBanner";
import { trackPageView } from "./data/contentStore";

// Track every route change as a page view (skip /admin to keep visitor stats focused on the public site).
const PageViewTracker = () => {
  const loc = useLocation();
  useEffect(() => {
    if (loc.pathname.startsWith("/admin")) return;
    trackPageView();
  }, [loc.pathname]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BookingProvider>
          <PageViewTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/booking-payment" element={<BookingPayment />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations-sitemap" element={<LocationsSitemap />} />
            <Route path="/locations/:city" element={<LocationPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BookingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
