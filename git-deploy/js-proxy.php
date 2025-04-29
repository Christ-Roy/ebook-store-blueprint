<?php
// Définir l'en-tête pour éviter les problèmes de cache
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Obtenir le nom du fichier demandé depuis l'URL
$requestedFile = isset($_GET['file']) ? $_GET['file'] : '';

// Sécurité basique pour éviter les attaques de traversée de répertoire
$requestedFile = str_replace('../', '', $requestedFile);

// Chemin vers le fichier demandé
$filePath = __DIR__ . '/' . $requestedFile;
$txtFilePath = $filePath . '.txt';

// Vérifier si le fichier existe (avec ou sans .txt)
if (file_exists($filePath)) {
    // Détecter le type MIME en fonction de l'extension
    $extension = pathinfo($filePath, PATHINFO_EXTENSION);
    
    if ($extension == 'js' || $extension == 'mjs') {
        header('Content-Type: application/javascript');
    } elseif ($extension == 'json') {
        header('Content-Type: application/json');
    } elseif ($extension == 'css') {
        header('Content-Type: text/css');
    }
    
    // Servir le fichier
    readfile($filePath);
    exit;
} elseif (file_exists($txtFilePath)) {
    // Si le fichier .txt existe à la place
    header('Content-Type: application/javascript');
    readfile($txtFilePath);
    exit;
}

// Si le fichier n'existe pas
header("HTTP/1.0 404 Not Found");
echo "File not found: " . htmlspecialchars($requestedFile);
