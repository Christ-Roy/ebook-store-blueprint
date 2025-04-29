# Résolution des problèmes de type MIME avec React/Vite sur Hostinger

Ce document explique comment résoudre le problème de type MIME couramment rencontré lors du déploiement d'applications React/Vite sur Hostinger. Ce problème se manifeste généralement par une page blanche et l'erreur suivante dans la console du navigateur :

```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/plain". Strict MIME type checking is enforced for module scripts per HTML spec.
```

## Causes du problème

Le problème survient car les hébergements partagés comme Hostinger ne configurent pas toujours correctement les types MIME pour les fichiers JavaScript modernes, en particulier les modules ES6. Le navigateur s'attend à recevoir du JavaScript avec le type MIME `application/javascript`, mais le serveur envoie `text/plain`.

## Solutions implémentées

Nous avons mis en place plusieurs couches de solutions pour garantir que ce problème soit résolu :

### 1. Configuration du fichier .htaccess

Un fichier `.htaccess` avancé a été créé dans le dossier `git-deploy` avec diverses méthodes pour configurer les types MIME correctement :

```apache
# Configuration des types MIME corrects - Méthode 1
<IfModule mod_mime.c>
  # JavaScript
  AddType application/javascript .js
  AddType application/javascript .mjs
  AddType text/javascript .js .mjs
  
  # JSON
  AddType application/json .json
  
  # CSS
  AddType text/css .css
  
  # HTML
  AddType text/html .html .htm
</IfModule>

# Configuration des types MIME - Méthode 2 avec mod_headers
<IfModule mod_headers.c>
  <FilesMatch "\.js$">
    Header set Content-Type "application/javascript"
  </FilesMatch>
  <FilesMatch "\.mjs$">
    Header set Content-Type "application/javascript"
  </FilesMatch>
  <FilesMatch "\.json$">
    Header set Content-Type "application/json"
  </FilesMatch>
  <FilesMatch "\.css$">
    Header set Content-Type "text/css"
  </FilesMatch>
</IfModule>
```

### 2. Modification de la configuration Vite

La configuration `vite.config.ts` a été optimisée pour éviter les problèmes de types MIME :

```typescript
build: {
  outDir: 'build',
  assetsDir: 'assets',
  target: 'es2015', // Cible une version plus ancienne de JavaScript
  rollupOptions: {
    output: {
      format: 'iife', // Utilise IIFE au lieu de ESM
      entryFileNames: 'assets/[name].[hash].js',
      chunkFileNames: 'assets/[name].[hash].js',
      assetFileNames: 'assets/[name].[hash].[ext]'
    }
  }
}
```

Les changements clés sont :
- Utilisation du format IIFE au lieu des modules ES6
- Ciblage de ES2015 pour assurer une meilleure compatibilité
- Standardisation des noms de fichiers et des extensions

### 3. Ajustement des permissions des fichiers

Le workflow GitHub Actions a été configuré pour définir les permissions correctes pour tous les fichiers :
- 644 pour les fichiers (lecture/écriture pour le propriétaire, lecture pour les autres)
- 755 pour les répertoires (lecture/écriture/exécution pour le propriétaire, lecture/exécution pour les autres)

## Comment vérifier si les solutions fonctionnent

1. Visitez votre site sur `https://veridian.site/git-deploy/`
2. Ouvrez les outils de développement (F12)
3. Dans l'onglet "Network", vérifiez le type MIME des fichiers JavaScript
4. Si les fichiers sont correctement servis avec `application/javascript` ou `text/javascript`, le problème est résolu

## Solutions de secours si les problèmes persistent

Si malgré toutes ces configurations, le problème persiste :

1. **Demandez à l'assistance Hostinger** d'activer le module `mod_headers` s'il n'est pas activé.
2. **Vérifiez dans le gestionnaire de fichiers Hostinger** que :
   - Les fichiers JavaScript sont bien présents dans le dossier déployé
   - Les fichiers n'ont pas été renommés par le serveur (parfois les serveurs ajoutent des extensions comme .txt)
   - Les permissions des fichiers sont correctes (644 pour les fichiers, 755 pour les dossiers)
3. **Envisagez de télécharger et placer manuellement** le fichier `.htaccess` directement via le gestionnaire de fichiers Hostinger.

## Impact sur le SEO et les performances

La résolution de ce problème est cruciale car :
- Une page blanche a un impact négatif sur le SEO
- Les erreurs JavaScript affectent l'expérience utilisateur
- Les performances du site sont optimales uniquement si les ressources JavaScript sont correctement chargées

## Maintenance future

Lors des mises à jour futures du site, veillez à :
1. Maintenir la configuration Vite qui évite les modules ES6 en production
2. Préserver le fichier `.htaccess` avec ses configurations MIME
3. Vérifier que les permissions des fichiers sont correctes après chaque déploiement