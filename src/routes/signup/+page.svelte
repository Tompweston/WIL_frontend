<script lang="ts">
	import { authClient } from '$lib/auth/auth-client';
	import { signIn, signUp, signOut } from '$lib/auth/auth-methods';
	const session = authClient.useSession();
	let email = '';
	let password = '';
	let name = '';
	let signup_email = '';
	let signup_password = '';
</script>

<div>
    {#if $session.data}
        <div>
            <p>
                {$session?.data?.user.name}
            </p>
            <button onclick={async () => await signOut()}> Sign Out </button>
        </div>
    {:else if !$session.data}
        <h2>Sign In</h2>
        <input placeholder="email" bind:value={email} />

        <input placeholder="password" type="password" bind:value={password} />

        <button onclick={async () => await signIn(email, password)}> Sign In </button>

        <h2>Or Sign Up</h2>

        <input placeholder="email" bind:value={signup_email} />

        <input placeholder="password" type="password" bind:value={signup_password} />

        <input placeholder="name" bind:value={name} />

        <button onclick={async () => await signUp(signup_email, signup_password, name)}>
            Sign Up
        </button>
    {/if}
</div>


<main>Signup Page</main>