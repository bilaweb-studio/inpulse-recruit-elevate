import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PricingModal } from "@/components/modals/PricingModal";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileFormData {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  linkedin_url: string;
  github_url: string;
  website_url: string;
  skills: string[];
  experience_level: string;
  salary_expectation: string;
  available_for_work: boolean;
}

const CreateProfile = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [currentSkill, setCurrentSkill] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: profile?.full_name || "",
    email: profile?.email || user?.email || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    bio: profile?.bio || "",
    linkedin_url: profile?.linkedin_url || "",
    github_url: profile?.github_url || "",
    website_url: profile?.website_url || "",
    skills: profile?.skills || [],
    experience_level: profile?.experience_level || "",
    salary_expectation: profile?.salary_expectation?.toString() || "",
    available_for_work: profile?.available_for_work ?? true
  });

  const handleInputChange = (field: keyof ProfileFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const required = ['full_name', 'email', 'location'];
    return required.every(field => formData[field as keyof ProfileFormData]);
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
      const profileData = {
        ...formData,
        salary_expectation: formData.salary_expectation ? parseInt(formData.salary_expectation) : null,
        experience_level: formData.experience_level as 'junior' | 'pleno' | 'senior' | 'especialista' | undefined,
        user_id: user.id
      };

      const { error } = await updateProfile(profileData);

      if (error) throw error;

      if (plan === "basic") {
        toast({
          title: "Perfil atualizado!",
          description: "Seu perfil foi salvo com sucesso.",
        });
      } else {
        // Para plano premium, salvar indicação de perfil destacado
        localStorage.setItem('profileHighlighted', 'true');
        
        toast({
          title: "Perfil destacado ativado!",
          description: "Seu perfil agora aparece em destaque para as empresas.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar perfil",
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
              Você precisa estar logado para criar seu perfil.
            </p>
            <Link to="/candidato/login">
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
              {profile ? "Editar Perfil" : "Criar Perfil"}
            </h1>
            <p className="text-muted-foreground">
              Complete seu perfil para ser encontrado pelas melhores empresas
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nome e Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Nome Completo *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Telefone e Localização */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localização *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="São Paulo, SP"
                  />
                </div>
              </div>

              {/* Nível e Expectativa Salarial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience_level">Nível de Experiência</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => handleInputChange('experience_level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Júnior</SelectItem>
                      <SelectItem value="pleno">Pleno</SelectItem>
                      <SelectItem value="senior">Sênior</SelectItem>
                      <SelectItem value="especialista">Especialista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="salary_expectation">Expectativa Salarial (R$)</Label>
                  <Input
                    id="salary_expectation"
                    type="number"
                    value={formData.salary_expectation}
                    onChange={(e) => handleInputChange('salary_expectation', e.target.value)}
                    placeholder="5000"
                  />
                </div>
              </div>

              {/* Disponibilidade */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="available_for_work"
                  checked={formData.available_for_work}
                  onCheckedChange={(checked) => handleInputChange('available_for_work', checked)}
                />
                <Label htmlFor="available_for_work">
                  Disponível para novas oportunidades
                </Label>
              </div>

              {/* Links Profissionais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Links Profissionais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin_url">LinkedIn</Label>
                    <Input
                      id="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                      placeholder="https://linkedin.com/in/seuperfil"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github_url">GitHub</Label>
                    <Input
                      id="github_url"
                      value={formData.github_url}
                      onChange={(e) => handleInputChange('github_url', e.target.value)}
                      placeholder="https://github.com/seuusuario"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website_url">Website/Portfolio</Label>
                  <Input
                    id="website_url"
                    value={formData.website_url}
                    onChange={(e) => handleInputChange('website_url', e.target.value)}
                    placeholder="https://seuportfolio.com"
                  />
                </div>
              </div>

              {/* Habilidades */}
              <div>
                <Label>Habilidades e Tecnologias</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="Ex: React, Python, Design"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  />
                  <Button type="button" onClick={handleAddSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveSkill(skill)}>
                      {skill}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Sobre Você</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Conte um pouco sobre sua experiência, objetivos e o que te motiva profissionalmente..."
                  rows={4}
                />
              </div>

              {/* Botão de Envio */}
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={!validateForm() || isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? "Processando..." : "Salvar Perfil"}
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
            <PricingModal feature="curriculum" onPlanSelect={handlePlanSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProfile;