import { writable } from "svelte/store";
import { db } from '/src/lib/supabaseClient.js';

export const user = writable(null);
export const userProfile = writable(null);

export const login = async (email, password) => {
    const {data, error} = await db.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const user = data?.user || data?.session?.user;

    const { data: profile, error: profileError } = await db
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
    if (profileError) throw profileError

    userProfile.set(profile);
    return data;
}

export const logout = async () => {
    const { error } = await db.auth.signOut();
    if (error) throw error;

    userProfile.set(null)
    user.set(null);
} 

export const register = async (email, password, name) => {
    try {
        const { data, error: signUpError } = await db.auth.signUp({ email, password });
        if (signUpError) {
            console.error('Sign Up Error:', signUpError);
            throw signUpError;
        }

        const user = data?.user || data?.session?.user;

        if (!user) {
            throw new Error('User registration failed: no user returned');
        }

        const { error: insertError } = await db
            .from('profiles')
            .insert([{ user_id: user.id, name }]);
        if (insertError) {
            console.error('Insert Profile Error:', insertError);
            throw insertError;
        }

        return user;
    } catch (error) {
        console.error('Registration Error:', error);
        throw error;
    }
};


db.auth.onAuthStateChange((event, session) => {
    user.set(session?.user || null);
});