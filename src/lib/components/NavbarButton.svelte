<script lang="ts">
	import lock from '$lib/assets/lock.svg';
	let {
		text,
		isActive = $bindable(false),
		disabled = false,
		pressed
	}: {
		text: string;
		isActive?: boolean;
		disabled?: boolean;
		pressed?: VoidFunction;
	} = $props();

	// let isActive = $state(false);
</script>

<button onclick={() => (pressed ? pressed() : null)} class:isActive {disabled} class="sidebar-btn">
	{#if disabled === true}
		<img src={lock} alt="Locked" class="lock" />
	{:else}
		{text}
	{/if}
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
	.sidebar-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #c3850b;
	}
	.lock {
		width: 1.5rem;
		height: 1.3rem;
		z-index: 1;
	}
</style>
