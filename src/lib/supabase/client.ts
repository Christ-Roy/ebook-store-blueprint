
import { createClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement de Supabase depuis Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérifier si les variables d'environnement sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Les variables d'environnement Supabase ne sont pas définies. Veuillez vous connecter à votre projet Supabase dans l'interface de Lovable.");
}

// Création du client Supabase avec gestion des cas où les variables seraient non définies
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

// Types pour les utilisateurs
export type UserType = {
  id: string;
  email: string;
  created_at: string;
  full_name?: string;
  avatar_url?: string;
};
