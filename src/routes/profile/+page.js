export async function load( { data } ) {

    return {
        artists: data.artists,
        tickets: data.tickets
    };
};