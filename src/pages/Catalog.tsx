
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookGrid from "@/components/books/BookGrid";
import CategoryFilter from "@/components/books/CategoryFilter";
import { Input } from "@/components/ui/input";
import { books, categories } from "@/lib/data";
import { Book } from "@/context/CartContext";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId !== "all") {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  // Filter books based on selected category and search term
  useEffect(() => {
    let result = [...books];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(book => book.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(
        book =>
          book.title.toLowerCase().includes(searchTermLower) ||
          book.author.toLowerCase().includes(searchTermLower) ||
          book.description.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredBooks(result);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Catalogue</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Rechercher un livre..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <BookGrid
                books={filteredBooks}
                emptyMessage="Aucun livre ne correspond à vos critères de recherche."
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
