import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xqfmvtlauscaiyvkoiip.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZm12dGxhdXNjYWl5dmtvaWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NzczOTQsImV4cCI6MjA4ODQ1MzM5NH0.5T8B3Fjv9qoCF4ROrCduTYmemGeoe76iXjfHxCNprSM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
