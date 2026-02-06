// lib/supabase/client.ts
// Browser-side Supabase client

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../types/supabase';

export const createClient = () => {
    return createClientComponentClient<Database>();
};

// Export singleton instance
export const supabase = createClient();
