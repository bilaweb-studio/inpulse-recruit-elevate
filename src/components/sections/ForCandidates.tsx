import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, Star, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ForCandidates = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Busca Inteligente",
      description: "Encontre vagas que combinam perfeitamente com seu perfil usando nossa IA avançada."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "Perfil Otimizado",
      description: "Crie um perfil profissional que se destaca para recrutadores."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Candidaturas Diretas",
      description: "Candidate-se às vagas com um clique e acompanhe o status em tempo real."
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "Gratuito",
      features: [
        "Busca básica de vagas",
        "Até 5 candidaturas/mês",
        "Perfil básico",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "R$ 29,90/mês",
      features: [
        "Busca avançada com filtros",
        "Candidaturas ilimitadas",
        "Perfil destacado",
        "Análise de compatibilidade",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "R$ 49,90/mês",
      features: [
        "Todos os recursos Pro",
        "Visibilidade máxima",
        "Mentoria de carreira",
        "Cursos gratuitos",
        "Suporte VIP"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Para Candidatos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Acelere sua Carreira
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas poderosas para encontrar a vaga dos seus sonhos
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plans */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Planos para Candidatos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-elegant transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-card scale-105' : 'border-border/50'
              } bg-gradient-card`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mt-2">{plan.price}</div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/candidato/login">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary-dark' 
                          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                      }`}
                    >
                      {plan.price === "Gratuito" ? "Começar Grátis" : "Assinar Plano"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCandidates;