
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, BookOpen } from "lucide-react";

const AdminTab: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <CardTitle>Administration</CardTitle>
        </div>
        <CardDescription>Gérez les ebooks et le contenu de la plateforme</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
          <p className="text-amber-700 font-medium">Vous disposez des droits d'administration complets sur la plateforme.</p>
          <p className="text-amber-600 text-sm mt-2">Utilisez cette section avec précaution car vos actions affectent l'ensemble du site.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Gestion des eBooks</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                Ajoutez, modifiez ou supprimez des ebooks du catalogue.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate("/admin/ebooks")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Gérer les ebooks
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                Consultez les statistiques des ventes et des utilisateurs.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                Fonctionnalité à venir
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTab;
