
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Collecte des données</h2>
              <p className="text-muted-foreground">
                Nous collectons les informations que vous nous fournissez directement, notamment lors de la création de votre compte, de vos achats ou de vos interactions avec notre service client. Ces informations peuvent inclure votre nom, adresse email, et informations de paiement.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Utilisation des données</h2>
              <p className="text-muted-foreground">
                Nous utilisons vos données personnelles pour :<br />
                - Gérer votre compte et vos commandes<br />
                - Vous fournir un support client<br />
                - Vous envoyer des communications marketing (avec votre consentement)<br />
                - Améliorer nos services<br />
                - Respecter nos obligations légales
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Protection des données</h2>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Ces mesures incluent le chiffrement des données, des pare-feu et des contrôles d'accès stricts.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Vos droits</h2>
              <p className="text-muted-foreground">
                Vous avez le droit de :<br />
                - Accéder à vos données personnelles<br />
                - Rectifier vos données<br />
                - Supprimer vos données<br />
                - Vous opposer au traitement<br />
                - Retirer votre consentement<br />
                Pour exercer ces droits, contactez-nous via notre formulaire de contact.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
