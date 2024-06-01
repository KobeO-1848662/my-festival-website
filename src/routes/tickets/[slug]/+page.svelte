<script>
    import { userProfile } from '/src/routes/scripts/auth.js';

    export let data;

    let profile;

    userProfile.subscribe(value => {
        profile = value;
    });
</script>

<h1>{data.ticket.title}</h1>

<div class="tickets-container">
    <div class="ticket-card">
        <div class="title">{data.ticket.title}</div>
        <div class="description">{data.ticket.description}</div>
        {#if profile}
            <button>purchase ticket</button>
        {:else}
            <button><a href="/login">login first to purchase ticket</a></button>
        {/if}
    </div>
</div>