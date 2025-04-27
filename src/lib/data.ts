
import { Book } from "../context/CartContext";

export const books: Book[] = [
  {
    id: "1",
    title: "Comment investir en bourse pour débutants",
    author: "Marie Durand",
    description: "Un guide complet pour débuter en bourse, comprendre les marchés financiers et construire un portefeuille d'investissement rentable. Idéal pour les débutants qui souhaitent faire fructifier leur capital.",
    price: 19.99,
    discountPrice: 14.99,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "finance",
    featured: true,
    newRelease: true,
    rating: 4.8,
    pages: 245,
    format: "PDF, EPUB, MOBI",
    language: "Français",
    excerpt: "Chapitre 1: Comprendre les bases de la bourse\n\nAvant de se lancer dans l'investissement boursier, il est essentiel de comprendre comment fonctionne ce marché. La bourse est un marché où s'échangent des actions, qui représentent des parts de propriété dans des entreprises..."
  },
  {
    id: "2",
    title: "Méditation pour un esprit calme",
    author: "Lucas Martin",
    description: "Découvrez des techniques de méditation efficaces pour réduire le stress, améliorer votre concentration et retrouver la sérénité au quotidien.",
    price: 12.99,
    coverImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    category: "développement personnel",
    featured: true,
    rating: 4.6,
    pages: 180,
    format: "PDF, EPUB",
    language: "Français"
  },
  {
    id: "3",
    title: "Nutrition optimale pour une santé de fer",
    author: "Sophie Bernard",
    description: "Un guide pratique sur la nutrition équilibrée, avec des plans de repas et des conseils pour améliorer votre santé grâce à une alimentation adaptée à vos besoins.",
    price: 16.99,
    coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    category: "santé",
    rating: 4.7,
    pages: 215,
    format: "PDF, EPUB",
    language: "Français",
    newRelease: true
  },
  {
    id: "4",
    title: "50 Recettes healthy et gourmandes",
    author: "Emma Petit",
    description: "Découvrez 50 recettes délicieuses et équilibrées pour allier plaisir gustatif et alimentation saine. Chaque recette est accompagnée de sa valeur nutritionnelle et de conseils de préparation.",
    price: 14.99,
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "santé",
    rating: 4.5,
    pages: 120,
    format: "PDF",
    language: "Français"
  },
  {
    id: "5",
    title: "Programmation Python : guide complet",
    author: "Thomas Leroux",
    description: "Apprenez à programmer en Python depuis les bases jusqu'aux concepts avancés. Avec des exercices pratiques et des projets concrets à réaliser étape par étape.",
    price: 24.99,
    discountPrice: 19.99,
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "technologie",
    featured: true,
    rating: 4.9,
    pages: 350,
    format: "PDF, EPUB",
    language: "Français"
  },
  {
    id: "6",
    title: "La clé du succès entrepreneurial",
    author: "Nicolas Dubois",
    description: "Les stratégies et mentalités qui ont permis aux plus grands entrepreneurs de réussir. Un guide pour transformer votre idée en entreprise prospère.",
    price: 21.99,
    coverImage: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    category: "entreprenariat",
    rating: 4.7,
    pages: 280,
    format: "PDF, EPUB, MOBI",
    language: "Français",
    newRelease: true
  },
  {
    id: "7",
    title: "Marketing digital pour freelances",
    author: "Claire Moreau",
    description: "Apprenez à promouvoir efficacement vos services en ligne et à attirer des clients qualifiés grâce aux techniques de marketing digital adaptées aux indépendants.",
    price: 17.99,
    coverImage: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    category: "entreprenariat",
    rating: 4.6,
    pages: 210,
    format: "PDF, EPUB",
    language: "Français"
  },
  {
    id: "8",
    title: "L'art de la négociation efficace",
    author: "Philippe Lambert",
    description: "Maîtrisez l'art de la négociation dans toutes les situations professionnelles et personnelles. Techniques, stratégies et exercices pratiques pour devenir un négociateur redoutable.",
    price: 18.99,
    discountPrice: 15.99,
    coverImage: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    category: "développement personnel",
    featured: true,
    rating: 4.8,
    pages: 230,
    format: "PDF, EPUB",
    language: "Français"
  },
  {
    id: "9",
    title: "Intelligence Artificielle pour Entrepreneurs",
    author: "Matthieu Blanc",
    description: "Comment intégrer l'IA dans votre entreprise pour augmenter votre productivité, améliorer votre prise de décision et créer de nouveaux services innovants. Un guide stratégique sans jargon technique.",
    price: 29.99,
    discountPrice: 24.99,
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    category: "technologie",
    featured: true,
    newRelease: true,
    rating: 4.9,
    pages: 320,
    format: "PDF, EPUB, MOBI",
    language: "Français",
    excerpt: "Chapitre 1: L'IA comme levier de croissance\n\nL'intelligence artificielle n'est plus un concept futuriste réservé aux grandes entreprises technologiques. Aujourd'hui, des outils accessibles permettent même aux petites structures d'exploiter la puissance de l'IA pour transformer leur activité..."
  },
  {
    id: "10",
    title: "Crypto-monnaies : Guide d'investissement 2025",
    author: "Julien Mercier",
    description: "Une analyse complète du marché des crypto-monnaies en 2025, avec des stratégies d'investissement adaptées aux différents profils de risque. Inclut une présentation des technologies blockchain émergentes.",
    price: 22.99,
    coverImage: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d",
    category: "finance",
    rating: 4.7,
    pages: 285,
    format: "PDF, EPUB",
    language: "Français",
    newRelease: true
  },
  {
    id: "11",
    title: "Yoga thérapeutique : soigner son corps et son esprit",
    author: "Aurélie Renard",
    description: "Un guide complet de yoga thérapeutique avec des séquences adaptées à différentes problématiques de santé : stress, dos, sommeil, digestion. Inclut des illustrations détaillées et des conseils de pratique.",
    price: 18.99,
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    category: "santé",
    rating: 4.8,
    pages: 248,
    format: "PDF, EPUB",
    language: "Français"
  },
  {
    id: "12",
    title: "Devenir influent sur les réseaux sociaux",
    author: "Léa Martin",
    description: "Stratégies et techniques pour développer une communauté engagée et monétiser votre présence sur les réseaux sociaux. Adapté aux débutants comme aux créateurs de contenu expérimentés.",
    price: 16.99,
    discountPrice: 12.99,
    coverImage: "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa",
    category: "entreprenariat",
    featured: true,
    rating: 4.6,
    pages: 195,
    format: "PDF, EPUB",
    language: "Français"
  },
  {
    id: "13",
    title: "Copywriting Persuasif : L'art de vendre par les mots",
    author: "Antoine Dupuis",
    description: "Maîtrisez les techniques d'écriture persuasive pour créer des textes qui convertissent. Idéal pour les entrepreneurs, marketeurs et rédacteurs qui souhaitent améliorer l'efficacité de leurs messages.",
    price: 19.99,
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    category: "entreprenariat",
    rating: 4.7,
    pages: 230,
    format: "PDF, EPUB",
    language: "Français"
  },
  {
    id: "14",
    title: "Pleine conscience au quotidien",
    author: "Nathalie Klein",
    description: "Intégrez la pleine conscience dans votre vie de tous les jours avec des exercices pratiques de 5 à 15 minutes. Une approche accessible pour cultiver la sérénité malgré un emploi du temps chargé.",
    price: 14.99,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    category: "développement personnel",
    rating: 4.5,
    pages: 186,
    format: "PDF, EPUB, MOBI",
    language: "Français"
  },
  {
    id: "15",
    title: "Développement web moderne avec JavaScript",
    author: "Alexandre Moreau",
    description: "Un guide pratique couvrant JavaScript moderne (ES6+), React, et les API REST. Avec des projets concrets et des exemples de code commentés pour maîtriser le développement web frontend.",
    price: 27.99,
    discountPrice: 22.99,
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "technologie",
    rating: 4.8,
    pages: 415,
    format: "PDF, EPUB",
    language: "Français",
    newRelease: true
  },
  {
    id: "16",
    title: "Investissement immobilier rentable",
    author: "Pierre Rousseau",
    description: "Stratégies éprouvées pour investir dans l'immobilier avec un rendement optimal. Analyse de marché, financement, fiscalité et gestion locative expliqués de façon pragmatique.",
    price: 25.99,
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    category: "finance",
    rating: 4.9,
    pages: 330,
    format: "PDF, EPUB, MOBI",
    language: "Français",
    featured: true
  }
];

export const categories = [
  { id: "all", name: "Tous les livres" },
  { id: "finance", name: "Finance" },
  { id: "développement personnel", name: "Développement personnel" },
  { id: "santé", name: "Santé & Bien-être" },
  { id: "technologie", name: "Technologie" },
  { id: "entreprenariat", name: "Entreprenariat" }
];

export const testimonials = [
  {
    id: "1",
    name: "Alexandre M.",
    role: "Entrepreneur",
    content: "Les ebooks sur l'entreprenariat m'ont aidé à structurer ma démarche et à éviter les erreurs de débutant. Un investissement qui m'a fait gagner beaucoup de temps !",
    avatar: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a"
  },
  {
    id: "2",
    name: "Céline D.",
    role: "Coach sportive",
    content: "Les guides sur la nutrition sont complets et très pratiques. Mes clients adorent les conseils que j'ai pu adapter de ces livres.",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "3",
    name: "Julien P.",
    role: "Investisseur débutant",
    content: "Grâce au guide sur la bourse, j'ai enfin compris comment fonctionne l'investissement et j'ai pu créer mon premier portefeuille. Très clair même pour les novices !",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "4",
    name: "Sophie L.",
    role: "Consultante en marketing digital",
    content: "L'ebook sur l'IA pour entrepreneurs a complètement transformé ma façon d'aborder les projets clients. Des conseils concrets et applicables immédiatement.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: "5",
    name: "Thomas R.",
    role: "Développeur web freelance",
    content: "Le guide sur JavaScript moderne m'a permis de mettre à jour mes compétences et d'offrir de nouvelles solutions à mes clients. Une vraie mine d'or !",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6"
  }
];
