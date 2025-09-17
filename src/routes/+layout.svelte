<script lang="ts">
	import "../app.css";
	import logo from '$lib/assets/TOMMY.png';
	let { children } = $props();
</script>

<head>
	<title>Tommy's To-Dos</title>
</head>

<header>
	<div>
		<img src={logo} class="logo" alt="to-do Logo" />
	</div>

	<h1 class="page-title">My Tasks</h1>
</header>

<main>
	<!-- Main content area which is populated in page.svelte -->
	{@render children?.()}
</main>


<style>

	header {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		border-bottom: 2px solid #614432;
		width: 100%;

	}

	header div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	header div:nth-child(1) {
		justify-content: start;
		padding-left: 1rem;
	}

	header div:nth-child(2) {
		align-items: stretch;
	}

	header div:nth-child(3) {
		justify-content: center;
		padding-right: 1rem;
	}

	.logo {
		height: 9rem;
	}

	.page-title{
		font-size: 4.5rem;
		color: var(--accent);
		font-family: 'title';
		font-weight: bolder;
		text-align: center;
	    -webkit-text-stroke: 2px var(--foreground);
		text-shadow: 5px 4px var(--foreground);
		padding: 1rem;
		}
	
</style>

