import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  User, 
  Briefcase,
  Heart,
  Send,
  Star,
  X
} from "lucide-react";
import { Job } from "@/hooks/useJobs";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";
import { useToast } from "@/hooks/use-toast";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { applyToJob, saveJob } = useJobs();
  const { toast } = useToast();

  if (!job) return null;

  const handleApply = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para se candidatar a uma vaga.",
        variant: "destructive",
      });
      return;
    }

    setIsApplying(true);
    const { error } = await applyToJob(job.id, coverLetter);
    
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
      onClose();
    }
    setIsApplying(false);
  };

  const handleSaveJob = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para salvar vagas.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await saveJob(job.id);
    
    if (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Vaga salva!",
        description: "Vaga salva com sucesso em sua lista.",
      });
    }
    setIsSaving(false);
  };

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

  const getContractTypeLabel = (type: string) => {
    const types = {
      'clt': 'CLT',
      'pj': 'PJ',
      'estagio': 'Estágio',
      'freelancer': 'Freelancer'
    };
    return types[type as keyof typeof types] || type;
  };

  const getExperienceLevelLabel = (level?: string) => {
    if (!level) return "";
    const levels = {
      'junior': 'Junior',
      'pleno': 'Pleno',
      'senior': 'Sênior',
      'especialista': 'Especialista'
    };
    return levels[level as keyof typeof levels] || level;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative pb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex items-start justify-between pr-8">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {job.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-primary font-medium mb-4">
                <Building2 className="w-5 h-5" />
                {job.company}
              </div>
            </div>
            {job.is_featured && (
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                <Star className="w-3 h-3 mr-1" />
                Destaque
              </Badge>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-secondary/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">{formatSalary(job.salary_min, job.salary_max)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Publicado em {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{getJobTypeLabel(job.job_type)}</Badge>
            <Badge variant="outline">{getContractTypeLabel(job.contract_type)}</Badge>
            {job.experience_level && (
              <Badge variant="outline">{getExperienceLevelLabel(job.experience_level)}</Badge>
            )}
            {job.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Descrição da Vaga
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Requisitos
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Benefits */}
          {job.benefits && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Benefícios
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.benefits}
                  </p>
                </div>
              </div>
            </>
          )}

          {user && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Candidatar-se à Vaga</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="coverLetter">Carta de Apresentação (Opcional)</Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Conte um pouco sobre você e por que se interessa por esta vaga..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="min-h-[100px] mt-2"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleApply} 
                      disabled={isApplying}
                      className="flex-1"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isApplying ? "Enviando..." : "Enviar Candidatura"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleSaveJob}
                      disabled={isSaving}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {isSaving ? "Salvando..." : "Salvar Vaga"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {!user && (
            <>
              <Separator />
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  Faça login para se candidatar a esta vaga
                </p>
                <div className="flex gap-3 justify-center">
                  <Button asChild>
                    <a href="/candidato/login">Login como Candidato</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/empresa/login">Login como Empresa</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}