import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Users, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CandidateLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4 text-primary border-primary">
                <Users className="w-4 h-4 mr-2" />
                Área do Candidato
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Acesse sua conta e encontre sua próxima oportunidade" 
                  : "Cadastre-se e acelere sua carreira"}
              </p>
            </div>

            {/* Login/Register Form */}
            <Card className="bg-gradient-card border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl text-foreground text-center">
                  {isLogin ? "Fazer Login" : "Criar Conta"}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nome
                      </label>
                      <Input placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Sobrenome
                      </label>
                      <Input placeholder="Seu sobrenome" />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Lembrar de mim
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>
                )}

                {!isLogin && (
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Concordo com os{" "}
                      <Link to="/terms" className="text-primary hover:text-primary-dark">
                        Termos de Uso
                      </Link>{" "}
                      e{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary-dark">
                        Política de Privacidade
                      </Link>
                    </label>
                  </div>
                )}

                <Button className="w-full bg-primary hover:bg-primary-dark">
                  {isLogin ? "Entrar" : "Criar Conta"}
                </Button>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                    ou
                  </span>
                </div>

                <Button variant="outline" className="w-full border-border hover:bg-muted">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar com Google
                </Button>

                <div className="text-center">
                  <span className="text-muted-foreground text-sm">
                    {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      {isLogin ? "Cadastre-se" : "Faça login"}
                    </button>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="flex items-center space-x-3 p-4">
                  <UserPlus className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      Acesso às melhores vagas
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Candidature-se com um clique e acompanhe o status
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="flex items-center space-x-3 p-4">
                  <Users className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      Perfil profissional
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Destaque suas habilidades e conquistas
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Login Link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">
                É uma empresa?
              </p>
              <Link to="/empresa/login">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  Acesso para Empresas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CandidateLogin;