
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const OrdersTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>Mes commandes</CardTitle>
        </div>
        <CardDescription>Historique de vos achats</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Vous n'avez pas encore effectué d'achats.</p>
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
