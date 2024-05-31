import { writable } from 'svelte/store';


export const displayedArtists = writable([]);
let currentIndex = -3;

export function updateDisplayedArtists(data) {
    currentIndex = (currentIndex + 3) % data.length;
    let newDisplayedArtists = data.slice(currentIndex, currentIndex + 3);
    if (newDisplayedArtists.length < 3) {
        newDisplayedArtists = newDisplayedArtists.concat(data.slice(0, 3 - newDisplayedArtists.length));
    }
    displayedArtists.set(newDisplayedArtists);
}

export function display(data, delay) {
    updateDisplayedArtists(data)
    const intervalId = setInterval(() => {
        updateDisplayedArtists(data);
    }, delay);

    return intervalId
}