import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Check if there's a stored plan selection
    const selectedPlan = localStorage.getItem('selectedPlan');
    const featureType = localStorage.getItem('featureType');
    
    if (selectedPlan && featureType) {
      toast({
        title: "Pagamento realizado com sucesso!",
        description: `Seu ${featureType === 'curriculum' ? 'currículo' : 'vaga'} será destacado por 30 dias.`,
      });
      
      // Clean up localStorage
      localStorage.removeItem('selectedPlan');
      localStorage.removeItem('featureType');
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Pagamento Realizado com Sucesso!
            </CardTitle>
            <p className="text-muted-foreground">
              Seu destaque foi ativado e já está funcionando.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">O que acontece agora?</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>✅ Seu conteúdo aparecerá no topo das buscas</li>
                <li>✅ Receberá até 3x mais visualizações</li>
                <li>✅ Badge de destaque ativo por 30 dias</li>
                <li>✅ Suporte prioritário ativado</li>
              </ul>
            </div>

            {sessionId && (
              <div className="text-xs text-muted-foreground bg-secondary/20 rounded p-2">
                ID da Sessão: {sessionId}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/minha-conta">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Ir para Minha Conta
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;