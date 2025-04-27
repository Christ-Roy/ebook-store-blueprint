import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { useAuth } from "@/context/AuthContext";

type AuthModalTab = "login" | "register" | "forgotPassword";

interface AuthModalProps {
  children: React.ReactNode;
  defaultTab?: AuthModalTab;
  onAuthSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  children,
  defaultTab = "login",
  onAuthSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthModalTab>(defaultTab);
  const { user } = useAuth();

  // Si l'utilisateur est déjà connecté, pas besoin d'afficher le modal
  if (user) {
    return <>{children}</>;
  }

  const handleSuccess = () => {
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    setOpen(false);
  };

  const handleSwitchToLogin = () => {
    setActiveTab("login");
  };

  const handleSwitchToRegister = () => {
    setActiveTab("register");
  };

  const handleSwitchToForgotPassword = () => {
    setActiveTab("forgotPassword");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === "login" && "Connexion"}
            {activeTab === "register" && "Inscription"}
            {activeTab === "forgotPassword" && "Mot de passe oublié"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login" && "Connectez-vous à votre compte pour accéder à vos ebooks"}
            {activeTab === "register" && "Créez un compte pour acheter et télécharger des ebooks"}
            {activeTab === "forgotPassword" && "Réinitialisez votre mot de passe"}
          </DialogDescription>
        </DialogHeader>

        {(activeTab === "login" || activeTab === "register") && (
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as AuthModalTab)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm
                onSuccess={handleSuccess}
                onRegisterClick={handleSwitchToRegister}
                onForgotPasswordClick={handleSwitchToForgotPassword}
              />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm
                onSuccess={handleSuccess}
                onLoginClick={handleSwitchToLogin}
              />
            </TabsContent>
          </Tabs>
        )}

        {activeTab === "forgotPassword" && (
          <ForgotPasswordForm
            onSuccess={handleSuccess}
            onBackToLoginClick={handleSwitchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
