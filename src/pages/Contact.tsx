import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageSquare, Users, Building2 } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Telefone",
      description: "(11) 3456-7890",
      detail: "Segunda a Sexta, 8h às 18h"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      description: "contato@inpulserh.com.br",
      detail: "Resposta em até 24h"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Endereço",
      description: "Av. Paulista, 1000 - São Paulo/SP",
      detail: "CEP: 01310-100"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Horário",
      description: "Segunda a Sexta: 8h às 18h",
      detail: "Sábado: 9h às 13h"
    }
  ];

  const supportAreas = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Suporte para Candidatos",
      description: "Ajuda com cadastro, candidaturas e planos"
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Suporte para Empresas",
      description: "Publicação de vagas, recrutamento e IA"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Suporte Técnico",
      description: "Problemas técnicos e funcionalidades"
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
              Entre em Contato
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Estamos Aqui para{" "}
              <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                Ajudar
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-primary-foreground/90">
              Nossa equipe está pronta para esclarecer suas dúvidas e ajudar você a aproveitar ao máximo a InPulse RH.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Formas de Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                      {method.icon}
                    </div>
                    <CardTitle className="text-lg text-foreground">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium mb-2">{method.description}</p>
                    <p className="text-muted-foreground text-sm">{method.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Envie sua Mensagem
                </h2>
                <p className="text-xl text-muted-foreground">
                  Preencha o formulário abaixo e entraremos em contato em breve
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Formulário de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Nome Completo
                        </label>
                        <Input placeholder="Seu nome completo" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email
                        </label>
                        <Input type="email" placeholder="seu@email.com" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Telefone
                        </label>
                        <Input placeholder="(11) 99999-9999" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Assunto
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o assunto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="candidate">Suporte Candidato</SelectItem>
                            <SelectItem value="company">Suporte Empresa</SelectItem>
                            <SelectItem value="technical">Suporte Técnico</SelectItem>
                            <SelectItem value="commercial">Comercial</SelectItem>
                            <SelectItem value="other">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Mensagem
                      </label>
                      <Textarea 
                        placeholder="Descreva sua dúvida ou solicitação..."
                        className="min-h-32"
                      />
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary-dark">
                      Enviar Mensagem
                    </Button>
                  </CardContent>
                </Card>

                {/* Support Areas */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Áreas de Suporte
                  </h3>
                  <div className="space-y-4">
                    {supportAreas.map((area, index) => (
                      <Card key={index} className="hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
                        <CardContent className="flex items-start space-x-4 p-6">
                          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                            {area.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">{area.title}</h4>
                            <p className="text-muted-foreground text-sm">{area.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* FAQ Link */}
                  <Card className="mt-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-semibold text-foreground mb-2">
                        Dúvidas Frequentes
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Talvez sua pergunta já tenha sido respondida
                      </p>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Ver FAQ
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nossa Localização
              </h2>
              <p className="text-muted-foreground">
                Visite nosso escritório no coração de São Paulo
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="bg-gradient-subtle h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      InPulse RH - Sede
                    </h3>
                    <p className="text-muted-foreground">
                      Av. Paulista, 1000 - Bela Vista<br />
                      São Paulo, SP - CEP: 01310-100
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;