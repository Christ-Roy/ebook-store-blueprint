// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aprfxxpbspithskqthet.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmZ4eHBic3BpdGhza3F0aGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTIyMTUsImV4cCI6MjA2MTM2ODIxNX0.F3GDIPIfAhX6JVZ-VJhYITLnAwtCK3L8F6UlkOijYik";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);