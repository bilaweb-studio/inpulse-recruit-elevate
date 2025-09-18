import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Pagamento Cancelado
            </CardTitle>
            <p className="text-muted-foreground">
              Não se preocupe, nenhuma cobrança foi realizada.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Que tal tentar novamente?</h3>
              <p className="text-sm text-muted-foreground">
                Você ainda pode destacar seu conteúdo e ter 3x mais visualizações.
                O plano básico continua gratuito!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/minha-conta">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tentar Novamente
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

export default PaymentCanceled;