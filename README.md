# Ebook Store Blueprint

Un système complet de vente et distribution d'ebooks avec gestion sécurisée des téléchargements.

![Aperçu du projet](https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## 🌟 Fonctionnalités

- **Catalogue d'ebooks** avec recherche, filtrage et pagination
- **Panier d'achat** et processus de commande complet
- **Système de paiement sécurisé** via Stripe/PayPal
- **Distribution automatique** des ebooks après achat
- **Liens de téléchargement temporaires et sécurisés** (valides 48h)
- **Limitation du nombre de téléchargements** (max 3 par défaut)
- **Emails automatiques** avec instructions de téléchargement
- **Interface administrateur** pour gérer les ebooks et les commandes
- **Multi-langue** (français et anglais)
- **Responsive design** pour tous les appareils

## 🛠️ Technologies utilisées

### Frontend
- **React** avec TypeScript
- **Vite** pour le bundling
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **React Router** pour la navigation
- **React Context** pour la gestion d'état

### Backend
- **Node.js** avec Express
- **MongoDB** pour la base de données
- **JWT** pour l'authentification
- **Nodemailer** pour l'envoi d'emails
- **Mongoose** pour l'ORM
- **Bcrypt** pour le hachage des mots de passe

## 📋 Prérequis

- Node.js (v18+)
- MongoDB (local ou Atlas)
- Un compte SMTP pour l'envoi d'emails (ex: Gmail, SendGrid)
- Un compte Stripe ou PayPal pour les paiements (en production)

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Christ-Roy/ebook-store-blueprint.git
cd ebook-store-blueprint
```

### 2. Installation des dépendances

```bash
# Installation des dépendances frontend
npm install

# Installation des dépendances backend
cd server
npm install
cd ..
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env` dans le dossier `server` en vous basant sur le fichier `.env.example` :

```bash
cp server/.env.example server/.env
```

Modifiez le fichier `.env` avec vos propres paramètres :

```
# Configuration du serveur
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ebook-store

# JWT
JWT_SECRET=votre_clé_secrète_très_longue_et_aléatoire
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN=30

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=Ebook Store <votre-email@gmail.com>

# Téléchargements
DOWNLOAD_LINK_EXPIRY=48h
MAX_DOWNLOADS=3

# URL frontend
FRONTEND_URL=http://localhost:3000

# Chemin des ebooks
EBOOKS_PATH=../assets/ebooks
```

### 4. Initialisation de la base de données avec les ebooks

```bash
# Démarrer le serveur
cd server
npm start

# Dans un autre terminal, importer les ebooks
curl -X POST http://localhost:5000/api/ebooks/import
```

Ou bien connectez-vous en tant qu'administrateur et utilisez l'interface d'administration pour importer les ebooks.

### 5. Démarrer l'application

```bash
# Dans un terminal, démarrer le serveur backend
cd server
npm run dev

# Dans un autre terminal, démarrer le frontend
npm run dev
```

L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
ebook-store-blueprint/
├── assets/                # Ressources statiques
│   └── ebooks/            # Fichiers des ebooks
│       ├── content/       # Contenu des ebooks (PDF, EPUB)
│       ├── covers/        # Images de couverture
│       └── metadata/      # Métadonnées des ebooks (JSON)
├── public/                # Fichiers publics frontend
├── server/                # Backend Node.js/Express
│   ├── controllers/       # Contrôleurs API
│   ├── middlewares/       # Middlewares
│   ├── models/            # Modèles Mongoose
│   ├── routes/            # Routes API
│   └── utils/             # Utilitaires
├── src/                   # Frontend React
│   ├── components/        # Composants React
│   ├── context/           # Contextes React
│   ├── hooks/             # Hooks personnalisés
│   ├── i18n/              # Traductions
│   ├── lib/               # Bibliothèques et utilitaires
│   └── pages/             # Pages/routes de l'application
└── README.md              # Documentation
```

## 🔒 Système de distribution d'ebooks

### Fonctionnement

1. **Après l'achat** : Lorsqu'un utilisateur achète un ebook, le système :
   - Enregistre la commande en base de données
   - Génère un token unique pour chaque ebook acheté
   - Crée un lien de téléchargement temporaire (48h par défaut)
   - Envoie un email avec les liens de téléchargement

2. **Téléchargement** : Lorsqu'un utilisateur accède au lien de téléchargement :
   - Le système vérifie la validité du token
   - Vérifie que le lien n'a pas expiré
   - Vérifie que le nombre maximum de téléchargements n'est pas atteint
   - Incrémente le compteur de téléchargements
   - Envoie le fichier au client

3. **Sécurité** :
   - Les fichiers des ebooks ne sont pas accessibles directement
   - Les tokens sont uniques et temporaires
   - L'adresse IP est enregistrée à chaque téléchargement
   - Le nombre de téléchargements est limité

## 👨‍💻 Utilisation

### Interface utilisateur

1. **Parcourir le catalogue** : Visitez la page d'accueil ou le catalogue pour parcourir les ebooks disponibles.
2. **Filtrer et rechercher** : Utilisez les filtres par catégorie ou la barre de recherche pour trouver des ebooks spécifiques.
3. **Ajouter au panier** : Ajoutez les ebooks souhaités à votre panier.
4. **Paiement** : Procédez au paiement avec Stripe ou PayPal.
5. **Téléchargement** : Après le paiement, vous serez redirigé vers une page de confirmation avec des liens de téléchargement. Ces liens seront également envoyés par email.
6. **Historique** : Consultez votre historique de commandes et téléchargez à nouveau vos ebooks dans la limite du nombre de téléchargements autorisés.

### Interface administrateur

1. **Gestion des ebooks** : Ajoutez, modifiez ou désactivez des ebooks.
2. **Gestion des commandes** : Consultez et gérez les commandes des utilisateurs.
3. **Statistiques** : Visualisez les statistiques de ventes, les ebooks les plus populaires, etc.
4. **Utilisateurs** : Gérez les comptes utilisateurs.

## 🔧 Personnalisation

### Ajouter de nouveaux ebooks

1. **Préparez les fichiers** :
   - Placez le fichier PDF/EPUB dans `assets/ebooks/content/`
   - Ajoutez l'image de couverture dans `assets/ebooks/covers/`

2. **Mettez à jour les métadonnées** :
   - Modifiez le fichier `assets/ebooks/metadata/ebooks.json` en ajoutant un nouvel objet :

```json
{
  "id": "eb006",
  "title": "Titre de l'ebook",
  "fileName": "nom-du-fichier",
  "author": "Nom de l'auteur",
  "description": "Description détaillée de l'ebook",
  "price": 19.99,
  "discountPrice": 14.99,
  "coverImage": "/assets/ebooks/covers/nom-du-fichier.jpg",
  "filePath": "/assets/ebooks/content/nom-du-fichier.pdf",
  "fileSize": "2.5 MB",
  "pages": 180,
  "format": "PDF",
  "language": "Français",
  "datePublished": "2025-04-15",
  "isbn": "979-8-XXXXXXXX-X-X",
  "category": "finance",
  "tags": ["finance", "investissement", "débutant"]
}
```

3. **Importez les métadonnées** :
   - Utilisez l'API d'importation ou l'interface d'administration

### Modifier les paramètres de téléchargement

Pour modifier la durée de validité des liens ou le nombre maximum de téléchargements, modifiez les variables d'environnement :

```
DOWNLOAD_LINK_EXPIRY=72h  # Valable 72 heures
MAX_DOWNLOADS=5           # 5 téléchargements maximum
```

## 📋 Licence

Ce projet est distribué sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 🙏 Remerciements

- Images de couverture : Unsplash
- Icônes : Lucide Icons
- Composants UI : shadcn/ui

---

Pour toute question ou assistance, veuillez ouvrir une issue sur GitHub ou contacter le support à support@votre-domaine.com.
