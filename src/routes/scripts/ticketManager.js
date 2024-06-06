import {db} from '/src/lib/supabaseClient.js';

export async function checkPurchased(profileId, ticketTitle){
    if (profileId) {
        const {data: profile, error} = await db
        .from('profiles')
        .select('tickets')
        .eq('user_id', profileId)
        .single()

        if (error) {
            return false;
        } else if (profile && profile.tickets) {
            return profile.tickets.includes(ticketTitle);
        } else {
            return false;
        }
    }
    return false;
}

export async function purchaseTicket(profile, ticketTitle){
    if (!profile || !profile.user_id) {
        return false;
    }

    try {
        const { data: profileData, error: fetchError } = await db
            .from('profiles')
            .select('tickets')
            .eq('user_id', profile.user_id)
            .single();

        if (fetchError) {
            return false;
        }

        let updatedTickets = [];

        if (profileData && profileData.tickets) {
            updatedTickets = [...profileData.tickets];
        }

        const isPurchased = updatedTickets.includes(ticketTitle);

        if (isPurchased) {
            updatedTickets = updatedTickets.filter(tic => tic !== ticketTitle);
        } else {
            updatedTickets.push(ticketTitle);
        }

        const { error: updateError } = await db
            .from('profiles')
            .update({ tickets: updatedTickets })
            .eq('user_id', profile.user_id);

        if (updateError) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}