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

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    function closeNav() {
        var x = document.getElementById("myTopnav");
        if (x.className.includes("responsive")) {
            x.className = "topnav";
        }
    }
</script>

<header>
    <div class="topnav" id="myTopnav">
        <a href="/" on:click={closeNav}><i class="fas fa-home"></i> Home</a>
        <a href="/about" on:click={closeNav}><i class="fas fa-info-circle"></i> About</a>
        <a href="/line-up" on:click={closeNav}><i class="fas fa-music"></i> Line Up</a>
        <a href="/tickets" on:click={closeNav}><i class="fas fa-ticket"></i> Tickets</a>
        <div class="topnav-right">
            {#if !profile}
            <a href="/login" on:click={closeNav}><i class="fas fa-sign-in-alt"></i> Login</a>
            {:else}
            <a href="/profile" on:click={closeNav}><i class="fas fa-user"></i> {profile.name}</a>
            {/if}
        </div>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="javascript:void(0);" class="icon" on:click={myFunction}>
            <i class="fa fa-bars"></i>
          </a>
    </div>
</header>

<div id="content">
    <slot />
</div>

<footer>
    <a href="/contact"><i class="fas fa-envelope"></i> Contact</a>
</footer>
