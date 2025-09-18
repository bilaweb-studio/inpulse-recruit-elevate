import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, DollarSign, Star, Search, Filter, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useJobs } from "@/hooks/useJobs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  
  const { jobs, loading, fetchJobs, applyToJob, saveJob } = useJobs();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    handleSearch();
  }, [searchTerm, locationFilter, levelFilter, jobTypeFilter]);

  const handleSearch = () => {
    fetchJobs({
      search: searchTerm,
      location: locationFilter,
      experienceLevel: levelFilter,
      jobType: jobTypeFilter,
    });
  };

  const handleApply = async (jobId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para se candidatar.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await applyToJob(jobId);
    if (error) {
      toast({
        title: "Erro ao candidatar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Candidatura enviada!",
        description: "Sua candidatura foi enviada com sucesso.",
      });
    }
  };

  const handleSaveJob = async (jobId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para salvar vagas.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await saveJob(jobId);
    if (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Vaga salva!",
        description: "A vaga foi adicionada aos seus favoritos.",
      });
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salário a combinar";
    if (min && max) return `R$ ${min.toLocaleString()} - R$ ${max.toLocaleString()}`;
    if (min) return `A partir de R$ ${min.toLocaleString()}`;
    return `Até R$ ${max?.toLocaleString()}`;
  };

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="São Paulo">São Paulo, SP</SelectItem>
                    <SelectItem value="Rio de Janeiro">Rio de Janeiro, RJ</SelectItem>
                    <SelectItem value="Belo Horizonte">Belo Horizonte, MG</SelectItem>
                    <SelectItem value="Porto Alegre">Porto Alegre, RS</SelectItem>
                    <SelectItem value="Remoto">Remoto</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="junior">Júnior</SelectItem>
                    <SelectItem value="pleno">Pleno</SelectItem>
                    <SelectItem value="senior">Sênior</SelectItem>
                    <SelectItem value="especialista">Especialista</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="remoto">Remoto</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
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

            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando vagas...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma vaga encontrada.</p>
              </div>
            ) : (
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
                        <div className="flex gap-2">
                          {job.is_featured && (
                            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                              <Star className="w-3 h-3 mr-1" />
                              Destaque
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveJob(job.id)}
                            className="p-2 hover:bg-primary-light"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags?.slice(0, 3).map((tag) => (
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
                          {formatSalary(job.salary_min, job.salary_max)}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            {new Date(job.created_at).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {job.contract_type.toUpperCase()}
                            </Badge>
                            {job.experience_level && (
                              <Badge variant="outline" className="text-xs">
                                {job.experience_level}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-primary hover:bg-primary-dark">
                          Ver Detalhes
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          onClick={() => handleApply(job.id)}
                        >
                          Candidatar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

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