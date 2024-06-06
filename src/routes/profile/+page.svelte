<script>
    import { checkPurchased } from '/src/routes/scripts/ticketManager.js';
    import { checkFavoriteStatus } from '/src/routes/scripts/favoriteManager.js';
    import { userProfile, logout } from '/src/routes/scripts/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let data;

    let profile;
    let favoriteArtists = [];
    let purchasedTickets = [];

    onMount(async () => {
        if (!profile) {
            goto('/login');
        }
    });

    userProfile.subscribe(async value => {
        profile = value;
        if (profile) {
            for (let ticket of data.tickets) {
                purchasedTickets[ticket.title] = await checkPurchased(profile.user_id, ticket.title);
            }
            for (let artist of data.artists) {
                favoriteArtists[artist.name] = await checkFavoriteStatus(profile.user_id, artist.name);
            }
        }
    });

    const handleLogout = async () => {
        await logout();
    };
</script>

<h1>Your Profile</h1>
<div class="containerFlex">
    <h3>Welcome, {profile.name}</h3>
    <a href="/login"><button on:click={handleLogout}>Logout</button></a>

    <h2>Your purchased tickets:</h2>
    <div class="tickets-container">
        {#each data.tickets as ticket}
        {#if purchasedTickets[ticket.title]}
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
        {/if}
        {/each}
    </div>

    <h2>Your favorite artists:</h2>
    <div class="containerArtists">
        {#each data.artists as artist}
        {#if favoriteArtists[artist.name]}
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
        {/if}
        {/each}
    </div>
    <h2>Your personalized schedule:</h2>
    <div class="containerSchedule">
        <div class="dayColumn">
            <h3>Saturday</h3>
            {#each Array.from({ length: 13 }, (_, i) => i + 12) as hour}
                <div class="scheduleHour">
                    <div class="hourLabel">{hour}:00</div>
                    <div class="artistsInHour">
                        {#each data.artists as artist}
                            {#if favoriteArtists[artist.name] && artist.day === 'Sat' && artist.time === hour + ':00:00'}
                                <div class="artistSlot">{artist.name}</div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        <div class="dayColumn">
            <h3>Sunday</h3>
            {#each Array.from({ length: 13 }, (_, i) => i +12) as hour}
                <div class="scheduleHour">
                    <div class="hourLabel">{hour}:00</div>
                    <div class="artistsInHour">
                        {#each data.artists as artist}
                            {#if favoriteArtists[artist.name] && artist.day === 'Sun' && artist.time === hour + ':00:00'}
                                <div class="artistSlot">{artist.name}</div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
