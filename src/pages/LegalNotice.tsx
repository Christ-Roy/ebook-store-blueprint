
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const LegalNotice = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Informations légales</h2>
              <p className="text-muted-foreground">
                Le site eBook Store est édité par :<br />
                SARL eBook Store<br />
                123 Rue des Livres<br />
                75000 Paris, France<br />
                Capital social : 10 000€<br />
                RCS Paris B 123 456 789<br />
                N° TVA : FR 12 345 678 901
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Hébergement</h2>
              <p className="text-muted-foreground">
                Ce site est hébergé par :<br />
                Société d'hébergement<br />
                12 Rue de l'Internet<br />
                75001 Paris, France
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Protection des données personnelles</h2>
              <p className="text-muted-foreground">
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de modification et de suppression des données vous concernant. Pour exercer ce droit, veuillez nous contacter via notre formulaire de contact ou par courrier.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Cookies</h2>
              <p className="text-muted-foreground">
                Ce site utilise des cookies pour améliorer votre expérience de navigation. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur. Toute reproduction ou représentation totale ou partielle de ce site par quelque procédé que ce soit, sans autorisation expresse, est interdite et constituerait une contrefaçon.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotice;
