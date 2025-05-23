import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/git-deploy/', // URL de base pour le déploiement dans un sous-répertoire
  build: {
    outDir: 'build', // Répertoire de sortie pour la compilation
    assetsDir: 'assets',
    target: 'es2015', // Cible une version plus ancienne de JavaScript pour une meilleure compatibilité
    rollupOptions: {
      output: {
        format: 'iife', // Utilise IIFE au lieu de ESM pour éviter les problèmes de type MIME
        // Assure un type de fichier standard
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
}));