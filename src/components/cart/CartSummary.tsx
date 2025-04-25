
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, itemCount, onCheckout }) => {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  // For this example, we'll assume zero shipping cost for digital products
  const shipping = 0;
  const total = subtotal;

  return (
    <div className="bg-secondary p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Récapitulatif de la commande</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sous-total ({itemCount} élément{itemCount > 1 ? "s" : ""})</span>
          <span>{formattedPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Livraison</span>
          <span>{shipping === 0 ? "Gratuit" : formattedPrice(shipping)}</span>
        </div>
        
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formattedPrice(total)}</span>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          size="lg" 
          onClick={onCheckout}
          disabled={itemCount === 0}
        >
          Procéder au paiement
        </Button>
        
        <div className="mt-4 text-center">
          <Link 
            to="/catalog" 
            className="text-sm text-primary hover:underline"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
