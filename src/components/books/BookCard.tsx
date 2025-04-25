
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Book, useCart } from "@/context/CartContext";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-all">
      <Link to={`/books/${book.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={book.coverImage}
            alt={`Couverture de ${book.title}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          {book.newRelease && (
            <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold py-1 px-2 rounded">
              Nouveau
            </div>
          )}
          {book.discountPrice && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded">
              Promo
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">par {book.author}</p>
          
          <div className="flex items-center justify-between">
            <div>
              {book.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">{formattedPrice(book.discountPrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formattedPrice(book.price)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-primary">{formattedPrice(book.price)}</span>
              )}
            </div>
            <Button
              size="sm"
              className="rounded-full h-8 w-8 p-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Ajouter au panier</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
