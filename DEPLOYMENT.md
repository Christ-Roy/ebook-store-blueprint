# Guide de déploiement via Hostinger Git

Ce document explique comment votre application React/Vite est automatiquement déployée sur Hostinger en utilisant la fonctionnalité de déploiement Git native de Hostinger.

## Comment fonctionne le déploiement

Le déploiement est configuré pour fonctionner de manière automatique via GitHub Actions et le système Git natif de Hostinger :

1. Lorsque vous poussez du code sur la branche `main`, un workflow GitHub Actions s'exécute
2. Le workflow compile votre application React et crée un fichier `.htaccess` dans le dossier `build`
3. Il pousse ensuite le contenu du dossier `build` vers une branche spéciale nommée `build`
4. Hostinger détecte les changements sur la branche `build` et déploie automatiquement votre site

## Configuration initiale dans Hostinger

Pour terminer la configuration initiale, vous devez connecter Hostinger à votre dépôt GitHub :

1. Connectez-vous à votre panneau Hostinger
2. Naviguez vers la section "Git" dans le menu latéral
3. Cliquez sur "Créer un nouveau dépôt"
4. Remplissez les champs comme suit :
   - **Dépôt** : `https://github.com/Christ-Roy/ebook-store-blueprint.git`
   - **Branche** : `build` (c'est la branche que le workflow GitHub Actions crée)
   - **Répertoire** : laissez vide pour déployer à la racine (public_html)
5. Cliquez sur "Créer"

## Vérification du déploiement

Après avoir configuré le déploiement Git dans Hostinger :

1. Effectuez un changement dans votre code
2. Poussez ce changement sur la branche `main` de votre dépôt GitHub
3. Vérifiez que le workflow GitHub Actions s'exécute correctement (dans l'onglet "Actions" de GitHub)
4. Attendez quelques minutes pour que Hostinger récupère et déploie les changements
5. Vérifiez que votre site est mis à jour sur `veridian.site`

## Dépannage

Si votre site ne se charge pas correctement après la configuration :

1. Vérifiez les logs du workflow GitHub Actions pour vous assurer que la branche `build` est correctement générée
2. Assurez-vous que le fichier `.htaccess` est bien présent dans la branche `build`
3. Vérifiez dans Hostinger si le dépôt Git est correctement connecté
4. Inspectez votre site avec les outils de développement du navigateur (F12) pour voir s'il y a des erreurs JavaScript ou des 404
5. Si nécessaire, contactez le support Hostinger pour vérifier que le déploiement Git est correctement configuré

## Anciennes configurations

L'ancienne méthode de déploiement SSH a été désactivée. Le fichier de workflow correspondant a été renommé en `.github/workflows/hostinger-deploy.yml.bak` pour référence. Les secrets GitHub configurés pour SSH ne sont plus nécessaires mais peuvent être conservés en cas de besoin futur.
