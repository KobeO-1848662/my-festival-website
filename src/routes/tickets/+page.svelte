<script>
    import { userProfile } from '/src/routes/scripts/auth.js';
    
    export let data;

    let profile;

    userProfile.subscribe(value => {
        profile = value;
    });

    let artists = data.artists;
</script>

<h1>Tickets</h1>
<div class="tickets-container">
    {#each data.tickets as ticket}
    <a href="/tickets/{ticket.title}">
    <div class="ticket-card">
        <div class="title">{ticket.title}</div>
        {#each artists as artist}
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