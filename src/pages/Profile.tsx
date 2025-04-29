
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShieldCheck, BookOpen } from "lucide-react";
import { toast } from "sonner";
import ProfileLayout from "@/components/profile/ProfileLayout";
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import AdminTab from "@/components/profile/AdminTab";
import OrdersTab from "@/components/profile/OrdersTab";

type ProfileType = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
};

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error: any) {
        console.error("Erreur lors du chargement du profil :", error.message);
        toast.error("Impossible de charger les informations du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <ProfileLayout title="Mon Profil">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      ) : (
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Informations personnelles
            </TabsTrigger>
            {profile?.role === 'admin' && (
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Administration
              </TabsTrigger>
            )}
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Mes commandes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            {profile && <PersonalInfoTab profile={profile} setProfile={setProfile} />}
          </TabsContent>

          {profile?.role === 'admin' && (
            <TabsContent value="admin">
              <AdminTab />
            </TabsContent>
          )}

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
        </Tabs>
      )}
    </ProfileLayout>
  );
};

export default Profile;
