import {db} from '/src/lib/supabaseClient.js';

export async function checkFavoriteStatus(profileId, artistName) {
    if (profileId) {
        const {data: profile, error} = await db
        .from('profiles')
        .select('favorites')
        .eq('user_id', profileId)
        .single()
        
        if (error) {
            console.error('Error fetching favorite status', error);
            return false;
        } else if (profile && profile.favorites) {
            return profile.favorites.includes(artistName);
        } else {
            return false;
        }
    }
    return false;
}

export async function toggleFavorite(profile, artistName) {
    if (!profile || !profile.user_id) {
        console.error('Profile or user_id is missing');
        return false;
    }

    try {
        const { data: profileData, error: fetchError } = await db
            .from('profiles')
            .select('favorites')
            .eq('user_id', profile.user_id)
            .single();

        if (fetchError) {
            console.error('Error fetching profile data:', fetchError);
            return false;
        }

        let updatedFavorites = [];

        if (profileData && profileData.favorites) {
            updatedFavorites = [...profileData.favorites];
        }

        const isFavorite = updatedFavorites.includes(artistName);

        if (isFavorite) {
            // Remove artist from favorites
            updatedFavorites = updatedFavorites.filter(fav => fav !== artistName);
        } else {
            // Add artist to favorites
            updatedFavorites.push(artistName);
        }

        const { error: updateError } = await db
            .from('profiles')
            .update({ favorites: updatedFavorites })
            .eq('user_id', profile.user_id);

        if (updateError) {
            console.error('Error updating favorites:', updateError);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Unexpected error:', error);
        return false;
    }
}

