<script>
	import { onMount } from 'svelte';
    import { handleScroll } from '/src/routes/scripts/scrollHandler.js';

    onMount(() => {
        const cleanup = handleScroll();
        return cleanup;
    });
</script>

<header>
    <div id="topnav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/line-up">Line Up</a>
        <a href="/tickets">Tickets</a>
        <div id="topnav-right">
            <a href="/contact">Contact</a>
            <a href="/login">Login</a>
        </div>
    </div>
</header>

<div id="content">
    <slot />
</div>

<footer>
    <p>Footer</p>
</footer>
