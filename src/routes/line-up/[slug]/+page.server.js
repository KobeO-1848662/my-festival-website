import {db} from '/src/lib/supabaseClient.js';

export async function load({params}) {
    const response = await db.from("artists").select().eq('name', params.slug);
    const artist = response.data[0];

    return {
        artist
    };
};
