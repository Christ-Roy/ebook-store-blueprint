import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aprfxxpbspithskqthet.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmZ4eHBic3BpdGhza3F0aGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTIyMTUsImV4cCI6MjA2MTM2ODIxNX0.F3GDIPIfAhX6JVZ-VJhYITLnAwtCK3L8F6UlkOijYik';

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les utilisateurs
export type UserType = {
  id: string;
  email: string;
  created_at: string;
  full_name?: string;
  avatar_url?: string;
};
