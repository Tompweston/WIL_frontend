<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/TOMMY.png';
	import { signOut } from '$lib/auth/auth-methods';
	import { slide } from 'svelte/transition';
	import { fade } from 'svelte/transition';
	import alert from '$lib/assets/alert.svg';

	let { data, children } = $props();
	let help = $state(false);
	let username = $derived(data.user?.name ?? null);

	const togglehelp = () => {
		help = !help;
	};
</script>

<svelte:head>
	<title>Tommy's To-Dos</title>
</svelte:head>

<header class="page-header">
	<div class="logo-container">
		<img src={logo} class="logo" alt="to-do Logo" />
	</div>
	<div class="title-container">
		{#if username}
			<h1 class="page-title" transition:slide={{ duration: 300 }}>{username}'s Tasks</h1>
		{:else}
			<h1 class="page-title" transition:slide={{ duration: 300 }}>Tommy's To-Dos</h1>
		{/if}
	</div>
	<div class="button-container">
		{#if data.user}
			<button class="help-button" onclick={togglehelp}>Not Working?</button>
			<button class="logout-button" onclick={async () => await signOut()}>Log Out</button>
		{/if}
	</div>
</header>

{#if help}
	<!-- Help Popup -->
	<div class="help-backdrop"></div>
	<div class="help-popup-container" transition:fade={{ duration: 200 }}>
		<header class="help-header">
			<img src={alert} alt="Alert" class="alert" />
			<h1 class="help-title">Fix Guide <br /></h1>
			<button class="close-help" onclick={togglehelp}>X</button>
		</header>
		<div class="help-content">
			<h1>If you're experiencing issues with accessing or creating tasks, this could be why :</h1>
			<br />
			<h2>
				As this website is hosted for free, the server may be temporarily down if you are the first
				person to access it in a while.
			</h2>
			<br />
			<h2>To fix this, please try the following steps:</h2>
			<ol>
				<li>
					Open this link in another tab and wait ~1 min for the server to wake up and load:<a
						href="https://tommys-to-dos-backend.onrender.com"
						target="_blank">https://tommys-to-dos-backend.onrender.com</a
					>
				</li>
				<li>Come back to this tab and refresh the page.</li>
				<li>
					If the problem persists after several attempts, the best option would be to restart your
					browser.
				</li>
			</ol>
		</div>
	</div>
{/if}

<main>
	<!-- Main content area which is populated in page.svelte -->
	<svelte:boundary>
		{@render children?.()}
		{#snippet pending()}
			<p class="loading">Loading...</p>
		{/snippet}
	</svelte:boundary>
</main>

<style>
	.page-header {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--cream);
		z-index: 10;
		align-items: center;
	}

	.logo-container,
	.button-container {
		display: flex;
		align-items: center;
	}

	.logo-container {
		justify-content: start;
		padding-left: 1rem;
	}

	.title-container {
		display: grid;
		place-items: center;
	}

	.button-container {
		justify-content: end;
		padding-right: 2rem;
		gap: 1rem;
	}

	.logo {
		height: 8rem;
	}

	.page-title {
		font-size: 4rem;
		color: var(--yellow);
		font-family: 'title';
		font-weight: bolder;
		-webkit-text-stroke: 2px var(--foreground);
		text-shadow: 5px 4px var(--foreground);
		text-decoration: underline 5px var(--accent);
		text-underline-offset: 0.5rem;
		padding: 1rem;
		overflow-x: hidden;
	}

	main {
		margin-top: 12rem;
	}

	.loading {
		font-family: '8bit';
		font-size: 1.5rem;
		color: var(--foreground);
		text-align: center;
		grid-column: 2;
		grid-row: 6;
	}

	.logout-button {
		justify-self: end;
		align-self: center;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		background-color: var(--accent);
		color: var(--foreground);
		border: 2px solid var(--foreground);
		cursor: pointer;
		box-shadow: 3px 3px var(--foreground);
		font-family: '8bit';
	}

	.logout-button:hover {
		color: var(--cream);
	}

	.logout-button:active {
		box-shadow: var(--foreground) 0px 0px;
		transform: translate(2px, 2px);
	}

	.help-popup-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		border: 2px solid var(--foreground);
		padding: 1rem;
		background-color: var(--contrast);
		box-shadow: var(--foreground) 4px 4px;
		height: 3rem;
		width: auto;
		z-index: 20;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: fit-content;
	}

	.alert {
		width: 3rem;
		height: 3rem;
	}

	.help-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 15;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.help-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 0;
		font-family: '8bit';
		border-bottom: 2px dashed var(--foreground);
		line-height: 1.5;
		gap: 4rem;
		padding: 0.5rem;
	}
	.help-title {
		font-family: '8bit';
		color: var(--foreground);
		font-size: 2.5rem;
		margin: 0;
	}
	.close-help {
		cursor: pointer;
		font-family: '8bit';
		font-weight: bold;
		font-size: 2rem;
		background-color: transparent;
		border: none;
		color: var(--accent);
	}
	.help-content,
	h1,
	h2,
	ol,
	li,
	a {
		padding: 1rem;
		font-size: 1rem;
		font-family: 'Body';
		color: var(--foreground);
		text-align: left;
	}

	.help-content h1 {
		font-size: 1.7rem;
		font-weight: bold;
	}

	.help-button {
		align-self: center;
		margin-left: 1rem;
		padding: 0.7rem 0.3rem;
		font-size: 1rem;
		background-color: var(--cream);
		color: var(--foreground);
		border: 2px solid var(--foreground);
		cursor: pointer;
		box-shadow: 3px 3px var(--foreground);
		font-family: '8bit';
		font-size: small;
	}

	.help-button:hover {
		color: var(--accent);
	}

	.help-button:active {
		box-shadow: var(--foreground) 0px 0px;
		transform: translate(2px, 2px);
	}
	
</style>
