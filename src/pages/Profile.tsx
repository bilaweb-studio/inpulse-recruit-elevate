import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  ArrowLeft
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const { id } = useParams();
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando perfil...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Perfil não encontrado</h2>
              <p className="text-muted-foreground mb-6">
                O perfil que você está procurando não existe ou foi removido.
              </p>
              <Link to="/vagas">
                <Button>Ver Vagas Disponíveis</Button>
              </Link>
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
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link to="/vagas" className="inline-flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Vagas
              </Link>
            </div>

            {/* Profile Header */}
            <Card className="mb-8 bg-gradient-card border-border/50 shadow-elegant">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {profile.full_name?.charAt(0) || <User className="w-8 h-8" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {profile.full_name}
                        </h1>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {profile.experience_level && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {profile.experience_level}
                            </Badge>
                          )}
                          {profile.available_for_work && (
                            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                              Disponível para trabalho
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2 text-muted-foreground">
                          {profile.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-primary" />
                              {profile.location}
                            </div>
                          )}
                          {profile.email && (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-primary" />
                              {profile.email}
                            </div>
                          )}
                          {profile.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-primary" />
                              {profile.phone}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {profile.salary_expectation && (
                          <Card className="bg-accent/5 border-accent/20 p-3">
                            <p className="text-sm text-muted-foreground">Expectativa Salarial</p>
                            <p className="font-semibold text-accent">
                              R$ {profile.salary_expectation.toLocaleString()}
                            </p>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                {(profile.linkedin_url || profile.github_url || profile.website_url) && (
                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
                    {profile.linkedin_url && (
                      <a 
                        href={profile.linkedin_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {profile.github_url && (
                      <a 
                        href={profile.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {profile.website_url && (
                      <a 
                        href={profile.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* About Section */}
              <div className="lg:col-span-2 space-y-6">
                {profile.bio && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.bio}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Skills */}
                {profile.skills && profile.skills.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Habilidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Contact Card */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Entre em Contato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      Interessado neste profissional? Entre em contato através dos canais disponíveis.
                    </p>
                    
                    <div className="space-y-3">
                      {profile.email && (
                        <Button 
                          className="w-full" 
                          onClick={() => window.location.href = `mailto:${profile.email}`}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar Email
                        </Button>
                      )}
                      
                      {profile.linkedin_url && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.open(profile.linkedin_url, '_blank')}
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                      )}
                    </div>

                    <div className="mt-6 p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;