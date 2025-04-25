
import React from "react";
import BookCard from "./BookCard";
import { Book } from "@/context/CartContext";

interface BookGridProps {
  books: Book[];
  emptyMessage?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, emptyMessage = "Aucun livre trouvé" }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
