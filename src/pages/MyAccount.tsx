import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  Briefcase, 
  Heart, 
  Bell, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Shield,
  FileText,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const MyAccount = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const handleLogout = async () => {
    await signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <Card className="bg-gradient-card border-border/50 shadow-elegant">
                <CardHeader>
                  <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <CardTitle className="text-2xl text-foreground">
                    Faça Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Você precisa estar logado para acessar sua conta.
                  </p>
                  
                  <div className="space-y-3">
                    <Link to="/candidato/login">
                      <Button className="w-full bg-primary hover:bg-primary-dark">
                        Login como Candidato
                      </Button>
                    </Link>
                    
                    <Link to="/empresa/login">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Login como Empresa
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Conteúdo quando o usuário estiver logado
  const menuItems = [
    {
      icon: <User className="w-5 h-5 text-primary" />,
      title: "Perfil",
      description: "Editar informações pessoais",
      href: "/conta/perfil"
    },
    {
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      title: "Candidaturas",
      description: "Acompanhar status das aplicações",
      href: "/conta/candidaturas"
    },
    {
      icon: <Heart className="w-5 h-5 text-primary" />,
      title: "Vagas Salvas",
      description: "Suas vagas favoritas",
      href: "/conta/favoritas"
    },
    {
      icon: <Bell className="w-5 h-5 text-primary" />,
      title: "Notificações",
      description: "Configurar alertas e emails",
      href: "/conta/notificacoes"
    },
    {
      icon: <CreditCard className="w-5 h-5 text-primary" />,
      title: "Planos e Pagamentos",
      description: "Gerenciar assinatura",
      href: "/conta/planos"
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      title: "Estatísticas",
      description: "Ver métricas do seu perfil",
      href: "/conta/estatisticas"
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "Privacidade",
      description: "Configurações de privacidade",
      href: "/conta/privacidade"
    },
    {
      icon: <Settings className="w-5 h-5 text-primary" />,
      title: "Configurações",
      description: "Configurações da conta",
      href: "/conta/configuracoes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4 text-primary border-primary">
                Minha Conta
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Bem-vindo de volta!
              </h1>
              <p className="text-muted-foreground">
                Gerencie seu perfil e acompanhe suas candidaturas
              </p>
            </div>

            {/* User Info Card */}
            <Card className="mb-8 bg-gradient-card border-border/50 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground">
                      {profile?.full_name || user?.email || "Usuário"}
                    </h2>
                    <p className="text-muted-foreground">
                      {profile?.experience_level || "Candidato"}
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="mr-2">
                        Plano Pro
                      </Badge>
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        Perfil Ativo
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Último acesso</p>
                    <p className="text-sm font-medium text-foreground">Hoje, 14:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {menuItems.map((item, index) => (
                <Link key={index} to={item.href}>
                  <Card className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="text-center">
                  <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg text-foreground">Candidaturas</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">12</div>
                  <p className="text-sm text-muted-foreground">Candidaturas ativas</p>
                  <Button size="sm" className="mt-3 bg-primary hover:bg-primary-dark">
                    Ver Todas
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/20">
                <CardHeader className="text-center">
                  <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
                  <CardTitle className="text-lg text-foreground">Vagas Salvas</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-accent mb-2">8</div>
                  <p className="text-sm text-muted-foreground">Vagas favoritas</p>
                  <Button size="sm" variant="outline" className="mt-3 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Ver Todas
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-success/5 border-success/20">
                <CardHeader className="text-center">
                  <BarChart3 className="w-8 h-8 text-success mx-auto mb-2" />
                  <CardTitle className="text-lg text-foreground">Visualizações</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-success mb-2">156</div>
                  <p className="text-sm text-muted-foreground">Este mês</p>
                  <Button size="sm" variant="outline" className="mt-3 border-success text-success hover:bg-success hover:text-success-foreground">
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Support and Logout */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Card className="flex-1 bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Precisa de ajuda?</h3>
                      <p className="text-sm text-muted-foreground">Acesse nossa central de suporte</p>
                    </div>
                    <Link to="/contato">
                      <Button size="sm" variant="outline" className="ml-auto">
                        Contato
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-destructive/5 border-destructive/20">
                <CardContent className="p-4">
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyAccount;