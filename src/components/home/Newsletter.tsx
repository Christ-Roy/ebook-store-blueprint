
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Veuillez entrer une adresse email");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Merci pour votre inscription à notre newsletter !");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-brand-700 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Restez informé des nouvelles parutions
          </h2>
          <p className="text-lg mb-8 text-brand-100">
            Inscrivez-vous à notre newsletter et recevez en avant-première nos nouveautés, 
            promotions et conseils personnalisés.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              variant="secondary" 
              className="bg-white text-brand-700 hover:bg-brand-100 hover:text-brand-800"
            >
              {isSubmitting ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-brand-200">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
