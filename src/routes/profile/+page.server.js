import {db} from '/src/lib/supabaseClient.js';


export async function load() {
    const response = await db.from("artists").select();
    const response2 = await db.from("tickets").select();

    return {
        artists: response.data,
        tickets: response2.data
    };
};