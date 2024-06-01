export async function load({ data }) {

    return {
        slug: data.slug,
        tickets: data.tickets,
        artists: data.artists
    };
};