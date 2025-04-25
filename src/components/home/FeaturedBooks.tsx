
import React from "react";
import BookCard from "../books/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book } from "@/context/CartContext";
import { useTranslation } from "react-i18next";

interface FeaturedBooksProps {
  books: Book[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const { t } = useTranslation();
  const featuredBooks = books.filter(book => book.featured).slice(0, 4);
  const newReleases = books.filter(book => book.newRelease).slice(0, 4);

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('home.featured')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/catalog">{t('home.viewAll')}</Link>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{t('home.newReleases')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newReleases.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/catalog">{t('home.discoverMore')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
