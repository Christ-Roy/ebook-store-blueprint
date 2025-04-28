
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Use the direct Supabase URL and anon key from the integrations folder
import { supabase as integrationSupabase } from '@/integrations/supabase/client';

// Create a more robust client that handles potential issues
const createRobustClient = () => {
  try {
    // First try to use the integration client directly
    return integrationSupabase;
  } catch (error) {
    console.error("Error using integration Supabase client:", error);
    
    // Fallback to creating a client with fixed values if needed
    const SUPABASE_URL = "https://aprfxxpbspithskqthet.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmZ4eHBic3BpdGhza3F0aGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTIyMTUsImV4cCI6MjA2MTM2ODIxNX0.F3GDIPIfAhX6JVZ-VJhYITLnAwtCK3L8F6UlkOijYik";
    
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("Supabase environment variables are missing");
      toast.error("Supabase configuration is incomplete");
      // Return a dummy client to avoid breaking the app
      return createClient('https://placeholder-url.supabase.co', 'placeholder-key');
    }
    
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
};

// Export the supabase client
export const supabase = createRobustClient();

// Types for users
export type UserType = {
  id: string;
  email: string;
  created_at: string;
  full_name?: string;
  avatar_url?: string;
};
