<script>
    import { register } from '/src/routes/scripts/auth.js';
    let name = 'test';
    let email = 'test.test@gmail.com';
    let password = 'test123';
    let error = '';   
  
    const handleRegister = async () => {
        try {
            await register(email, password, name);
            error = '';
            window.location.href = '/login';
        } catch (err) {
            error = err.message;
        }
    };
</script>
  
<h1>Register</h1>
<form on:submit|preventDefault={handleRegister}>
    <input type="text" bind:value={name} placeholder="Name" required />
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Login</button>
</form>
{#if error}
    <p>{error}</p>
{/if}
