import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Actions from "./pages/Actions";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import LegalNotice from "./pages/LegalNotice";
import DonationSuccess from "./pages/DonationSuccess";
import DonationsAdmin from "./pages/DonationsAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/admin/donations" element={<DonationsAdmin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
