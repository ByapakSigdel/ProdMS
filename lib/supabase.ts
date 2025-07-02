// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://nozgmmcdmegiovznmcnz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemdtbWNkbWVnaW92em5tY256Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTM4ODI5MywiZXhwIjoyMDYwOTY0MjkzfQ.XTnjxYJgIeqHOoGUHIKhPRerf_7DgqUBoGOiMf2f7mQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Optional: Configure auto refresh
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});