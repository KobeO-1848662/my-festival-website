import { PUBLIC_SUPABASE_SERVER, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const db = createClient(PUBLIC_SUPABASE_SERVER, PUBLIC_SUPABASE_ANON_KEY);