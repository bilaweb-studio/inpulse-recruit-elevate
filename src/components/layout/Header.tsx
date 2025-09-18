import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Building2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { label: "Vagas", href: "/vagas" },
    { label: "Sobre", href: "/sobre" },
    { label: "Serviços", href: "/servicos" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IP</span>
            </div>
            <span className="text-xl font-bold text-primary">InPulse RH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <>
                <Link to="/candidato/login">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white hover:bg-primary [&_svg]:hover:text-white">
                    <User className="w-4 h-4 mr-2" />
                    Candidato
                  </Button>
                </Link>
                <Link to="/empresa/login">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white hover:bg-primary [&_svg]:hover:text-white">
                    <Building2 className="w-4 h-4 mr-2" />
                    Empresa
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/minha-conta">
                  <Button variant="outline" size="sm">
                    Minha Conta
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            )}
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
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border pt-4 space-y-3">
              {!user ? (
                <>
                  <Link to="/candidato/login">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-white hover:bg-primary [&_svg]:hover:text-white">
                      <User className="w-4 h-4 mr-2" />
                      Login Candidato
                    </Button>
                  </Link>
                  <Link to="/empresa/login">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-white hover:bg-primary [&_svg]:hover:text-white">
                      <Building2 className="w-4 h-4 mr-2" />
                      Login Empresa
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/minha-conta">
                    <Button variant="outline" size="sm" className="w-full">
                      Minha Conta
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;