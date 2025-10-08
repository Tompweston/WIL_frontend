<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/TOMMY.png';
	import { signOut } from '$lib/auth/auth-methods';
	import { onMount } from 'svelte';
	import { slide, fly, fade } from 'svelte/transition';
	import { read } from '$app/server';
	
	let { data, children } = $props();
	let ready = $state(false);
	onMount(() => {
		ready = true;
	});
</script>

<head>
	<title>Tommy's To-Dos</title>
</head>

<header>
	<div>
		<img src={logo} class="logo" alt="to-do Logo" />
	</div>
	<div>
		{#if ready && data.user}
			<h1 class="page-title" transition:slide={{ duration: 300 }}>{data.user.name}'s Tasks</h1>
		{:else if ready}
			<h1 class="page-title" transition:slide={{ duration: 300 }}>Tommy's To-Dos</h1>
		{/if}
	</div>
	<div>
		{#if data.user}
			<button onclick={async () =>  await signOut()}>Log Out</button>
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
		align-items: center;
	}

	/* header div {
		display: grid;
		place-items: center;
	} */

	header div:nth-child(1) {
		justify-content: start;
		padding-left: 1rem;
	}

	header div:nth-child(2) {
		display: grid;
		place-items: center;
		background-color: transparent;
	}

	header div:nth-child(3) {
		justify-content: end;
		padding-right: 2rem;
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
