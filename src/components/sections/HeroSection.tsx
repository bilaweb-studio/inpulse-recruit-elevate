import { Button } from "@/components/ui/button";
import { Search, Users, Building2, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Conectamos{" "}
            <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
              Talentos
            </span>{" "}
            às{" "}
            <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
              Oportunidades
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-slide-up">
            A plataforma de recrutamento inteligente que transforma a busca por talentos
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-background/10 backdrop-blur-sm rounded-lg border border-primary-foreground/20">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar vagas por cargo, empresa ou localização..."
                  className="pl-10 bg-background border-0 text-foreground"
                />
              </div>
              <Link to="/vagas">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Buscar Vagas
                </Button>
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Link to="/candidato/login">
              <Button size="lg" variant="secondary" className="bg-background/20 hover:bg-background/30 text-primary-foreground border-primary-foreground/30">
                <Users className="w-5 h-5 mr-2" />
                Sou Candidato
              </Button>
            </Link>
            <Link to="/empresa/login">
              <Button size="lg" variant="secondary" className="bg-background/20 hover:bg-background/30 text-primary-foreground border-primary-foreground/30">
                <Building2 className="w-5 h-5 mr-2" />
                Sou Empresa
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground mb-2">+1.500</div>
              <p className="text-primary-foreground/80">Vagas Ativas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">+10.000</div>
              <p className="text-primary-foreground/80">Candidatos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">+500</div>
              <p className="text-primary-foreground/80">Empresas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;