import {db} from '/src/lib/supabaseClient.js';

export async function checkFavoriteStatus(profileId, artistName) {
    if (profileId) {
        const {data: profile, error} = await db
        .from('profiles')
        .select('favorites')
        .eq('user_id', profileId)
        .single()
        
        if (error) {
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
        return false;
    }

    try {
        const { data: profileData, error: fetchError } = await db
            .from('profiles')
            .select('favorites')
            .eq('user_id', profile.user_id)
            .single();

        if (fetchError) {
            return false;
        }

        let updatedFavorites = [];

        if (profileData && profileData.favorites) {
            updatedFavorites = [...profileData.favorites];
        }

        const isFavorite = updatedFavorites.includes(artistName);

        if (isFavorite) {
            updatedFavorites = updatedFavorites.filter(fav => fav !== artistName);
        } else {
            updatedFavorites.push(artistName);
        }

        const { error: updateError } = await db
            .from('profiles')
            .update({ favorites: updatedFavorites })
            .eq('user_id', profile.user_id);

        if (updateError) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

