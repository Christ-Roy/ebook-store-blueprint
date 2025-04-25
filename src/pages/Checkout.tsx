
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName || 
        !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment process
    setTimeout(() => {
      toast.success("Paiement effectué avec succès! Vos eBooks sont prêts pour le téléchargement.");
      clearCart();
      navigate("/");
      setIsProcessing(false);
    }, 2000);
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  // Redirect to cart if cart is empty
  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Finaliser votre commande</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold mb-6">Informations de paiement</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Prénom"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Nom"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center mb-4">
                      <CreditCard className="mr-2 h-5 w-5" />
                      <h3 className="text-base font-medium">Carte de crédit</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Date d'expiration</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Traitement en cours..." : `Payer ${formattedPrice(getCartTotal())}`}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Vos informations de paiement sont sécurisées et chiffrées
                  </p>
                </form>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-secondary rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.book.id} className="flex justify-between py-2 border-b border-border/50">
                      <div>
                        <p className="font-medium">{item.book.title}</p>
                        <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {formattedPrice((item.book.discountPrice ?? item.book.price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formattedPrice(getCartTotal())}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Livraison gratuite pour les produits numériques
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
