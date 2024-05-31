<script>
    import { onMount } from "svelte";
    import { displayedArtists, display } from '/src/routes/scripts/artistsDisplay.js'
    
    export let data;

    onMount(() => {
        const intervalId = display(data.artists, 5000);
        return () => clearInterval(intervalId);
    });
</script>

<div class="photo" style="background-image: url('/pukkelpop.jpg');">
    <h1>FSWEB-fest</h1>
</div>
<div class="containerFlex">
    <div class="item">
        <a href="/about"><h2>About</h2></a>
        <h4>Get ready for this years edition of FSWEB-fest</h4>
        <h4>Make sure to mark these dates in your agenda to make sure you won't miss this unforgettable edition:</h4>
        <h3>June 8th 2024 and June 9th 2024</h3>
        <p>press the link above for more information on the festival</p>
    </div>
    <div class="item">
        <a href="/line-up"><h2>Line Up</h2></a>
        <p>this part will show some of the big artists that will perform</p>
        <div class="containerGrid">
            {#each $displayedArtists as artist}
                <a href="/line-up/{artist.name}">
                <div class="item">
                    <div class="dayAndStage">{artist.day} - {artist.stage}</div>
                    <div class="name">{artist.name}</div>
                    <div class="imageContainer">
                        <img src={artist.image} alt={artist.name} />
                    </div>
                    <div class="genre">{artist.genre}</div>
                </div>
                </a>
            {/each}
        </div>
    </div>
    <div class="item">
        <a href="/tickets"><h2>Tickets</h2></a>
        <p>link to the tickets buying</p>
    </div>
    <div class="item">
        <a href="/line-up"><h2>Contact</h2></a>
        <p>contact us via facebook, insta, email, ...</p>
    </div>
</div>