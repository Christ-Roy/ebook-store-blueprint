# Solution simplifiée aux problèmes de type MIME sur Hostinger

Cette solution a été mise en place pour résoudre les problèmes spécifiques rencontrés avec le déploiement d'applications React/Vite sur Hostinger :

1. Les fichiers JavaScript sont servis avec le type MIME `text/plain` au lieu de `application/javascript`
2. Hostinger ajoute automatiquement l'extension `.txt` aux fichiers JavaScript (ex: `main.js` devient `main.js.txt`)

## Composants de la solution

### 1. js-proxy.php

Ce proxy PHP intercepte les requêtes vers les fichiers JavaScript et les sert avec le bon type MIME. Il recherche également les fichiers avec l'extension `.txt` ajoutée par Hostinger.

```php
// Usage: js-proxy.php?file=path/to/file.js
```

### 2. js-loader.php

Ce script remplace l'index.html original et modifie dynamiquement les balises script pour utiliser le proxy PHP au lieu de charger directement les modules ES6.

### 3. Configuration .htaccess

Le fichier `.htaccess` est configuré pour :
- Utiliser `js-loader.php` comme point d'entrée principal
- Rediriger les requêtes JavaScript vers le proxy PHP
- Gérer le routage SPA pour React
- Définir les types MIME corrects en secours

## Test de la solution

Pour vérifier que la solution fonctionne correctement :

1. Accédez à votre site à l'adresse `https://veridian.site/git-deploy/`
2. Ouvrez les outils de développement du navigateur (F12)
3. Vérifiez l'onglet "Network" et filtrez sur "JS"
4. Confirmez que les fichiers JavaScript sont bien chargés via `js-proxy.php`
5. Vérifiez que l'application fonctionne normalement sans erreur dans la console

## Déploiements futurs

Cette solution est automatiquement intégrée dans le workflow GitHub Actions. À chaque déploiement, ces fichiers seront inclus dans le répertoire `git-deploy` pour maintenir la compatibilité avec Hostinger.

Si vous rencontrez des problèmes, vérifiez que PHP est bien activé sur votre hébergement Hostinger et que les permissions des fichiers sont correctes (644 pour les fichiers, 755 pour les dossiers).
