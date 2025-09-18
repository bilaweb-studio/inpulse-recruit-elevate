import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface PricingModalProps {
  onPlanSelect: (plan: string) => void;
  feature: "curriculum" | "vaga";
}

export function PricingModal({ onPlanSelect, feature }: PricingModalProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "Grátis",
      description: feature === "curriculum" ? "Currículo padrão" : "Vaga padrão",
      features: [
        feature === "curriculum" ? "Perfil público básico" : "Publicação por 30 dias",
        "Busca padrão",
        "Suporte por email",
        feature === "curriculum" ? "1 currículo ativo" : "Candidatos ilimitados"
      ],
      icon: Check,
      buttonText: "Publicar Grátis",
      highlighted: false
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 29,99",
      description: feature === "curriculum" ? "Currículo em destaque" : "Vaga em destaque",
      features: [
        feature === "curriculum" ? "Perfil destacado por 30 dias" : "Vaga destacada por 30 dias",
        "Aparece no topo das buscas",
        "3x mais visualizações",
        "Badge de destaque",
        "Suporte prioritário"
      ],
      icon: Star,
      buttonText: "Destacar Agora",
      highlighted: true
    }
  ];

  const handlePlanSelect = async (planId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (planId === "basic") {
      onPlanSelect("basic");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-highlight-payment');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
        // Store the plan selection in localStorage to handle after payment
        localStorage.setItem('selectedPlan', planId);
        localStorage.setItem('featureType', feature);
      }
    } catch (error) {
      toast({
        title: "Erro ao processar pagamento",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-gradient-primary text-primary-foreground hover:opacity-90"
          asChild
        >
          <Link to={feature === "curriculum" ? "/criar-perfil" : "/criar-vaga"}>
            <Zap className="w-4 h-4 mr-2" />
            {feature === "curriculum" ? "Criar Currículo" : "Publicar Vaga"}
          </Link>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Escolha seu Plano
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            {feature === "curriculum" 
              ? "Destaque seu perfil e seja encontrado pelas melhores empresas"
              : "Destaque sua vaga e encontre os melhores candidatos"
            }
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-200 hover:shadow-lg ${
                  plan.highlighted 
                    ? 'border-primary shadow-card ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1">
                      <Crown className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-gradient-primary text-primary-foreground hover:opacity-90' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={loading}
                  >
                    {loading ? "Processando..." : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>💳 Pagamento seguro processado pelo Stripe</p>
          <p>🔒 Seus dados estão protegidos</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}