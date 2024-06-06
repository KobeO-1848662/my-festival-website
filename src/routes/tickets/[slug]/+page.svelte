<script>
    import { userProfile } from '/src/routes/scripts/auth.js';
    import { checkPurchased, purchaseTicket } from '/src/routes/scripts/ticketManager.js'

    export let data;

    let isPurchased;
    let profile;

    userProfile.subscribe(async value => {
        profile = value;
        if (profile) {
            profile.tickets = profile.tickets || []; 
            isPurchased = await checkPurchased(profile.user_id, data.ticket.title);
    }
    });

    async function handlePurchaseTicket() {
        if (profile) {
            const success = await purchaseTicket(profile, data.ticket.title)
            if (success) {
                isPurchased = !isPurchased;
            }
        }
    }
</script>

<h1>{data.ticket.title}</h1>

<div class="tickets-container">
    <div class="ticket-card">
        <div class="title">{data.ticket.title}</div>
        {#if profile}
            {#if isPurchased}
                <div class="description"><i class="fas fa-check"></i> Ticket purchased</div>
                <button on:click={handlePurchaseTicket}>Sell Ticket</button>
            {:else}
                <div class="description">{data.ticket.description}</div>
                <button on:click={handlePurchaseTicket}>Purchase Ticket</button>
            {/if}
        {:else}
            <div class="description">{data.ticket.description}</div>
            <button><a href="/login">login first to purchase ticket</a></button>
        {/if}
    </div>
</div>
<!-- svelte-ignore a11y-invalid-attribute -->
<p><a href="javascript:history.back()">Go back</a></p>
