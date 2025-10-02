<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth/auth-client';
	import { signUp } from '$lib/auth/auth-methods';
	const session = authClient.useSession();
	let name = '';
	let signup_email = '';
	let signup_password = '';
</script>

<main>
{#if !$session.data}
    <div class ="signup-container">   
        <h2 class ="signup-title">Sign Up</h2>

        <input class ="signup-input" placeholder="email" bind:value={signup_email} />

        <input class ="signup-input" placeholder="password" type="password" bind:value={signup_password} />

        <input class ="signup-input" placeholder="name" bind:value={name} />

        <button class ="signup-button" onclick={async () => await signUp(signup_email, signup_password, name)}>
            Sign Up
        </button>
        <div class ="login-prompt">
            <h2 class="prompt">Already have an account?</h2>
            <button class="login-link" onclick={async () => await goto('/login')}>
                Log In
            </button>
         </div>
    </div>

{:else}
    {goto('/')}
{/if}

</main>

<style>
    main {
        display: grid;
        justify-content: center;
        align-items: start;
        gap: 2rem;
    }

    .signup-container {
        display: grid;
        background-color: var(--contrast);
        grid-template-rows: auto;
        align-items: center;
        justify-items: center;
        width: 30rem;
        height: 30rem;
        box-shadow: 5px 5px var(--foreground);

    }

    .login-prompt {
        display: grid;
        background-color: transparent;
        color: var(--foreground);
        grid-template-rows: 1fr 1fr;
        align-items: center;
        justify-items: center;
        width: 20rem;
        height: 5rem;
        justify-self: center;
    }

    .prompt {
        font-size: 1.5rem;
        color: var(--foreground);
        font-family: 'title';
        font-weight: bolder;
        text-align: center;
    }

    .signup-title {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--foreground);
    }
    .signup-input {
        padding: 0.5rem;
        font-size: 1rem;
        width: 25rem;
        border: 2px solid var(--foreground);
        color: var(--foreground);
        background-color: transparent;
    }
    .signup-input:focus {
        border-color: var(--accent);
        border-style: dashed;
        outline: none;
    }

    .signup-input::placeholder {
        color: var(--foreground);
        opacity: 0.7;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: var(--foreground);
        background-color: var(--yellow);
        border: none;
        cursor: pointer;
        box-shadow: 3px 3px var(--foreground);
    }

    button:hover {
        background-color: var(--accent);
        color: var(--cream);
    }

    button:active {
        box-shadow: none;
        transform: translate(3px, 3px);
    }

    .login-link {
        background-color: transparent;
        border: 2px solid var(--foreground);
        color: var(--foreground);
        padding: 0.3rem 0.6rem;
    }
</style>

