import {db} from '/src/lib/supabaseClient.js';

export async function load({params}) {
    const response = await db.from("tickets").select().eq('title', params.slug);
    const ticket = response.data[0];

    return {
        ticket
    };
};
