import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import CandidateLogin from "./pages/CandidateLogin";
import CompanyLogin from "./pages/CompanyLogin";
import MyAccount from "./pages/MyAccount";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import CreateJob from "./pages/CreateJob";
import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import Applications from "./pages/Applications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/vagas" element={<Jobs />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/candidato/login" element={<CandidateLogin />} />
            <Route path="/empresa/login" element={<CompanyLogin />} />
            <Route path="/minha-conta" element={<MyAccount />} />
            <Route path="/criar-vaga" element={<CreateJob />} />
            <Route path="/criar-perfil" element={<CreateProfile />} />
            <Route path="/pagamento-sucesso" element={<PaymentSuccess />} />
            <Route path="/pagamento-cancelado" element={<PaymentCanceled />} />
            <Route path="/conta/perfil" element={<Profile />} />
            <Route path="/conta/favoritas" element={<SavedJobs />} />
            <Route path="/conta/candidaturas" element={<Applications />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
