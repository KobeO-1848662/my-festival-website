<script>
    import { login } from '/src/routes/scripts/auth.js';
    import { goto } from '$app/navigation';
    
    let email = '';
    let password = '';
    let error = '';   
  
    const handleLogin = async () => {
        try {
            await login(email, password);
            error = '';
            goto('/profile');
        } catch (err) {
            error = err.message;
        }
    };
</script>

<h1>Log In</h1>
  
<form on:submit|preventDefault={handleLogin}>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Login</button>
</form>
{#if error}
    <p>{error}</p>
{/if}

<p>No account yet? <a href='/register'>sign up here</a></p>