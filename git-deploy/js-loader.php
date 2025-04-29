<?php
// Chemin vers l'index.html original
$indexPath = __DIR__ . '/index.html';

if (file_exists($indexPath)) {
    // Lire le contenu du fichier index.html
    $content = file_get_contents($indexPath);
    
    // Remplacer les imports de modules ES6 par des scripts standards via le proxy
    $content = preg_replace('/<script type="module" crossorigin src="([^"]+\.js)"><\/script>/i', 
        '<script src="js-proxy.php?file=$1"></script>', $content);
    
    // Envoyer le contenu modifié
    echo $content;
} else {
    echo "Index file not found!";
}
