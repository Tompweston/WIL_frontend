<script lang="ts">
	let {
		text,
		isActive = $bindable(false),
		pressed
	}: {
		text: string;
		isActive?: boolean;
		pressed?: VoidFunction;
	} = $props();

	// let isActive = $state(false);
</script>

<button onclick={() => (pressed ? pressed() : null)} class:isActive class="sidebar-btn">
	{text}
</button>

<style>
	.sidebar-btn {
		background-color: var(--yellow);
		border: none;
		padding: 0.5rem 1rem;
		text-align: center;
		font-size: 1rem;
		cursor: pointer;
		color: var(--foreground);
		font-family: '8bit';
		box-shadow: var(--foreground) 4px 4px;
		width: 12rem;
		height: 2rem;
	}

	.sidebar-btn:hover {
		background-color: var(--accent);
		color: var(--cream);
	}

	.sidebar-btn:active {
		box-shadow: var(--foreground) 1px 1px;
		transform: translate(4px, 4px);
	}
	.isActive {
		background-color: var(--accent);
		color: var(--cream);
		transform: translate(2px, 2px);
		box-shadow: var(--foreground) 2px 2px;
	}
</style>
