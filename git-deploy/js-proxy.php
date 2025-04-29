<?php
/**
 * JavaScript Proxy pour Hostinger
 * Ce script sert à contourner le problème de type MIME sur Hostinger
 * Il intercepte les requêtes vers les fichiers .js et les sert avec le bon type MIME
 */

// Récupération du chemin du fichier demandé depuis l'URL
$file_path = isset($_GET['file']) ? $_GET['file'] : null;

if (!$file_path) {
    header('HTTP/1.1 400 Bad Request');
    echo 'Erreur: Paramètre "file" manquant';
    exit;
}

// Nettoyage du chemin pour prévenir les attaques de traversée de répertoire
$file_path = str_replace('../', '', $file_path);

// Déterminer l'extension réelle en essayant plusieurs possibilités
$possible_extensions = ['', '.txt', '.js.txt'];
$real_file_path = null;

foreach ($possible_extensions as $ext) {
    $test_path = __DIR__ . '/assets/' . $file_path . $ext;
    if (file_exists($test_path)) {
        $real_file_path = $test_path;
        break;
    }
}

// Si le fichier n'existe pas avec aucune des extensions, essayer avec un chemin absolu
if (!$real_file_path && file_exists(__DIR__ . '/' . $file_path)) {
    $real_file_path = __DIR__ . '/' . $file_path;
}

// Vérification que le fichier existe
if (!$real_file_path || !file_exists($real_file_path)) {
    header('HTTP/1.1 404 Not Found');
    echo 'Erreur: Fichier JavaScript non trouvé';
    exit;
}

// Vérification qu'il s'agit bien d'un fichier et non d'un répertoire
if (!is_file($real_file_path)) {
    header('HTTP/1.1 403 Forbidden');
    echo 'Erreur: Le chemin spécifié n\'est pas un fichier';
    exit;
}

// Déterminer le type MIME en fonction de l'extension réelle du fichier demandé
$extension = pathinfo($file_path, PATHINFO_EXTENSION);
switch (strtolower($extension)) {
    case 'js':
        $mime_type = 'application/javascript';
        break;
    case 'json':
        $mime_type = 'application/json';
        break;
    case 'css':
        $mime_type = 'text/css';
        break;
    default:
        $mime_type = 'application/javascript'; // Par défaut pour les fichiers sans extension
}

// Configuration des en-têtes pour servir le fichier avec le bon type MIME
header('Content-Type: ' . $mime_type . '; charset=utf-8');
header('Cache-Control: max-age=31536000, public'); // Cache d'un an pour les performances

// Protection contre les injections XSS
header('X-Content-Type-Options: nosniff');

// Envoi du contenu du fichier
readfile($real_file_path);
exit;
