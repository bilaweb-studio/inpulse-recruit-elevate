import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Brain, TrendingUp, CheckCircle, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const ForCompanies = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Banco de Talentos",
      description: "Acesse milhares de profissionais qualificados em nossa plataforma."
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Triagem Inteligente",
      description: "IA que analisa currículos e ranqueia candidatos por compatibilidade."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Métricas Avançadas",
      description: "Acompanhe performance das vagas e otimize seu processo seletivo."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "R$ 99,90/mês",
      features: [
        "Até 3 vagas ativas",
        "Acesso ao banco de talentos",
        "Filtros básicos",
        "Suporte por email",
        "Relatórios básicos"
      ],
      popular: false
    },
    {
      name: "Business",
      price: "R$ 249,90/mês",
      features: [
        "Até 10 vagas ativas",
        "Triagem com IA",
        "Vagas em destaque",
        "Análise de compatibilidade",
        "Relatórios avançados",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "R$ 499,90/mês",
      features: [
        "Vagas ilimitadas",
        "IA avançada personalizada",
        "Destaque premium",
        "Gerente dedicado",
        "Integração com sistemas",
        "API exclusiva",
        "Suporte 24/7"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Para Empresas
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Encontre os Melhores Talentos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta para otimizar seu processo de recrutamento
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

        {/* Benefits Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 mb-16 text-primary-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Reduza o Tempo de Contratação em 70%
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Nossa IA analisa currículos em segundos, identifica os melhores candidatos 
                e acelera todo o processo de recrutamento.
              </p>
              <Link to="/empresa/login">
                <Button variant="secondary" size="lg" className="bg-background/20 hover:bg-background/30 text-primary-foreground border-primary-foreground/30">
                  <Building2 className="w-5 h-5 mr-2" />
                  Teste Grátis por 14 Dias
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">70%</div>
                <p className="text-sm text-primary-foreground/80">Redução no tempo</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">95%</div>
                <p className="text-sm text-primary-foreground/80">Precisão da IA</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50%</div>
                <p className="text-sm text-primary-foreground/80">Menos custos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">90%</div>
                <p className="text-sm text-primary-foreground/80">Satisfação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Planos para Empresas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-elegant transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-card scale-105' : 'border-border/50'
              } bg-gradient-card`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    <Crown className="w-3 h-3 mr-1" />
                    Recomendado
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
                  
                  <Link to="/empresa/login">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary-dark' 
                          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                      }`}
                    >
                      Contratar Plano
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

export default ForCompanies;