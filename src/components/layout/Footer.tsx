
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <h3 className="text-xl font-bold">eBook Store</h3>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Votre boutique de livres numériques avec un contenu de qualité pour tous vos besoins d'apprentissage et de développement personnel.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">Accueil</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:underline">Catalogue</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">Panier</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Catégories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog?category=finance" className="hover:underline">Finance</Link>
              </li>
              <li>
                <Link to="/catalog?category=développement personnel" className="hover:underline">Développement personnel</Link>
              </li>
              <li>
                <Link to="/catalog?category=santé" className="hover:underline">Santé et Bien-être</Link>
              </li>
              <li>
                <Link to="/catalog?category=technologie" className="hover:underline">Technologie</Link>
              </li>
              <li>
                <Link to="/catalog?category=entreprenariat" className="hover:underline">Entreprenariat</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Informations légales</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:underline">Conditions générales de vente</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Mentions légales</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; {currentYear} eBook Store. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
