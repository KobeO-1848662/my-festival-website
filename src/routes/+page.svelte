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
<div class="background-gradient">
<div class="containerFlex">
    <div class="item">
        <a href="/about"><h2>About</h2></a>
        <h4>Get ready for this years edition of FSWEB-fest</h4>
        <h4>Make sure to mark these dates in your agenda so you won't miss this unforgettable edition:</h4>
        <h3>June 8th 2024 and June 9th 2024</h3>
    </div>
    <div class="item">
        <a href="/line-up"><h2>Line Up</h2></a>
        <div class="containerArtists">
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
        <div class="tickets-container">
            {#each data.tickets as ticket}
            <a href="/tickets/{ticket.title}">
            <div class="ticket-card">
                <div class="title">{ticket.title}</div>
                {#each data.artists as artist}
                    {#if ticket.title === 'Saturday ticket' && artist.day === 'Sat'}
                        <div class="artistTicket"><i class="fas fa-music"></i> {artist.name} <i class="fas fa-music"></i></div>
                    {:else if ticket.title === 'Sunday ticket' && artist.day === 'Sun'}
                        <div class="artistTicket"><i class="fas fa-music"></i> {artist.name} <i class="fas fa-music"></i></div>
                    {:else if ticket.title === 'Combi ticket'}
                        <div class="artistTicket"><i class="fas fa-music"></i> {artist.name} <i class="fas fa-music"></i></div>
                    {/if}
                {/each}
            </div>
            </a>
            {/each}
        </div>
    </div>
    <div class="item">
        <a href="/contact"><h2>Contact</h2></a>
        <p>click the above link to go to our contact page</p>
    </div>
</div>
</div>