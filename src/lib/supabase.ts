
import { createClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Créer le client Supabase seulement si les variables sont définies
let supabase;

// Tentative de création du client Supabase
try {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials are missing. Please check your environment variables.');
    // Crée un client factice qui lancera une erreur plus explicite en cas d'utilisation
    supabase = {
      auth: {
        signUp: () => { throw new Error('Supabase is not properly configured. Please configure your environment variables.') },
        signInWithPassword: () => { throw new Error('Supabase is not properly configured. Please configure your environment variables.') },
        signOut: () => { throw new Error('Supabase is not properly configured. Please configure your environment variables.') },
      }
    };
  } else {
    // Création normale du client avec les informations d'identification
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  throw error;
}

export { supabase };
