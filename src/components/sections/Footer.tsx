import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Para Candidatos",
      links: [
        { label: "Buscar Vagas", href: "#vagas" },
        { label: "Criar Perfil", href: "#perfil" },
        { label: "Planos", href: "#planos-candidatos" },
        { label: "Dicas de Carreira", href: "#blog" }
      ]
    },
    {
      title: "Para Empresas",
      links: [
        { label: "Publicar Vaga", href: "#publicar" },
        { label: "Buscar Talentos", href: "#talentos" },
        { label: "Planos Empresariais", href: "#planos-empresas" },
        { label: "IA de Recrutamento", href: "#ia" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre Nós", href: "#sobre" },
        { label: "Serviços", href: "#servicos" },
        { label: "Contato", href: "#contato" },
        { label: "Blog", href: "#blog" }
      ]
    },
    {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", href: "#ajuda" },
        { label: "Termos de Uso", href: "#termos" },
        { label: "Política de Privacidade", href: "#privacidade" },
        { label: "FAQ", href: "#faq" }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-dark to-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Fique por dentro das melhores oportunidades
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Receba vagas exclusivas e dicas de carreira diretamente no seu email
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Seu melhor email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Mail className="w-4 h-4 mr-2" />
                Inscrever
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">IP</span>
              </div>
              <span className="text-xl font-bold">InPulse RH</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
              Conectamos talentos às melhores oportunidades através de tecnologia 
              inovadora e inteligência artificial, transformando o futuro do recrutamento.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-3 text-accent" />
                <span className="text-primary-foreground/80">(11) 3456-7890</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-3 text-accent" />
                <span className="text-primary-foreground/80">contato@inpulserh.com.br</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-3 text-accent" />
                <span className="text-primary-foreground/80">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-accent">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center group"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/60 mb-4 md:mb-0">
              © 2024 InPulse RH. Todos os direitos reservados.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-accent"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-accent"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-accent"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-accent"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;