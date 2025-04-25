
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Votre panier</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-4">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-8">
                Explorez notre catalogue et ajoutez des livres à votre panier.
              </p>
              <Button asChild>
                <Link to="/catalog">Parcourir le catalogue</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="border-b border-border px-6 py-4 bg-secondary/50">
                    <h2 className="font-semibold">Articles dans votre panier</h2>
                  </div>
                  
                  <div className="divide-y divide-border p-6">
                    {cart.map((item) => (
                      <CartItem
                        key={item.book.id}
                        item={item}
                        onRemove={removeFromCart}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}
                  </div>
                  
                  <div className="border-t border-border px-6 py-4 flex justify-end">
                    <Button variant="outline" onClick={clearCart}>
                      Vider le panier
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={getCartTotal()}
                  itemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
