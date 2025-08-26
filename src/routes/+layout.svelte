<script lang="ts">
	import "../app.css"
	import logo from '$lib/assets/taskman.png';
	let { children } = $props();
</script>
<head>
  <title>Tommy's <br> To-Dos</title>
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

<footer> 
	Made with ❤️ 
</footer>

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
		font-size: 4vw;
		color: #614432;
		font-family: 'title2';
		font-weight: bolder;
		margin: 0;
		text-align: center;
	}
	
    .logo:hover {
        filter: drop-shadow(0 0 1.2em #f74008aa);
        transform: translateY(-2px);
    }

	footer {
        color: #deb887;
		font-size: 1vw;
		border-top: 2px solid #614432;
		width: 100%;
		text-align: center;
	}


</style>

