
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, LogIn, User, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const itemCount = getCartItemsCount();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    if (user) {
      const checkAdminStatus = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        
        if (!error && data) {
          setIsAdmin(data.role === 'admin');
        }
      };
      
      checkAdminStatus();
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">eBook</span>
            <span className="text-2xl font-bold">Store</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.catalog')}
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.contact')}
          </Link>
          <Link to="/faq" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.faq')}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          {user ? (
            <>
              <Link to="/profile" className="flex items-center space-x-1 hover:text-primary transition-colors">
                {isAdmin ? (
                  <div className="flex items-center">
                    <Badge variant="outline" className="flex items-center gap-1 border-primary">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="hidden md:inline text-primary font-medium">
                        {t('nav.admin')}
                      </span>
                    </Badge>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline ml-1">{t('nav.profile')}</span>
                  </div>
                )}
              </Link>
            </>
          ) : (
            <Link to="/auth" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <LogIn className="h-5 w-5" />
              <span className="hidden md:inline">{t('nav.login')}</span>
            </Link>
          )}
          
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-16 z-40 w-full overflow-y-auto bg-white pb-12 md:hidden",
          {
            "block animate-in fade-in": isMenuOpen,
            "hidden": !isMenuOpen,
          }
        )}
      >
        <div className="space-y-4 px-6 py-8">
          <div className="space-y-1">
            <Link
              to="/"
              className="block py-3 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/catalog"
              className="block py-3 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.catalog')}
            </Link>
            <Link
              to="/contact"
              className="block py-3 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <Link
              to="/faq"
              className="block py-3 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.faq')}
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="block py-3 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {isAdmin ? (
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-medium">{t('nav.admin')}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span>{t('nav.profile')}</span>
                  </div>
                )}
              </Link>
            ) : (
              <Link
                to="/auth"
                className="block py-3 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
