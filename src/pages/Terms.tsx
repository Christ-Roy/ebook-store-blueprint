
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Article 1 - Objet</h2>
              <p className="text-muted-foreground">
                Les présentes conditions générales de vente régissent les ventes de livres numériques (eBooks) par la société eBook Store. Toute commande implique l'acceptation des présentes conditions générales de vente.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Article 2 - Prix</h2>
              <p className="text-muted-foreground">
                Les prix de nos produits sont indiqués en euros toutes taxes comprises. Les prix affichés sont valables tant qu'ils sont visibles sur le site, dans la limite des stocks disponibles. Nous nous réservons le droit de modifier les prix à tout moment.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Article 3 - Commande</h2>
              <p className="text-muted-foreground">
                La commande est définitive après confirmation du paiement. Un email de confirmation vous sera envoyé contenant les détails de votre commande et les instructions de téléchargement de vos eBooks.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Article 4 - Paiement</h2>
              <p className="text-muted-foreground">
                Le paiement s'effectue en ligne par carte bancaire ou PayPal. Toutes les transactions sont sécurisées. Nous n'avons jamais accès à vos informations bancaires.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Article 5 - Livraison</h2>
              <p className="text-muted-foreground">
                La livraison des eBooks s'effectue immédiatement après confirmation du paiement, par mise à disposition d'un lien de téléchargement et/ou envoi par email.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Article 6 - Droit de rétractation</h2>
              <p className="text-muted-foreground">
                Conformément à l'article L221-28 13° du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques fournis sur un support immatériel dont l'exécution a commencé après accord préalable exprès du consommateur.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
