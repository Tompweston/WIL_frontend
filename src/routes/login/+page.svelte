<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/auth/auth-methods';
	let email = '';
	let password = '';
</script>

<main>
	<div class="login-container">
		<h2 class="login-title">Log In</h2>

		<input class="login-input" placeholder="email" bind:value={email} />

		<input class="login-input" placeholder="password" type="password" bind:value={password} />

		<button class="login-button" onclick={async () => await signIn(email, password)}>
			Log In
		</button>
		<div class="signup-prompt">
			<h2 class="prompt">Don't have an account?</h2>
			<button class="signup-link" onclick={async () => await goto('/signup')}> Sign Up </button>
		</div>
	</div>
</main>

<style>
	main {
		display: grid;
		justify-content: center;
		align-items: start;
		gap: 2rem;
	}

	.login-container {
		display: grid;
		background-color: var(--contrast);
		grid-template-rows: auto;
		align-items: center;
		justify-items: center;
		width: 30rem;
		height: 30rem;
		box-shadow: 5px 5px var(--foreground);
	}

	.signup-prompt {
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

	.login-title {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: var(--foreground);
	}
	.login-input {
		padding: 0.5rem;
		font-size: 1rem;
		width: 25rem;
		border: 2px solid var(--foreground);
		color: var(--foreground);
		background-color: transparent;
	}
	.login-input:focus {
		border-color: var(--accent);
		border-style: dashed;
		outline: none;
	}

	.login-input::placeholder {
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

	.signup-link {
		background-color: transparent;
		border: 2px solid var(--foreground);
		color: var(--foreground);
		padding: 0.3rem 0.6rem;
	}
</style>
