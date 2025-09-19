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
import { ArrowLeft, Plus, X, Briefcase, GraduationCap, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

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
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}

const CreateProfile = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [currentSkill, setCurrentSkill] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  
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
    available_for_work: profile?.available_for_work ?? true,
    experiences: [],
    education: [],
    certifications: []
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

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false
    };
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      url: ""
    };
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
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

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={activeSection === "personal" ? "default" : "outline"}
              onClick={() => setActiveSection("personal")}
              size="sm"
            >
              Pessoal
            </Button>
            <Button 
              variant={activeSection === "experience" ? "default" : "outline"}
              onClick={() => setActiveSection("experience")}
              size="sm"
            >
              <Briefcase className="w-4 h-4 mr-1" />
              Experiência
            </Button>
            <Button 
              variant={activeSection === "education" ? "default" : "outline"}
              onClick={() => setActiveSection("education")}
              size="sm"
            >
              <GraduationCap className="w-4 h-4 mr-1" />
              Educação
            </Button>
            <Button 
              variant={activeSection === "certifications" ? "default" : "outline"}
              onClick={() => setActiveSection("certifications")}
              size="sm"
            >
              <Award className="w-4 h-4 mr-1" />
              Certificações
            </Button>
          </div>

          {/* Personal Information Section */}
          {activeSection === "personal" && (
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
            </CardContent>
          </Card>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Experiência Profissional</CardTitle>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.experiences.map((exp) => (
                  <Card key={exp.id} className="border-border/50">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Experiência {formData.experiences.indexOf(exp) + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeExperience(exp.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Empresa</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Nome da empresa"
                          />
                        </div>
                        <div>
                          <Label>Cargo</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            placeholder="Seu cargo"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Data de Início</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Data de Fim</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={exp.current}
                              onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                            />
                            <Label>Emprego atual</Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Descrição das atividades</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Descreva suas principais responsabilidades e conquistas..."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {formData.experiences.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma experiência adicionada ainda.</p>
                    <p className="text-sm">Clique em "Adicionar" para incluir sua experiência profissional.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          {activeSection === "education" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Formação Acadêmica</CardTitle>
                  <Button onClick={addEducation} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.education.map((edu) => (
                  <Card key={edu.id} className="border-border/50">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Formação {formData.education.indexOf(edu) + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeEducation(edu.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Instituição</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            placeholder="Nome da instituição"
                          />
                        </div>
                        <div>
                          <Label>Grau</Label>
                          <Select value={edu.degree} onValueChange={(value) => updateEducation(edu.id, 'degree', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o grau" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tecnico">Técnico</SelectItem>
                              <SelectItem value="graduacao">Graduação</SelectItem>
                              <SelectItem value="pos-graduacao">Pós-graduação</SelectItem>
                              <SelectItem value="mestrado">Mestrado</SelectItem>
                              <SelectItem value="doutorado">Doutorado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Área de Estudo</Label>
                        <Input
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          placeholder="Ex: Ciência da Computação, Administração..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Data de Início</Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Data de Conclusão</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            disabled={edu.current}
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={edu.current}
                              onCheckedChange={(checked) => updateEducation(edu.id, 'current', checked)}
                            />
                            <Label>Em andamento</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {formData.education.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma formação adicionada ainda.</p>
                    <p className="text-sm">Clique em "Adicionar" para incluir sua formação acadêmica.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Certifications Section */}
          {activeSection === "certifications" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Certificações</CardTitle>
                  <Button onClick={addCertification} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.certifications.map((cert) => (
                  <Card key={cert.id} className="border-border/50">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Certificação {formData.certifications.indexOf(cert) + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeCertification(cert.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Nome da Certificação</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                            placeholder="Ex: AWS Solutions Architect"
                          />
                        </div>
                        <div>
                          <Label>Emissor</Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                            placeholder="Ex: Amazon Web Services"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Data de Emissão</Label>
                          <Input
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>URL da Credencial (opcional)</Label>
                          <Input
                            value={cert.url || ""}
                            onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                            placeholder="https://credly.com/..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {formData.certifications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma certificação adicionada ainda.</p>
                    <p className="text-sm">Clique em "Adicionar" para incluir suas certificações.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex justify-center gap-4 pt-6">
            <Button 
              variant="outline"
              onClick={() => {
                if (activeSection === "personal") return;
                const sections = ["personal", "experience", "education", "certifications"];
                const currentIndex = sections.indexOf(activeSection);
                setActiveSection(sections[currentIndex - 1]);
              }}
              disabled={activeSection === "personal"}
            >
              Anterior
            </Button>
            
            {activeSection === "certifications" ? (
              <Button 
                onClick={handleSubmit}
                disabled={!validateForm() || isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Processando..." : "Salvar Perfil"}
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  const sections = ["personal", "experience", "education", "certifications"];
                  const currentIndex = sections.indexOf(activeSection);
                  setActiveSection(sections[currentIndex + 1]);
                }}
              >
                Próximo
              </Button>
            )}
          </div>
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