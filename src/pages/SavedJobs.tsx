import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star,
  ArrowLeft,
  Trash2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { JobDetailsModal } from "@/components/modals/JobDetailsModal";
import type { Job } from "@/hooks/useJobs";

interface SavedJob {
  id: string;
  job_id: string;
  saved_at: string;
  jobs: Job;
}

const SavedJobs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const fetchSavedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select(`
          *,
          jobs (*)
        `)
        .eq('user_id', user?.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;
      setSavedJobs((data || []) as SavedJob[]);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar suas vagas salvas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveJob = async (savedJobId: string) => {
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('id', savedJobId);

      if (error) throw error;

      setSavedJobs(prev => prev.filter(job => job.id !== savedJobId));
      toast({
        title: "Vaga removida",
        description: "A vaga foi removida dos seus favoritos.",
      });
    } catch (error) {
      console.error('Error unsaving job:', error);
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover a vaga dos favoritos.",
        variant: "destructive",
      });
    }
  };

  const handleJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salário a combinar";
    if (min && max) return `R$ ${min.toLocaleString()} - R$ ${max.toLocaleString()}`;
    if (min) return `A partir de R$ ${min.toLocaleString()}`;
    return `Até R$ ${max?.toLocaleString()}`;
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
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <CardTitle className="text-2xl text-foreground">
                    Faça Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Você precisa estar logado para ver suas vagas salvas.
                  </p>
                  <Link to="/candidato/login">
                    <Button className="w-full bg-primary hover:bg-primary-dark">
                      Fazer Login
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link to="/minha-conta" className="inline-flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Minha Conta
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4 text-primary border-primary">
                Vagas Salvas
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Suas Vagas Favoritas
              </h1>
              <p className="text-muted-foreground">
                Acompanhe as oportunidades que mais te interessam
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando vagas salvas...</p>
              </div>
            ) : savedJobs.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Nenhuma vaga salva
                </h2>
                <p className="text-muted-foreground mb-6">
                  Você ainda não salvou nenhuma vaga. Explore nossas oportunidades!
                </p>
                <Link to="/vagas">
                  <Button className="bg-primary hover:bg-primary-dark">
                    Explorar Vagas
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    {savedJobs.length} vaga{savedJobs.length !== 1 ? 's' : ''} salva{savedJobs.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {savedJobs.map((savedJob) => (
                    <Card key={savedJob.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                              {savedJob.jobs.title}
                            </CardTitle>
                            <p className="text-primary font-medium">{savedJob.jobs.company}</p>
                          </div>
                          <div className="flex gap-2">
                            {savedJob.jobs.is_featured && (
                              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                                <Star className="w-3 h-3 mr-1" />
                                Destaque
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnsaveJob(savedJob.id)}
                              className="p-2 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {savedJob.jobs.tags?.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {savedJob.jobs.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            {savedJob.jobs.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <DollarSign className="w-4 h-4 mr-2 text-success" />
                            {formatSalary(savedJob.jobs.salary_min, savedJob.jobs.salary_max)}
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                              Salva em {new Date(savedJob.saved_at).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {savedJob.jobs.contract_type.toUpperCase()}
                              </Badge>
                              {savedJob.jobs.experience_level && (
                                <Badge variant="outline" className="text-xs">
                                  {savedJob.jobs.experience_level}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-primary hover:bg-primary-dark"
                            onClick={() => handleJobDetails(savedJob.jobs)}
                          >
                            Ver Detalhes
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            Candidatar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
      <JobDetailsModal 
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SavedJobs;