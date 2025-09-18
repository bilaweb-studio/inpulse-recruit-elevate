import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";

const FeaturedJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Desenvolvedor Full Stack Sênior",
      company: "TechCorp Inovação",
      location: "São Paulo, SP",
      type: "CLT",
      salary: "R$ 8.000 - R$ 12.000",
      featured: true,
      description: "Buscamos desenvolvedor experiente em React, Node.js e TypeScript para projetos inovadores.",
      tags: ["React", "Node.js", "TypeScript", "AWS"],
      posted: "2 dias atrás"
    },
    {
      id: 2,
      title: "Analista de Marketing Digital",
      company: "Digital Solutions",
      location: "Rio de Janeiro, RJ",
      type: "CLT",
      salary: "R$ 4.500 - R$ 6.500",
      featured: false,
      description: "Profissional criativo para gerenciar campanhas digitais e estratégias de marketing.",
      tags: ["Google Ads", "Facebook Ads", "Analytics", "SEO"],
      posted: "1 dia atrás"
    },
    {
      id: 3,
      title: "Gerente de Vendas",
      company: "Sales Expert",
      location: "Belo Horizonte, MG",
      type: "CLT",
      salary: "R$ 6.000 - R$ 9.000",
      featured: true,
      description: "Liderar equipe de vendas e desenvolver estratégias para aumentar receita.",
      tags: ["Vendas", "Liderança", "CRM", "Negociação"],
      posted: "3 dias atrás"
    },
    {
      id: 4,
      title: "Designer UX/UI",
      company: "Creative Studio",
      location: "Remoto",
      type: "PJ",
      salary: "R$ 5.000 - R$ 8.000",
      featured: false,
      description: "Criar interfaces intuitivas e experiências excepcionais para usuários.",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      posted: "4 dias atrás"
    },
    {
      id: 5,
      title: "Analista Financeiro",
      company: "FinanceGroup",
      location: "São Paulo, SP",
      type: "CLT",
      salary: "R$ 4.000 - R$ 6.000",
      featured: false,
      description: "Responsável por análises financeiras e relatórios gerenciais.",
      tags: ["Excel", "Power BI", "Análise", "Planejamento"],
      posted: "5 dias atrás"
    },
    {
      id: 6,
      title: "Engenheiro de DevOps",
      company: "CloudTech",
      location: "Porto Alegre, RS",
      type: "CLT",
      salary: "R$ 9.000 - R$ 13.000",
      featured: true,
      description: "Automatizar processos e gerenciar infraestrutura em cloud.",
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      posted: "1 dia atrás"
    }
  ];

  return (
    <section id="vagas" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vagas em Destaque
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oportunidades selecionadas especialmente para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <p className="text-primary font-medium">{job.company}</p>
                  </div>
                  {job.featured && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-2 text-success" />
                    {job.salary}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      {job.posted}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-dark">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Ver Todas as Vagas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;