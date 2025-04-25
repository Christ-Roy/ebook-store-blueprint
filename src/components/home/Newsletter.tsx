
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t('newsletter.error'));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t('newsletter.success'));
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-brand-700 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg mb-8 text-brand-100">
            {t('newsletter.subtitle')}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
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
              {isSubmitting ? t('newsletter.submitting') : t('newsletter.button')}
            </Button>
          </form>
          <p className="mt-4 text-sm text-brand-200">
            {t('newsletter.privacy')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
