
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
        faq: 'FAQ',
        legal: 'Mentions légales',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions générales',
      },
      home: {
        hero: {
          title: 'Des eBooks qui transforment votre vie',
          subtitle: 'Découvrez notre collection de livres numériques premium pour développer vos compétences, améliorer votre bien-être et atteindre vos objectifs.',
          browse: 'Parcourir le catalogue',
          discover: 'Découvrir les nouveautés'
        },
        featured: 'Livres à la une',
        newReleases: 'Nouveautés',
        viewAll: 'Voir tout le catalogue',
        discoverMore: 'Découvrir plus',
        reviews: 'Ce que nos lecteurs disent'
      },
      books: {
        by: 'par',
        new: 'Nouveau',
        sale: 'Promo',
        addToCart: 'Ajouter au panier',
        notFound: 'Aucun livre trouvé',
        categories: 'Catégories'
      },
      cart: {
        summary: 'Récapitulatif de la commande',
        subtotal: 'Sous-total',
        items: 'élément',
        items_plural: 'éléments',
        shipping: 'Livraison',
        free: 'Gratuit',
        total: 'Total',
        checkout: 'Procéder au paiement',
        continueShopping: 'Continuer mes achats',
        empty: 'Votre panier est vide',
        remove: 'Retirer'
      },
      newsletter: {
        title: 'Restez informé des nouvelles parutions',
        subtitle: 'Inscrivez-vous à notre newsletter et recevez en avant-première nos nouveautés, promotions et conseils personnalisés.',
        placeholder: 'Votre adresse email',
        button: 'S\'inscrire',
        submitting: 'Inscription...',
        privacy: 'Nous respectons votre vie privée. Désabonnez-vous à tout moment.',
        success: 'Merci pour votre inscription à notre newsletter !',
        error: 'Veuillez entrer une adresse email'
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
      footer: {
        rights: 'Tous droits réservés',
        company: 'Notre entreprise',
        about: 'À propos',
        careers: 'Carrières',
        news: 'Actualités',
        legal: {
          title: 'Informations légales',
          terms: 'Conditions générales',
          privacy: 'Politique de confidentialité',
          legal: 'Mentions légales'
        },
        help: {
          title: 'Aide & Support',
          faq: 'FAQ',
          contact: 'Contact',
          shipping: 'Livraison',
          returns: 'Retours'
        }
      }
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        catalog: 'Catalog',
        contact: 'Contact',
        cart: 'Cart',
        faq: 'FAQ',
        legal: 'Legal Notice',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
      },
      home: {
        hero: {
          title: 'eBooks that transform your life',
          subtitle: 'Discover our collection of premium digital books to develop your skills, improve your well-being and achieve your goals.',
          browse: 'Browse catalog',
          discover: 'Discover new releases'
        },
        featured: 'Featured Books',
        newReleases: 'New Releases',
        viewAll: 'View all catalog',
        discoverMore: 'Discover more',
        reviews: 'What our readers say'
      },
      books: {
        by: 'by',
        new: 'New',
        sale: 'Sale',
        addToCart: 'Add to cart',
        notFound: 'No books found',
        categories: 'Categories'
      },
      cart: {
        summary: 'Order Summary',
        subtotal: 'Subtotal',
        items: 'item',
        items_plural: 'items',
        shipping: 'Shipping',
        free: 'Free',
        total: 'Total',
        checkout: 'Proceed to checkout',
        continueShopping: 'Continue shopping',
        empty: 'Your cart is empty',
        remove: 'Remove'
      },
      newsletter: {
        title: 'Stay informed of new releases',
        subtitle: 'Subscribe to our newsletter and receive previews of our new releases, promotions and personalized advice.',
        placeholder: 'Your email address',
        button: 'Subscribe',
        submitting: 'Subscribing...',
        privacy: 'We respect your privacy. Unsubscribe at any time.',
        success: 'Thank you for subscribing to our newsletter!',
        error: 'Please enter an email address'
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
      footer: {
        rights: 'All rights reserved',
        company: 'Our company',
        about: 'About us',
        careers: 'Careers',
        news: 'News',
        legal: {
          title: 'Legal Information',
          terms: 'Terms & Conditions',
          privacy: 'Privacy Policy',
          legal: 'Legal Notice'
        },
        help: {
          title: 'Help & Support',
          faq: 'FAQ',
          contact: 'Contact',
          shipping: 'Shipping',
          returns: 'Returns'
        }
      }
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
