import {db} from '/src/lib/supabaseClient.js';

export async function load() {
    const response = await db.from("tickets").select();
    const response2 = await db.from("artists").select();

    return {
        slug: response.title,
        tickets: response.data,
        artists: response2.data
    };
};