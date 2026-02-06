// lib/supabase/server.ts
// Server-side Supabase client for API routes

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');
}

// Create server client with service role key (bypasses RLS)
export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

// Create regular server client (respects RLS)
export const supabaseServer: SupabaseClient<Database> = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
