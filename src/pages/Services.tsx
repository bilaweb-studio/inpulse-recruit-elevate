import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  Search, 
  Brain, 
  Target, 
  BarChart, 
  CheckCircle,
  Star,
  Zap,
  UserCheck,
  TrendingUp,
  Shield
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      title: "Recrutamento Inteligente",
      description: "Utilizamos IA avançada para encontrar os candidatos ideais para suas vagas, otimizando tempo e recursos.",
      features: [
        "Busca por competências específicas",
        "Análise de compatibilidade cultural",
        "Filtros avançados de experiência",
        "Matching automático"
      ]
    },
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Triagem por IA",
      description: "Nossa inteligência artificial analisa currículos e perfis para pré-selecionar os melhores candidatos.",
      features: [
        "Análise automática de currículos",
        "Ranking de candidatos",
        "Avaliação de soft skills",
        "Relatórios detalhados"
      ]
    },
    {
      icon: <UserCheck className="w-12 h-12 text-primary" />,
      title: "Gestão de Candidatos",
      description: "Plataforma completa para gerenciar todo o processo de recrutamento e seleção.",
      features: [
        "Pipeline de candidatos",
        "Comunicação integrada",
        "Agendamento de entrevistas",
        "Feedback automatizado"
      ]
    },
    {
      icon: <BarChart className="w-12 h-12 text-primary" />,
      title: "Analytics e Relatórios",
      description: "Dashboards completos com métricas e insights para otimizar seus processos de RH.",
      features: [
        "Métricas de performance",
        "Time to hire",
        "Taxa de conversão",
        "ROI do recrutamento"
      ]
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Headhunting Especializado",
      description: "Busca ativa de talentos para posições estratégicas e cargos de liderança.",
      features: [
        "Caça talentos executiva",
        "Mapeamento de mercado",
        "Abordagem personalizada",
        "Confidencialidade garantida"
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Consultoria em RH",
      description: "Assessoria especializada para otimizar seus processos de recursos humanos.",
      features: [
        "Diagnóstico organizacional",
        "Estruturação de RH",
        "Políticas e procedimentos",
        "Treinamento de equipes"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Velocidade",
      description: "Reduza em até 70% o tempo de contratação"
    },
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Precisão",
      description: "95% de assertividade no matching de candidatos"
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Segurança",
      description: "Proteção total dos dados e informações"
    },
    {
      icon: <Star className="w-8 h-8 text-accent" />,
      title: "Qualidade",
      description: "Candidatos pré-qualificados e verificados"
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$ 99/mês",
      description: "Ideal para pequenas empresas",
      features: [
        "Até 5 vagas ativas",
        "Busca básica de candidatos",
        "Suporte por email",
        "Relatórios básicos"
      ],
      popular: false
    },
    {
      name: "Profissional",
      price: "R$ 299/mês",
      description: "Para empresas em crescimento",
      features: [
        "Até 20 vagas ativas",
        "IA de triagem incluída",
        "Suporte prioritário",
        "Analytics avançado",
        "Headhunting básico"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      description: "Soluções customizadas",
      features: [
        "Vagas ilimitadas",
        "IA personalizada",
        "Gerente dedicado",
        "Integrações customizadas",
        "Consultoria completa"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 text-primary-foreground border-primary-foreground/30">
              Nossos Serviços
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Soluções Completas em{" "}
              <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                Recrutamento
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-primary-foreground/90">
              Transforme seu processo de contratação com tecnologia de ponta e expertise em recursos humanos.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Por que escolher a InPulse RH?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Resultados comprovados que fazem a diferença no seu negócio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nossos Serviços
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Soluções completas para todas as suas necessidades de RH
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-20 h-20 bg-primary-light rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-6 bg-primary hover:bg-primary-dark">
                      Saiba Mais
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Planos para Empresas
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Escolha o plano ideal para o tamanho e necessidades da sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                    <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary mt-2">{plan.price}</div>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
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
                    
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary-dark' 
                          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                      }`}
                    >
                      {plan.price === "Sob consulta" ? "Entrar em Contato" : "Assinar Plano"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Revolucionar seu RH?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar sua empresa a encontrar os melhores talentos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Users className="w-5 h-5 mr-2" />
                Agendar Demonstração
              </Button>
              <Button size="lg" variant="secondary" className="bg-background/20 hover:bg-background/30 text-primary-foreground border-primary-foreground/30">
                <Building2 className="w-5 h-5 mr-2" />
                Falar com Consultor
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;