
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, itemCount, onCheckout }) => {
  const { t, i18n } = useTranslation();

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };

  // For this example, we'll assume zero shipping cost for digital products
  const shipping = 0;
  const total = subtotal;

  return (
    <div className="bg-secondary p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">{t('cart.summary')}</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {t('cart.subtotal')} ({itemCount} {itemCount > 1 ? t('cart.items_plural') : t('cart.items')})
          </span>
          <span>{formattedPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('cart.shipping')}</span>
          <span>{shipping === 0 ? t('cart.free') : formattedPrice(shipping)}</span>
        </div>
        
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between font-semibold">
            <span>{t('cart.total')}</span>
            <span>{formattedPrice(total)}</span>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          size="lg" 
          onClick={onCheckout}
          disabled={itemCount === 0}
        >
          {t('cart.checkout')}
        </Button>
        
        <div className="mt-4 text-center">
          <Link 
            to="/catalog" 
            className="text-sm text-primary hover:underline"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
