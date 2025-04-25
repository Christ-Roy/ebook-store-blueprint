
import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/context/CartContext";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const { t, i18n } = useTranslation();
  const { book, quantity } = item;
  
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };

  const price = book.discountPrice ?? book.price;
  const totalPrice = price * quantity;

  return (
    <div className="flex py-6 border-b border-border">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <Link to={`/books/${book.id}`}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <Link to={`/books/${book.id}`} className="hover:text-primary">
              <h3>{book.title}</h3>
            </Link>
            <p className="ml-4 font-semibold">{formattedPrice(totalPrice)}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t('books.by')} {book.author}</p>
          <p className="mt-1 text-sm">{book.format}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(book.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(book.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(book.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4 mr-1" /> {t('cart.remove')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
