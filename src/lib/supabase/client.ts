
import { createClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement de Supabase depuis Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Création du client Supabase avec les bonnes variables d'environnement
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les utilisateurs
export type UserType = {
  id: string;
  email: string;
  created_at: string;
  full_name?: string;
  avatar_url?: string;
};
