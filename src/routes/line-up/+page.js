export async function load({ data }) {

    return {
        slug: data.slug,
        artists: data.artists,
    };
};