
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { UserType } from "@/lib/supabase/client";

type ProfileType = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
        setFullName(data.full_name || "");
      } catch (error: any) {
        console.error("Erreur lors du chargement du profil :", error.message);
        toast.error("Impossible de charger les informations du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      toast.success("Profil mis à jour avec succès");
      if (profile) {
        setProfile({
          ...profile,
          full_name: fullName
        });
      }
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil :", error.message);
      toast.error("Impossible de mettre à jour le profil");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie");
    } catch (error: any) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container my-8">
        <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Chargement...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Gérez vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ""} disabled className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input 
                      id="fullName" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Rôle</Label>
                    <Input id="role" value={profile?.role || "utilisateur"} disabled className="mt-1" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleSignOut}>
                    Déconnexion
                  </Button>
                  <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                    {isUpdating ? "Mise à jour..." : "Mettre à jour"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mes commandes</CardTitle>
                  <CardDescription>Historique de vos achats</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Vous n'avez pas encore effectué d'achats.</p>
                </CardContent>
              </Card>
              
              {profile?.role === 'admin' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Administration</CardTitle>
                    <CardDescription>Panneau d'administration (réservé aux administrateurs)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">En tant qu'administrateur, vous avez accès à la gestion complète des ebooks.</p>
                    <Button>Gérer les ebooks</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
