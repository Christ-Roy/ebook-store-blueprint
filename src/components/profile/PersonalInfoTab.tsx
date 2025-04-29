
import React, { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type ProfileType = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
};

type PersonalInfoTabProps = {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;
};

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ profile, setProfile }) => {
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [isUpdating, setIsUpdating] = useState(false);

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

  return (
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
            {profile?.role === 'admin' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full ml-2 flex items-center">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                Admin
              </div>
            )}
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
  );
};

export default PersonalInfoTab;
