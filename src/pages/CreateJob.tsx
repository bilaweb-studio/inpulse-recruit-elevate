import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PricingModal } from "@/components/modals/PricingModal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

interface JobFormData {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  benefits: string;
  salary_min: string;
  salary_max: string;
  job_type: string;
  contract_type: string;
  experience_level: string;
  tags: string[];
}

const CreateJob = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentTag, setCurrentTag] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    benefits: "",
    salary_min: "",
    salary_max: "",
    job_type: "presencial",
    contract_type: "clt",
    experience_level: "",
    tags: []
  });

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const required = ['title', 'company', 'location', 'description'];
    return required.every(field => formData[field as keyof JobFormData]);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setShowPricing(true);
  };

  const handlePlanSelect = async (plan: string) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const jobData = {
        ...formData,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
        is_featured: plan === "premium",
        is_active: true
      };

      if (plan === "basic") {
        // Criar vaga gratuita diretamente
        const { error } = await supabase
          .from('jobs')
          .insert([jobData]);

        if (error) throw error;

        toast({
          title: "Vaga publicada!",
          description: "Sua vaga foi publicada com sucesso.",
        });
      } else {
        // Para plano premium, salvar dados temporariamente e redirecionar para pagamento
        localStorage.setItem('pendingJobData', JSON.stringify(jobData));
        
        toast({
          title: "Redirecionando para pagamento",
          description: "Complete o pagamento para destacar sua vaga.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao publicar vaga",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowPricing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Login necessário</h2>
            <p className="text-muted-foreground mb-4">
              Você precisa estar logado para criar uma vaga.
            </p>
            <Link to="/empresa/login">
              <Button>Fazer Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/minha-conta" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Minha Conta
            </Link>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Criar Nova Vaga
            </h1>
            <p className="text-muted-foreground">
              Preencha as informações da vaga para encontrar os melhores candidatos
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações da Vaga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Título e Empresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título da Vaga *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Desenvolvedor React Sênior"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Empresa *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              {/* Localização */}
              <div>
                <Label htmlFor="location">Localização *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Ex: São Paulo, SP ou Remoto"
                />
              </div>

              {/* Tipo e Contrato */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="job_type">Tipo de Trabalho</Label>
                  <Select value={formData.job_type} onValueChange={(value) => handleInputChange('job_type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="remoto">Remoto</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="contract_type">Tipo de Contrato</Label>
                  <Select value={formData.contract_type} onValueChange={(value) => handleInputChange('contract_type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clt">CLT</SelectItem>
                      <SelectItem value="pj">PJ</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="estagio">Estágio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experience_level">Nível de Experiência</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => handleInputChange('experience_level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Júnior</SelectItem>
                      <SelectItem value="pleno">Pleno</SelectItem>
                      <SelectItem value="senior">Sênior</SelectItem>
                      <SelectItem value="especialista">Especialista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Salário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary_min">Salário Mínimo (R$)</Label>
                  <Input
                    id="salary_min"
                    type="number"
                    value={formData.salary_min}
                    onChange={(e) => handleInputChange('salary_min', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="salary_max">Salário Máximo (R$)</Label>
                  <Input
                    id="salary_max"
                    type="number"
                    value={formData.salary_max}
                    onChange={(e) => handleInputChange('salary_max', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Tecnologias e Habilidades</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Ex: React, TypeScript, Node.js"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="description">Descrição da Vaga *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva as responsabilidades, atividades e objetivos da posição..."
                  rows={4}
                />
              </div>

              {/* Requisitos */}
              <div>
                <Label htmlFor="requirements">Requisitos</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="Liste os requisitos técnicos e experiências necessárias..."
                  rows={3}
                />
              </div>

              {/* Benefícios */}
              <div>
                <Label htmlFor="benefits">Benefícios</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) => handleInputChange('benefits', e.target.value)}
                  placeholder="Vale refeição, plano de saúde, home office, etc..."
                  rows={3}
                />
              </div>

              {/* Botão de Envio */}
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={!validateForm() || isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? "Processando..." : "Publicar Vaga"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Preços */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <PricingModal feature="vaga" onPlanSelect={handlePlanSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJob;