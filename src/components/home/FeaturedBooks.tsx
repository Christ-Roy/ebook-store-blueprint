
import React from "react";
import BookCard from "../books/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book } from "@/context/CartContext";

interface FeaturedBooksProps {
  books: Book[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const featuredBooks = books.filter(book => book.featured).slice(0, 4);
  const newReleases = books.filter(book => book.newRelease).slice(0, 4);

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Livres à la une</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/catalog">Voir tout le catalogue</Link>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Nouveautés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newReleases.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/catalog">Découvrir plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
