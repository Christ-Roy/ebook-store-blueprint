# Solution aux problèmes de MIME Type sur Hostinger pour React/Vite

Ce document explique la solution mise en place pour résoudre les problèmes de type MIME rencontrés lors du déploiement d'applications React/Vite sur Hostinger.

## Le problème

Les applications React/Vite modernes utilisent des modules ES6 qui nécessitent que les fichiers JavaScript soient servis avec le type MIME `application/javascript`. Cependant, sur Hostinger, deux problèmes spécifiques surviennent :

1. Les fichiers JavaScript sont servis avec le type MIME `text/plain` au lieu de `application/javascript`
2. Hostinger ajoute automatiquement l'extension `.txt` aux fichiers JavaScript (ex: `main.js` devient `main.js.txt`)

Cela provoque l'erreur suivante dans la console du navigateur :
```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/plain"
```

## La solution implémentée

Nous avons mis en place une solution comprenant trois composants :

### 1. js-proxy.php

Ce script PHP agit comme un proxy pour servir les fichiers JavaScript avec le bon type MIME :

- Il intercepte les requêtes vers les fichiers JavaScript
- Il recherche le fichier demandé avec différentes extensions possibles (.js, .js.txt, etc.)
- Il sert le fichier avec l'en-tête Content-Type correct : `application/javascript`

### 2. js-fixer.php

Ce script modifie dynamiquement le fichier index.html avant qu'il ne soit servi au navigateur :

- Il remplace les imports de modules ES6 par des imports JavaScript standards
- Il détecte automatiquement tous les fichiers JavaScript dans le dossier assets
- Il génère du code pour charger ces fichiers via le proxy js-proxy.php

### 3. Configuration .htaccess

Le fichier .htaccess est configuré pour :

- Rediriger l'accès à index.html vers js-fixer.php
- Rediriger les requêtes vers les fichiers .js vers js-proxy.php
- Gérer le routage SPA pour React Router
- Définir les types MIME corrects (comme solution de secours)

## Comment cela fonctionne

1. Quand un utilisateur accède à `https://veridian.site/git-deploy/`, la requête est redirigée vers `js-fixer.php` grâce à la directive `DirectoryIndex`
2. `js-fixer.php` lit le fichier `index.html`, le modifie pour remplacer les imports ES6, et renvoie le HTML modifié au navigateur
3. Le HTML modifié contient un script qui charge tous les fichiers JavaScript via `js-proxy.php`
4. `js-proxy.php` sert chaque fichier JavaScript avec le bon type MIME, contournant ainsi les restrictions de Hostinger

Cette approche présente plusieurs avantages :
- Elle est compatible avec toutes les versions de React/Vite
- Elle s'adapte automatiquement aux fichiers renommés par Hostinger
- Elle ne nécessite pas de modifications sur le serveur Hostinger
- Elle préserve le routage SPA de React Router

## Maintenance et mise à jour

Cette solution devrait continuer à fonctionner pour les futurs déploiements. Si vous mettez à jour l'application :

1. Conservez les trois fichiers (.htaccess, js-proxy.php, js-fixer.php) dans le répertoire git-deploy
2. Le script js-fixer.php détectera automatiquement les nouveaux fichiers JavaScript
3. Si vous rencontrez des problèmes, vérifiez la console du navigateur pour les erreurs

## Tests à effectuer

Pour vérifier que la solution fonctionne correctement :

1. Accédez à `https://veridian.site/git-deploy/`
2. Ouvrez les outils de développement du navigateur (F12)
3. Vérifiez l'onglet "Network" et filtrez sur "JS"
4. Vous devriez voir que tous les fichiers JavaScript sont chargés via js-proxy.php
5. Vérifiez que le type MIME (Content-Type) indique bien `application/javascript`
6. Vérifiez que l'application fonctionne normalement, sans erreurs dans la console

## Optimisations futures

Pour une version de production, vous pourriez envisager :

1. Activer la mise en cache des fichiers JavaScript dans js-proxy.php pour améliorer les performances
2. Minifier davantage le HTML généré par js-fixer.php
3. Intégrer cette solution directement dans le workflow GitHub Actions pour l'appliquer automatiquement à chaque déploiement

## Support

Si vous rencontrez des problèmes avec cette solution, vérifiez :

1. Que PHP est correctement activé sur votre hébergement Hostinger
2. Que les fichiers ont les permissions correctes (644 pour les fichiers, 755 pour les dossiers)
3. Que le module mod_rewrite est activé sur Hostinger (généralement le cas par défaut)
