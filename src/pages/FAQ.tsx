
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">{t('faq.title')}</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">{t('faq.download.title')}</h2>
              <p className="text-muted-foreground">
                {t('faq.download.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">{t('faq.formats.title')}</h2>
              <p className="text-muted-foreground">
                {t('faq.formats.content')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">{t('faq.payment.title')}</h2>
              <p className="text-muted-foreground">
                {t('faq.payment.content')}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
