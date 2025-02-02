import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Cliente para operações públicas (usuário anônimo)
export const supabase = createBrowserClient(
    supabaseUrl!,
    supabaseAnonKey!
);

// Cliente para operações administrativas (service role)
export const supabaseAdmin = supabaseServiceKey 
    ? createClient(supabaseUrl!, supabaseServiceKey)
    : null;
