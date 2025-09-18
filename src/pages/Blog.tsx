import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Search, TrendingUp, Star } from "lucide-react";

const Blog = () => {
  const categories = ["Todos", "Carreira", "RH", "Tecnologia", "Mercado", "Dicas"];
  
  const featuredPost = {
    id: 1,
    title: "Como a IA está transformando o recrutamento em 2024",
    excerpt: "Descubra as principais tendências e tecnologias que estão revolucionando a forma como empresas encontram e contratam talentos.",
    author: "Maria Silva",
    date: "15 de Janeiro, 2024",
    readTime: "8 min de leitura",
    category: "Tecnologia",
    image: "/placeholder-blog-1.jpg",
    featured: true
  };

  const posts = [
    {
      id: 2,
      title: "10 perguntas essenciais para entrevistas de emprego",
      excerpt: "Prepare-se para sua próxima entrevista com estas perguntas fundamentais que todo candidato deve saber responder.",
      author: "João Santos",
      date: "12 de Janeiro, 2024",
      readTime: "5 min de leitura",
      category: "Carreira",
      image: "/placeholder-blog-2.jpg"
    },
    {
      id: 3,
      title: "Tendências do mercado de trabalho para 2024",
      excerpt: "Análise completa das principais tendências que vão moldar o mercado de trabalho brasileiro neste ano.",
      author: "Ana Costa",
      date: "10 de Janeiro, 2024",
      readTime: "12 min de leitura",
      category: "Mercado",
      image: "/placeholder-blog-3.jpg"
    },
    {
      id: 4,
      title: "Como criar um currículo que se destaca",
      excerpt: "Dicas práticas para criar um currículo atrativo e conquistar a atenção dos recrutadores.",
      author: "Carlos Oliveira",
      date: "8 de Janeiro, 2024",
      readTime: "6 min de leitura",
      category: "Carreira",
      image: "/placeholder-blog-4.jpg"
    },
    {
      id: 5,
      title: "Employee Experience: O futuro do RH",
      excerpt: "Entenda como a experiência do funcionário se tornou fundamental para o sucesso das empresas.",
      author: "Fernanda Lima",
      date: "5 de Janeiro, 2024",
      readTime: "10 min de leitura",
      category: "RH",
      image: "/placeholder-blog-5.jpg"
    },
    {
      id: 6,
      title: "Soft Skills mais valorizadas em 2024",
      excerpt: "Conheça as habilidades comportamentais que as empresas mais buscam nos candidatos atualmente.",
      author: "Ricardo Mendes",
      date: "3 de Janeiro, 2024",
      readTime: "7 min de leitura",
      category: "Carreira",
      image: "/placeholder-blog-6.jpg"
    },
    {
      id: 7,
      title: "Gestão de talentos em tempos de mudança",
      excerpt: "Estratégias eficazes para reter e desenvolver talentos em um mercado cada vez mais competitivo.",
      author: "Patrícia Rocha",
      date: "1 de Janeiro, 2024",
      readTime: "9 min de leitura",
      category: "RH",
      image: "/placeholder-blog-7.jpg"
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
              Blog InPulse RH
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Insights e{" "}
              <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                Tendências
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-primary-foreground/90">
              Mantenha-se atualizado com as últimas novidades do mundo do RH, carreira e mercado de trabalho.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar artigos..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais Recentes</SelectItem>
                    <SelectItem value="popular">Mais Populares</SelectItem>
                    <SelectItem value="trending">Em Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Artigo em Destaque</h2>
            </div>
            
            <Card className="hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gradient-subtle h-64 lg:h-auto flex items-center justify-center">
                  <div className="text-center p-8">
                    <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Imagem do artigo em destaque</p>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <Badge className="mb-4 bg-accent text-accent-foreground">
                    {featuredPost.category}
                  </Badge>
                  <CardTitle className="text-2xl lg:text-3xl text-foreground mb-4 hover:text-primary transition-colors cursor-pointer">
                    {featuredPost.title}
                  </CardTitle>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary-dark">
                    Ler Artigo Completo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Últimos Artigos
              </h2>
              <Select defaultValue="recent">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="popular">Mais Populares</SelectItem>
                  <SelectItem value="trending">Em Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 overflow-hidden">
                  <div className="bg-gradient-subtle h-48 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">Imagem do artigo</p>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-lg font-semibold text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                      <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Ler Mais
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Carregar Mais Artigos
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Não perca nenhuma novidade
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Assine nossa newsletter e receba os melhores conteúdos sobre carreira e RH diretamente no seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Seu melhor email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Assinar
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;