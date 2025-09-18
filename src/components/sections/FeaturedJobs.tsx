import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { JobDetailsModal } from "@/components/modals/JobDetailsModal";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const { jobs, loading } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  
  const featuredJobs = jobs.filter(job => job.is_featured).slice(0, 6);

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salário a combinar";
    if (min && max) return `R$ ${min.toLocaleString()} - R$ ${max.toLocaleString()}`;
    if (min) return `A partir de R$ ${min.toLocaleString()}`;
    return `Até R$ ${max?.toLocaleString()}`;
  };

  const getJobTypeLabel = (type: string) => {
    const types = {
      'presencial': 'Presencial',
      'remoto': 'Remoto',
      'hibrido': 'Híbrido'
    };
    return types[type as keyof typeof types] || type;
  };

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-secondary rounded w-full mb-2" />
                  <div className="h-3 bg-secondary rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <p className="text-primary font-medium">{job.company}</p>
                  </div>
                  {job.is_featured && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
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
                      {new Date(job.created_at).toLocaleDateString()}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {getJobTypeLabel(job.job_type)}
                    </Badge>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary-dark"
                  onClick={() => setSelectedJob(job)}
                >
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to="/vagas">
              Ver Todas as Vagas
            </Link>
          </Button>
        </div>

        <JobDetailsModal 
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      </div>
    </section>
  );
};

export default FeaturedJobs;