import {db} from '/src/lib/supabaseClient.js';


export async function load() {
    const response = await db.from("artists").select();

    return {
        artists: response.data
    };
};