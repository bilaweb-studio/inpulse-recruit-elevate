import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, DollarSign, Star, Search, Filter } from "lucide-react";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Desenvolvedor Full Stack Sênior",
      company: "TechCorp Inovação",
      location: "São Paulo, SP",
      type: "CLT",
      salary: "R$ 8.000 - R$ 12.000",
      featured: true,
      description: "Buscamos desenvolvedor experiente em React, Node.js e TypeScript para projetos inovadores em uma das maiores empresas de tecnologia do país.",
      tags: ["React", "Node.js", "TypeScript", "AWS"],
      posted: "2 dias atrás",
      level: "Sênior"
    },
    {
      id: 2,
      title: "Analista de Marketing Digital",
      company: "Digital Solutions",
      location: "Rio de Janeiro, RJ",
      type: "CLT",
      salary: "R$ 4.500 - R$ 6.500",
      featured: false,
      description: "Profissional criativo para gerenciar campanhas digitais e estratégias de marketing em agência renomada.",
      tags: ["Google Ads", "Facebook Ads", "Analytics", "SEO"],
      posted: "1 dia atrás",
      level: "Pleno"
    },
    {
      id: 3,
      title: "Gerente de Vendas",
      company: "Sales Expert",
      location: "Belo Horizonte, MG",
      type: "CLT",
      salary: "R$ 6.000 - R$ 9.000",
      featured: true,
      description: "Liderar equipe de vendas e desenvolver estratégias para aumentar receita em empresa consolidada no mercado.",
      tags: ["Vendas", "Liderança", "CRM", "Negociação"],
      posted: "3 dias atrás",
      level: "Sênior"
    },
    {
      id: 4,
      title: "Designer UX/UI",
      company: "Creative Studio",
      location: "Remoto",
      type: "PJ",
      salary: "R$ 5.000 - R$ 8.000",
      featured: false,
      description: "Criar interfaces intuitivas e experiências excepcionais para usuários em projetos inovadores.",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      posted: "4 dias atrás",
      level: "Pleno"
    },
    {
      id: 5,
      title: "Analista Financeiro",
      company: "FinanceGroup",
      location: "São Paulo, SP",
      type: "CLT",
      salary: "R$ 4.000 - R$ 6.000",
      featured: false,
      description: "Responsável por análises financeiras e relatórios gerenciais em instituição financeira sólida.",
      tags: ["Excel", "Power BI", "Análise", "Planejamento"],
      posted: "5 dias atrás",
      level: "Pleno"
    },
    {
      id: 6,
      title: "Engenheiro de DevOps",
      company: "CloudTech",
      location: "Porto Alegre, RS",
      type: "CLT",
      salary: "R$ 9.000 - R$ 13.000",
      featured: true,
      description: "Automatizar processos e gerenciar infraestrutura em cloud para empresa líder em tecnologia.",
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      posted: "1 dia atrás",
      level: "Sênior"
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
              Encontre sua Vaga Ideal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              +1.500 Vagas{" "}
              <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                Disponíveis
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-primary-foreground/90">
              Descubra oportunidades únicas e acelere sua carreira com as melhores empresas do mercado.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cargo, empresa ou palavra-chave..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">São Paulo, SP</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro, RJ</SelectItem>
                    <SelectItem value="mg">Belo Horizonte, MG</SelectItem>
                    <SelectItem value="rs">Porto Alegre, RS</SelectItem>
                    <SelectItem value="remote">Remoto</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Júnior</SelectItem>
                    <SelectItem value="pleno">Pleno</SelectItem>
                    <SelectItem value="senior">Sênior</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="lg" className="bg-primary hover:bg-primary-dark">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Tecnologia</Badge>
                <Badge variant="outline">Marketing</Badge>
                <Badge variant="outline">Vendas</Badge>
                <Badge variant="outline">Financeiro</Badge>
                <Badge variant="outline">Design</Badge>
                <Badge variant="outline">Recursos Humanos</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Resultados da Busca ({jobs.length} vagas encontradas)
              </h2>
              <Select defaultValue="recent">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="salary">Maior Salário</SelectItem>
                  <SelectItem value="relevance">Relevância</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {job.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-primary hover:bg-primary-dark">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Candidatar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Carregar Mais Vagas
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;