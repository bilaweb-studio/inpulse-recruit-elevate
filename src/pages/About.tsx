import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Missão",
      description: "Conectar talentos às melhores oportunidades através de tecnologia inovadora e processos eficientes."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Visão",
      description: "Ser a principal plataforma de recrutamento do Brasil, transformando a forma como empresas e candidatos se conectam."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Valores",
      description: "Transparência, inovação, excelência e compromisso com o sucesso de nossos clientes."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Tecnologia",
      description: "Utilizamos IA avançada para otimizar processos de recrutamento e melhorar a experiência de todos."
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
              Sobre a InPulse RH
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transformando o Futuro do{" "}
              <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                Recrutamento
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-primary-foreground/90">
              Desde 2020, conectamos empresas aos melhores talentos através de tecnologia inovadora e processos eficientes.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
                Nossa História
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  A InPulse RH nasceu da necessidade de revolucionar o mercado de recrutamento brasileiro. 
                  Fundada por especialistas em RH e tecnologia, nossa plataforma combina o melhor da inteligência 
                  artificial com a experiência humana para criar conexões verdadeiramente eficazes.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Com mais de 10.000 candidatos cadastrados e 500 empresas parceiras, já facilitamos milhares 
                  de contratações bem-sucedidas. Nosso diferencial está na personalização e na eficiência dos 
                  nossos processos, garantindo que cada vaga seja preenchida pelo candidato ideal.
                </p>
                <p className="text-lg leading-relaxed">
                  Hoje, somos reconhecidos como uma das principais plataformas de recrutamento do país, 
                  sempre inovando para oferecer a melhor experiência tanto para empresas quanto para candidatos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Nossos Números
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+10.000</div>
                <p className="text-muted-foreground">Candidatos Cadastrados</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+500</div>
                <p className="text-muted-foreground">Empresas Parceiras</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+1.500</div>
                <p className="text-muted-foreground">Vagas Publicadas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <p className="text-muted-foreground">Taxa de Satisfação</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;