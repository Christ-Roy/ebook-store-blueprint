
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, BookOpen, Package, FileText, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { books } from "@/lib/data";
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const book = books.find((book) => book.id === id);
  
  if (!book) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-10">
          <div className="container">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-4">Livre non trouvé</h1>
              <p className="mb-8 text-muted-foreground">
                Désolé, le livre que vous recherchez n'existe pas.
              </p>
              <Button asChild>
                <Link to="/catalog">Retour au catalogue</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Accueil
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-primary">
                  Catalogue
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="font-medium text-foreground">{book.title}</li>
            </ol>
          </nav>

          {/* Book Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden border border-border p-4">
                <img
                  src={book.coverImage}
                  alt={`Couverture de ${book.title}`}
                  className="w-full h-auto object-cover rounded"
                />
                {book.newRelease && (
                  <div className="absolute top-6 left-6 bg-primary text-white px-3 py-1 text-sm font-semibold rounded">
                    Nouveau
                  </div>
                )}
              </div>
            </div>

            {/* Book Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">par {book.author}</p>
              
              {/* Rating */}
              {book.rating && (
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(book.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{book.rating}/5</span>
                </div>
              )}
              
              {/* Price */}
              <div className="mb-6">
                {book.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-primary mr-3">
                      {formattedPrice(book.discountPrice)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {formattedPrice(book.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    {formattedPrice(book.price)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-foreground mb-6">{book.description}</p>
              
              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{book.pages} pages</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{book.language}</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{book.format}</span>
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex flex-col space-y-4">
                <Button size="lg" onClick={handleAddToCart} className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au panier
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="#excerpt" className="w-full">Lire un extrait</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Book Excerpt */}
          {book.excerpt && (
            <div id="excerpt" className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Extrait du livre</h2>
              <div className="bg-secondary/50 p-6 rounded-lg border border-border">
                <p className="whitespace-pre-line">{book.excerpt}</p>
              </div>
              <div className="mt-8 flex justify-center">
                <Button onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Acheter maintenant
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
