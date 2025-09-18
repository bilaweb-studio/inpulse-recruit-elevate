import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedJobs from "@/components/sections/FeaturedJobs";
import ForCandidates from "@/components/sections/ForCandidates";
import ForCompanies from "@/components/sections/ForCompanies";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedJobs />
        <ForCandidates />
        <ForCompanies />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
