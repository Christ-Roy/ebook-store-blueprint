
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Questions Fréquentes</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Comment télécharger mon eBook ?</h2>
              <p className="text-muted-foreground">
                Après votre achat, vous recevrez un email contenant un lien de téléchargement. Vous pouvez également retrouver tous vos eBooks dans votre espace membre, section "Mes achats".
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Quels formats d'eBooks proposez-vous ?</h2>
              <p className="text-muted-foreground">
                Nos eBooks sont disponibles aux formats PDF, EPUB et MOBI pour une compatibilité maximale avec tous les appareils de lecture.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Comment puis-je payer ?</h2>
              <p className="text-muted-foreground">
                Nous acceptons les paiements par carte bancaire (Visa, Mastercard) et PayPal. Toutes les transactions sont sécurisées.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Que faire en cas de problème de téléchargement ?</h2>
              <p className="text-muted-foreground">
                Si vous rencontrez des difficultés pour télécharger votre eBook, vous pouvez :
                <br />- Vérifier votre dossier spam/courrier indésirable
                <br />- Vous reconnecter à votre espace membre
                <br />- Contacter notre support client
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Puis-je lire mes eBooks sur plusieurs appareils ?</h2>
              <p className="text-muted-foreground">
                Oui, vous pouvez lire vos eBooks sur tous vos appareils. Cependant, nous vous demandons de respecter nos conditions d'utilisation et de ne pas partager vos fichiers.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Les eBooks sont-ils protégés contre la copie ?</h2>
              <p className="text-muted-foreground">
                Oui, nos eBooks sont protégés par des mesures techniques de protection des droits (DRM) et contiennent un filigrane unique.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
