# Mise à jour du déploiement Hostinger

Pour résoudre l'erreur "Project directory is not empty" lors de la configuration du déploiement Git sur Hostinger, le workflow a été modifié pour déployer dans un sous-répertoire nommé `git-deploy`.

## Configuration requise dans Hostinger

Lors de la création du dépôt Git dans Hostinger :

1. Dépôt : https://github.com/Christ-Roy/ebook-store-blueprint.git
2. Branche : build
3. **Répertoire : git-deploy**  (Très important : spécifiez ce sous-répertoire)

## Accès au site après déploiement

Après le déploiement, le site sera accessible via :
- https://veridian.site/git-deploy/

Si vous souhaitez le rendre accessible directement à la racine du domaine, vous devrez soit :

1. Configurer une redirection dans un fichier .htaccess à la racine
2. Modifier les paramètres DNS pour pointer vers le sous-dossier
3. Vider complètement le répertoire public_html et reconfigurer le dépôt Git sans sous-répertoire