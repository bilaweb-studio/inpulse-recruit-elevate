import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Calendar,
  Eye
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { JobDetailsModal } from "@/components/modals/JobDetailsModal";
import type { Job } from "@/hooks/useJobs";

interface Application {
  id: string;
  job_id: string;
  user_id: string;
  status: string;
  applied_at: string;
  cover_letter?: string;
  jobs: Job;
}

const Applications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (*)
        `)
        .eq('user_id', user?.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications((data || []) as Application[]);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar suas candidaturas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviada':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'em_analise':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'aprovada':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejeitada':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'enviada':
        return 'Enviada';
      case 'em_analise':
        return 'Em Análise';
      case 'aprovada':
        return 'Aprovada';
      case 'rejeitada':
        return 'Rejeitada';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovada':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejeitada':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
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
                  <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <CardTitle className="text-2xl text-foreground">
                    Faça Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Você precisa estar logado para ver suas candidaturas.
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
                Candidaturas
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Suas Candidaturas
              </h1>
              <p className="text-muted-foreground">
                Acompanhe o status de todas as suas candidaturas
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando candidaturas...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Nenhuma candidatura
                </h2>
                <p className="text-muted-foreground mb-6">
                  Você ainda não se candidatou a nenhuma vaga. Explore nossas oportunidades!
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
                    {applications.length} candidatura{applications.length !== 1 ? 's' : ''} realizada{applications.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {applications.map((application) => (
                    <Card key={application.id} className="hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-1">
                                  {application.jobs.title}
                                </h3>
                                <p className="text-primary font-medium mb-2">
                                  {application.jobs.company}
                                </p>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                                    {application.jobs.location}
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign className="w-4 h-4 mr-1 text-success" />
                                    {formatSalary(application.jobs.salary_min, application.jobs.salary_max)}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                                    Candidatura em {new Date(application.applied_at).toLocaleDateString('pt-BR')}
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {application.jobs.contract_type.toUpperCase()}
                                  </Badge>
                                  {application.jobs.experience_level && (
                                    <Badge variant="outline" className="text-xs">
                                      {application.jobs.experience_level}
                                    </Badge>
                                  )}
                                  {application.jobs.tags?.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col lg:items-end gap-3">
                            <Badge variant="secondary" className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                              {getStatusIcon(application.status)}
                              {getStatusLabel(application.status)}
                            </Badge>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleJobDetails(application.jobs)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Ver Vaga
                              </Button>
                            </div>
                          </div>
                        </div>

                        {application.cover_letter && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium text-foreground mb-1">
                              Carta de Apresentação:
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {application.cover_letter}
                            </p>
                          </div>
                        )}
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

export default Applications;