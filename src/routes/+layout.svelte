<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/TOMMY.png';
	import {signOut} from '$lib/auth/auth-methods';
	let { children } = $props();
	import { authClient } from "$lib/auth/auth-client";
 	const session = authClient.useSession();
	$state(username) = $session.data?.user.name;
</script>

<head>
	<title>Tommy's To-Dos</title>
</head>

<header>
	<div>
		<img src={logo} class="logo" alt="to-do Logo" />
	</div>
	{#if $session.data?.user.name}
		<h1 class="page-title"> {name}'s Tasks</h1>
	{:else}
		<h1 class="page-title">Tommy's To-Dos</h1>
	{/if}
	<div>
		{#if $session.data}
			<button onclick={async () => await signOut()}>Log Out</button>
		{/if}
	</div>
</header>

<main>
	<!-- Main content area which is populated in page.svelte -->
	{@render children?.()}
</main>

<style>
	header {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--cream);
		z-index: 10;
	}

	header div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	header div:nth-child(1) {
		justify-content: start;
		padding-left: 1rem;
		align-items: end;
	}

	header div:nth-child(2) {
		align-items: stretch;
	}

	header div:nth-child(3) {
		justify-content: center;
		padding-right: 1rem;
	}

	.logo {
		height: 8rem;
	}

	.page-title {
		font-size: 4rem;
		color: var(--yellow);
		font-family: 'title';
		font-weight: bolder;
		text-align: center;
		-webkit-text-stroke: 2px var(--foreground);
		text-shadow: 5px 4px var(--foreground);
		text-decoration: underline 5px var(--accent);
		text-underline-offset: 0.5rem;
		padding: 1rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		overflow-x: hidden;
	}

	main {
		margin-top: 12rem;
	}

	button {
		justify-self: end;
		align-self: center;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		background-color: var(--accent);
		color: var(--foreground);
		border: 2px solid var(--foreground);
		border-radius: 0.5rem;
		cursor: pointer;
	}
</style>
