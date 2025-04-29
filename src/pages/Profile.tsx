
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import { User, ShieldCheck, BookOpen, LogOut } from "lucide-react";

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
  const navigate = useNavigate();

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
                <CardHeader className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <CardTitle>Informations personnelles</CardTitle>
                  </div>
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
                    <div className="flex items-center mt-1">
                      <Input 
                        id="role" 
                        value={profile?.role || "utilisateur"} 
                        disabled 
                        className={`${profile?.role === 'admin' ? 'text-primary font-medium' : ''}`}
                      />
                      {profile?.role === 'admin' && <ShieldCheck className="h-5 w-5 text-primary ml-2" />}
                    </div>
                    {profile?.role === 'admin' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Vous avez les privilèges d'administration sur la plateforme.
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleSignOut} className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                  <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                    {isUpdating ? "Mise à jour..." : "Mettre à jour"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              {profile?.role === 'admin' && (
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <CardTitle>Administration</CardTitle>
                    </div>
                    <CardDescription>Panneau d'administration des ebooks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">En tant qu'administrateur, vous avez accès à la gestion complète des ebooks.</p>
                    <Button 
                      onClick={() => navigate("/admin/ebooks")}
                      className="flex items-center"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Gérer les ebooks
                    </Button>
                  </CardContent>
                </Card>
              )}

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
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
