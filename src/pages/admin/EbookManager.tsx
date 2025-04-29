
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, BookOpen, Edit, ShieldCheck, Plus, Filter, Trash2, Eye, DownloadCloud } from "lucide-react";

const EbookManager = () => {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
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
      
      // Extraire les catégories uniques
      const uniqueCategories = Array.from(
        new Set(data?.map(ebook => ebook.category) || [])
      );
      setCategories(uniqueCategories as string[]);
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

  const filterEbooks = () => {
    return ebooks.filter(ebook => {
      const matchesSearch = 
        ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory ? ebook.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredEbooks = filterEbooks();

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

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
            <h1 className="text-3xl font-bold">Administration des eBooks</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/profile")}>
              Retour au profil
            </Button>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un ebook
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous les ebooks</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="inactive">Inactifs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recherche et filtres</CardTitle>
                <CardDescription>Recherchez des ebooks par titre, auteur ou catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un ebook..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="w-full md:w-64">
                    <select 
                      className="w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm"
                      value={selectedCategory || ""}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                    >
                      <option value="">Toutes les catégories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button variant="outline" onClick={resetFilters} className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" /> 
                    Réinitialiser
                  </Button>
                </div>
              </CardContent>
            </Card>

            {renderEbookTable(filteredEbooks, loading)}
          </TabsContent>
          
          <TabsContent value="active">
            {renderEbookTable(
              ebooks.filter(ebook => ebook.is_active),
              loading
            )}
          </TabsContent>
          
          <TabsContent value="inactive">
            {renderEbookTable(
              ebooks.filter(ebook => !ebook.is_active),
              loading
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
  
  function renderEbookTable(books: any[], isLoading: boolean) {
    return (
      <>
        {isLoading ? (
          <div className="flex justify-center my-12">
            <p>Chargement des ebooks...</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableCaption>Liste des ebooks - {books.length} résultats</TableCaption>
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
                {books.length > 0 ? (
                  books.map((ebook) => (
                    <TableRow key={ebook.id}>
                      <TableCell className="font-medium">{ebook.title}</TableCell>
                      <TableCell>{ebook.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ebook.category}</Badge>
                      </TableCell>
                      <TableCell>{ebook.price} €</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={ebook.is_active ? "default" : "destructive"} className="w-20 justify-center">
                          {ebook.is_active ? 'Actif' : 'Inactif'}
                        </Badge>
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
                            size="icon"
                            onClick={() => navigate(`/books/${ebook.ebook_id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
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
          </div>
        )}
      </>
    );
  }
};

export default EbookManager;
