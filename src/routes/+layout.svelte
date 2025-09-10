<script lang="ts">
	import "../app.css"
	import logo from '$lib/assets/FinalLogo.png';
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

	.logo {
		height: 10vh;
		will-change: filter;
		transition: filter 300ms, transform 200ms;
	}

	.page-title{
		font-size: 4.5rem;
		color: var(--foreground);
		font-family: 'title';
		font-weight: bolder;
		margin: 0;
		text-align: center;
		text-shadow: 3px 5px 0px var(--peach),
                 6px 8px 0px var(--blue);
		padding: 1rem;
	}

	
</style>

