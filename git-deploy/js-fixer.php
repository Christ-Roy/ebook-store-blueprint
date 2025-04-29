<?php
/**
 * Script de pré-traitement pour index.html
 * Ce script modifie dynamiquement l'index.html avant de le servir
 * pour remplacer les imports de modules ES par des scripts standards
 */

// Chemin vers le fichier index.html
$index_path = __DIR__ . '/index.html';

// Vérifier que le fichier existe
if (!file_exists($index_path)) {
    echo "Erreur: Fichier index.html introuvable";
    exit;
}

// Lire le contenu du fichier
$html = file_get_contents($index_path);

// Fonction pour extraire tous les fichiers JavaScript du dossier assets
function discover_js_files($dir) {
    $js_files = [];
    
    // Si le dossier assets n'existe pas, retourner un tableau vide
    if (!is_dir($dir)) {
        return $js_files;
    }
    
    // Parcourir tous les fichiers du dossier et ses sous-dossiers
    $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($it as $file) {
        if ($file->isFile()) {
            $path = $file->getPathname();
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            
            // Vérifier si c'est un fichier JavaScript (avec ou sans extension .txt)
            if ($ext === 'js' || $ext === 'txt' && strpos($path, '.js.txt') !== false) {
                // Extraire le chemin relatif au dossier assets
                $relative_path = str_replace($dir . '/', '', $path);
                // Supprimer l'extension .txt si présente
                $relative_path = str_replace('.txt', '', $relative_path);
                $js_files[] = $relative_path;
            }
        }
    }
    
    return $js_files;
}

// Vérifier la présence de scripts de type module dans l'index.html
if (strpos($html, 'type="module"') !== false) {
    // Trouver les fichiers JavaScript dans le dossier assets
    $assets_dir = __DIR__ . '/assets';
    $js_files = discover_js_files($assets_dir);
    
    // Récupérer le script principal (généralement le premier script de type module)
    preg_match('/<script type="module" crossorigin src="([^"]+)"/', $html, $matches);
    $main_js = isset($matches[1]) ? basename($matches[1]) : null;
    
    // Créer du JavaScript pour charger les fichiers via le proxy
    $js_loader = "\n<script>\n";
    $js_loader .= "// Script généré automatiquement pour charger les fichiers JavaScript via le proxy PHP\n";
    $js_loader .= "document.addEventListener('DOMContentLoaded', function() {\n";
    
    // Charger tous les fichiers JS découverts
    foreach ($js_files as $js_file) {
        // Nettoyer le nom du fichier pour l'URL
        $clean_file = str_replace('.js', '', $js_file);
        $js_loader .= "    loadScript('js-proxy.php?file=" . $clean_file . "');\n";
    }
    
    $js_loader .= "});\n\n";
    $js_loader .= "// Fonction pour charger un script de manière asynchrone\n";
    $js_loader .= "function loadScript(src) {\n";
    $js_loader .= "    var script = document.createElement('script');\n";
    $js_loader .= "    script.src = src;\n";
    $js_loader .= "    script.async = false; // Important pour préserver l'ordre d'exécution\n";
    $js_loader .= "    document.head.appendChild(script);\n";
    $js_loader .= "}\n";
    $js_loader .= "</script>\n";
    
    // Remplacer tous les scripts de type module par un commentaire
    $html = preg_replace('/<script type="module"[^>]*>.*?<\/script>/s', '<!-- Module script remplacé par le chargeur JS -->', $html);
    $html = preg_replace('/<script type="module" crossorigin src="[^"]+"[^>]*><\/script>/', '<!-- Module script remplacé par le chargeur JS -->', $html);
    
    // Insérer le chargeur JS juste avant la fermeture de </head>
    $html = str_replace('</head>', $js_loader . '</head>', $html);
    
    // Ajouter une note informative en haut de la page (visible uniquement dans le code source)
    $html = str_replace('<head>', '<head><!-- Index.html modifié par js-fixer.php pour résoudre les problèmes de type MIME sur Hostinger -->', $html);
}

// Servir le HTML modifié
header('Content-Type: text/html; charset=utf-8');
echo $html;
