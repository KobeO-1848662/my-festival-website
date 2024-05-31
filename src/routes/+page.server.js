import { PUBLIC_SUPABASE_SERVER, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export async function load() {
    const db = createClient(PUBLIC_SUPABASE_SERVER, PUBLIC_SUPABASE_ANON_KEY);
    const response = await db.from("artists").select();

    return {
        artists: response.data
    };
};