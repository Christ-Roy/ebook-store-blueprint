
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        catalog: 'Catalogue',
        contact: 'Contact',
        cart: 'Panier',
      },
      faq: {
        title: 'Questions Fréquentes',
        download: {
          title: 'Comment télécharger mon eBook ?',
          content: 'Après votre achat, vous recevrez un email contenant un lien de téléchargement. Vous pouvez également retrouver tous vos eBooks dans votre espace membre, section "Mes achats".',
        },
        formats: {
          title: 'Quels formats d\'eBooks proposez-vous ?',
          content: 'Nos eBooks sont disponibles aux formats PDF, EPUB et MOBI pour une compatibilité maximale avec tous les appareils de lecture.',
        },
        payment: {
          title: 'Comment puis-je payer ?',
          content: 'Nous acceptons les paiements par carte bancaire (Visa, Mastercard) et PayPal. Toutes les transactions sont sécurisées.',
        },
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        catalog: 'Catalog',
        contact: 'Contact',
        cart: 'Cart',
      },
      faq: {
        title: 'Frequently Asked Questions',
        download: {
          title: 'How do I download my eBook?',
          content: 'After your purchase, you will receive an email containing a download link. You can also find all your eBooks in your member area, under "My Purchases" section.',
        },
        formats: {
          title: 'What eBook formats do you offer?',
          content: 'Our eBooks are available in PDF, EPUB, and MOBI formats for maximum compatibility with all reading devices.',
        },
        payment: {
          title: 'How can I pay?',
          content: 'We accept payments by credit card (Visa, Mastercard) and PayPal. All transactions are secure.',
        },
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
