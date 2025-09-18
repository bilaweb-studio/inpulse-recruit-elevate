import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Vagas", href: "#vagas" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Blog", href: "#blog" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IP</span>
            </div>
            <span className="text-xl font-bold text-primary">InPulse RH</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <User className="w-4 h-4 mr-2" />
              Candidato
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Building2 className="w-4 h-4 mr-2" />
              Empresa
            </Button>
            <Button variant="outline" size="sm">
              Minha Conta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col space-y-4 pt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-border pt-4 space-y-3">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Login Candidato
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-2" />
                Login Empresa
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Minha Conta
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;