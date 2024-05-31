import { PUBLIC_SUPABASE_SERVER, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export async function load({params}) {
    const db = createClient(PUBLIC_SUPABASE_SERVER, PUBLIC_SUPABASE_ANON_KEY);
    const response = await db.from("artists").select().eq('name', params.slug);
  
    if (response.error) {
        // Handle the error appropriately, such as logging it or returning an error message
        console.error(response.error.message);
        return {
            error: "An error occurred while fetching artist data."
        };
    }

    const artist = response.data[0];
    if (!artist) {
        // If artist data is not found, return an appropriate error message
        return {
            error: "Artist not found."
        };
    }

    return {
        artist
    };
};