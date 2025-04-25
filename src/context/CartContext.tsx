
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  discountPrice?: number;
  coverImage: string;
  category: string;
  featured?: boolean;
  newRelease?: boolean;
  rating?: number;
  pages?: number;
  format?: string;
  language?: string;
  excerpt?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('ebook-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ebook-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.book.id === book.id);
      
      if (existingItemIndex >= 0) {
        // Item already in cart, increase quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        toast.success(`${book.title} quantity increased in cart`);
        return newCart;
      } else {
        // Item not in cart, add it
        toast.success(`${book.title} added to cart`);
        return [...prevCart, { book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => {
      const bookToRemove = prevCart.find(item => item.book.id === bookId);
      if (bookToRemove) {
        toast.info(`${bookToRemove.book.title} removed from cart`);
      }
      return prevCart.filter((item) => item.book.id !== bookId);
    });
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.book.id === bookId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.book.discountPrice ?? item.book.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
