
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Search, BookOpen, Edit, ShieldCheck } from "lucide-react";

const EbookManager = () => {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (profile?.role !== "admin") {
          toast.error("Accès non autorisé. Seuls les administrateurs peuvent accéder à cette page.");
          navigate("/");
          return;
        }

        setIsAdmin(true);
      } catch (error: any) {
        console.error("Erreur lors de la vérification du rôle:", error.message);
        toast.error("Une erreur est survenue lors de la vérification de vos autorisations");
        navigate("/");
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchEbooks();
    }
  }, [isAdmin]);

  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ebooks")
        .select("*")
        .order("title");

      if (error) throw error;

      setEbooks(data || []);
    } catch (error: any) {
      console.error("Erreur lors du chargement des ebooks:", error.message);
      toast.error("Impossible de charger les ebooks");
    } finally {
      setLoading(false);
    }
  };

  const toggleEbookStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("ebooks")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Ebook ${!currentStatus ? "activé" : "désactivé"} avec succès`);
      
      // Mettre à jour la liste locale
      setEbooks(ebooks.map(ebook => 
        ebook.id === id ? { ...ebook, is_active: !currentStatus } : ebook
      ));
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du statut:", error.message);
      toast.error("Impossible de mettre à jour le statut de l'ebook");
    }
  };

  const filteredEbooks = ebooks.filter(ebook => 
    ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ebook.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container my-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ShieldCheck className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Gestion des Ebooks</h1>
          </div>
          <Button onClick={() => navigate("/profile")}>Retour au profil</Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recherche et filtres</CardTitle>
            <CardDescription>Recherchez des ebooks par titre, auteur ou catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center relative">
              <Search className="h-5 w-5 absolute left-3 text-muted-foreground" />
              <Input
                placeholder="Rechercher un ebook..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center my-12">
            <p>Chargement des ebooks...</p>
          </div>
        ) : (
          <Table>
            <TableCaption>Liste complète des ebooks - {filteredEbooks.length} résultats</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead className="text-center">Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEbooks.length > 0 ? (
                filteredEbooks.map((ebook) => (
                  <TableRow key={ebook.id}>
                    <TableCell className="font-medium">{ebook.title}</TableCell>
                    <TableCell>{ebook.author}</TableCell>
                    <TableCell>{ebook.category}</TableCell>
                    <TableCell>{ebook.price} €</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ebook.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {ebook.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleEbookStatus(ebook.id, ebook.is_active)}
                        >
                          {ebook.is_active ? 'Désactiver' : 'Activer'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/books/${ebook.ebook_id}`)}
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun ebook ne correspond à votre recherche
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EbookManager;
