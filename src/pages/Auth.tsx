
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Auth = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bienvenue sur eBook Store</h1>
          <p className="text-muted-foreground mt-2">
            Connectez-vous ou créez un compte pour commencer
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onRegisterClick={() => setActiveTab("register")} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onLoginClick={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
