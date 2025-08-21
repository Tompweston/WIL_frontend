<script lang="ts">
	import "../app.css"
	import logo from '$lib/assets/todo_vector.png';
	import exit from '$lib/assets/exit.jpg';
	let { children } = $props();
</script>

<header>
	<div>
		<img src={logo} class="logo" alt="to-do Logo" />
	</div>
	<div>
		<h1 class="page-title">Tommy's To-Dos</h1>
	</div>
	<div>
		<img src={exit} class= "exit" alt="Exit Logo" />
	</div>

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

	header div:nth-child(3) {
		justify-content: end;
		padding-right: 1rem;
	}

	.logo {
		height: 15vh;
		will-change: filter;
		transition: filter 300ms, transform 200ms;
	}
	.exit{
		height: 10vh;
		box-shadow: 5px 5px 0px rgb(0, 0, 0);
        border-radius: 1rem;

	}
	.exit:hover {
		filter: drop-shadow(0 0 1.2em #0ac200aa);
		transform: translateY(-2px);
	}

	.page-title{
		font-size: 3vw;
		color: #cc5500;
	}
	

    .logo:hover {
        filter: drop-shadow(0 0 1.2em #f74008aa);
        transform: translateY(-2px);
    }

	footer {
        color: #deb887;
		justify-self: center;
		align-self: flex-end;
		font-size: 1.5vw;
		padding: 1rem;
	}


</style>

