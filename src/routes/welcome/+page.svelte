<script>
    import { userProfile, logout } from '/src/routes/scripts/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let profile;

    userProfile.subscribe(value => {
        profile = value;
    });

    onMount(() => {
        if (!profile) {
            goto('/login')
        }
    })

    const handleLogout = async () => {
        goto('/login');    
        await logout();
    };
</script>

<h1>welcome</h1>
<p>Welcome, {profile.name}</p>

<p>Go to your tickets: <a href="/tickets">tickets</a></p>
<p>Go to line up: <a href="/line-up">tickets</a></p>


<button on:click={handleLogout}>Logout</button>
