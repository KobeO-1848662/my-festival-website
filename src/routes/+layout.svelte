<script>
	import { userProfile } from '/src/routes/scripts/auth.js';
	import { onMount } from 'svelte';
    import { handleScroll } from '/src/routes/scripts/scrollHandler.js';
    import { page } from '$app/stores';


    let profile;

    userProfile.subscribe(value => {
        profile = value;
    });

    onMount(() => {
        const cleanup = handleScroll();
        return cleanup;
    });
</script>

<header>
    <div id="topnav">
        <a href="/"><i class="fas fa-home"></i> Home</a>
        <a href="/about"><i class="fas fa-info-circle"></i> About</a>
        <a href="/line-up"><i class="fas fa-music"></i> Line Up</a>
        <a href="/tickets"><i class="fas fa-ticket-alt"></i> Tickets</a>
        <div id="topnav-right">
            {#if !profile}
            <a href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>
            {:else}
            <a href="/welcome"><i class="fas fa-user"></i> {profile.name}</a>
            {/if}
        </div>
    </div>
</header>

<div id="content">
    <slot />
</div>

<footer>
    <a href="/contact"><i class="fas fa-envelope"></i> Contact</a>
</footer>
