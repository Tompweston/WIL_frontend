<script lang="ts">
	import SidebarButton from '$lib/components/SidebarButton.svelte';
	import TaskCard from '$lib/components/TaskCard.svelte';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	let { data, form }: PageProps = $props();
	let showModal = $state(false);

	// element refs
	let addBtn: HTMLButtonElement;
	let closeBtn: HTMLButtonElement;
	let cancelBtn: HTMLButtonElement;
	let backdropEl: HTMLDivElement;

	onMount(() => {
		// open modal
		if (addBtn) addBtn.onclick = () => (showModal = true);
	});

	// attach handlers whenever modal appears
	$effect(() => {
		if (!showModal) return;

		if (closeBtn) closeBtn.onclick = () => (showModal = false);
		if (backdropEl)
			backdropEl.onclick = (e: MouseEvent) => {
				if (e.target === e.currentTarget) showModal = false; // click outside modal to close
			};
	});
</script>

<main>
	<section class="navbar">
		<div class="navbar-buttons">
			<!-- OPEN MODAL (native .onclick set in onMount) -->
			<button bind:this={addBtn} class="add-button" type="button">Add</button>

			<SidebarButton text="Urgent" />
			<SidebarButton text="Completed" />
			<SidebarButton text="Incomplete" />
			<form method="POST" action="/?/delete">
				<SidebarButton text="Clear All" />
			</form>
		</div>
	</section>

	<section class="content">
		<div class="card-grid-wrapper">
			{#each data.todos as task}
				<TaskCard taskTitle={task.title} taskDescription={task.description} />
			{:else}
				<p>No Todos found! <br /><br />Get started by adding a new task :)</p>
			{/each}
		</div>
	</section>

	{#if showModal}
		<!-- backdrop -->
		<div
			bind:this={backdropEl}
			class="modal-backdrop"
			role="dialog"
			aria-modal="true"
			aria-labelledby="addTaskTitle"
		>
			<div class="modal">
				<header class="modal-header">
					<h2 id="addTaskTitle">Add Task</h2>
					<button
						bind:this={closeBtn}
						class="close-button"
						type="button"
						aria-label="Close"
					>
						×
					</button>
				</header>

				<form method="POST" action="/?/create">
					{#if form?.missing}
						<p class="error">The title &amp; description field is required</p>
					{/if}

					<div class="form-inputs">
						<label>
							Title
							<input name="title" type="text" required />
						</label>
						<label>
							Description
							<input name="description" type="text" required />
						</label>
					</div>

					<div class="modal-actions">
						<button class="add-button" type="submit">Save</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</main>

<style>
	main{
		display: grid;
		grid-template-rows: 1fr 5fr;
		width: 100%;
	}

	.navbar-buttons {
		display: flex;
		flex-direction: row;
		gap: 4rem;
		padding: 1rem;
		justify-content: space-evenly;
	}

	.card-grid-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		gap: 2vw;
	}

	.content {
		padding: 2vw;
	}

	.add-button {
		background-color: var(--contrast);
		border: 1px solid var(--foreground);
		padding: 0.5rem 1rem;
		text-align: left;
		font-size: 1.5vw;
		cursor: pointer;
		border-radius: 10px;
		color: var(--accent);
		font-family: '8bit', cursive;
		box-shadow: var(--foreground) 4px 4px;
		width: 8rem;
		height: 5vh; 
	}
	.add-button:hover { background-color: var(--accent); color: wheat; }
	.add-button:active { box-shadow: var(--foreground) 1px 1px; transform: translate(4px, 4px); }

	.form-inputs {
		display: flex;
		flex-direction: column;
		gap: 2vw;
		margin-bottom: 2vh;
	}

	/* Modal styles */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		z-index: 1000;
	}
	.modal {
		background: var(--background, #fff);
		color: var(--foreground, #111);
		border: 1px solid var(--foreground);
		border-radius: 12px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		padding: 1.25rem;
		min-width: min(600px, 90vw);
	}
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	.close-button {
		background: transparent;
		border: 1px solid var(--foreground);
		border-radius: 8px;
		font-size: 1.25rem;
		line-height: 1;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
	}
	.modal-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}
	input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--foreground);
        border-radius: 8px;
        font-size: 1rem;
    }
</style>
