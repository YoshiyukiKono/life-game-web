import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Copy .env.example to .env.local.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Choice = {
  id: string;
  title: string;
  body: string | null;
  worldline_note: string | null;
  created_at: string;
};
