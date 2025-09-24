<script lang="ts">
	// ========================Imports==========================
	import { fade } from 'svelte/transition';
	import SidebarButton from '$lib/components/NavbarButton.svelte';
	import TaskCard from '$lib/components/TaskCard.svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import alert from '$lib/assets/alert.svg';
	//==========================================================

	// ================Variable Declarations====================
	let { data, form }: PageProps = $props();
	let term: string = $state('');
	let showModal = $state(false);
	let showcompleted = $state(false);
	let showincomplete = $state(false);
	let editon = $state(false);
	let badInput = $state(false);
	let errorVisible = $state('display: none;');
	//==========================================================

	// ======================FUNCTIONS==========================
	// The function to toggle the modal to appear and disappear
	const toggleModal = () => (showModal = !showModal);

	// The function to toggle the completed filter
	const toggleCompleted = () => {
		showcompleted = !showcompleted;
		if (showcompleted) showincomplete = false;
	};
	// The function to toggle the incomplete filter
	const toggleIncomplete = () => {
		showincomplete = !showincomplete;
		if (showincomplete) showcompleted = false;
	};
	// Filter tasks based on search term
	const filtered = $derived.by(() => {
		let tasks = data.todos;
		let filteredTasks = term.trim()
			? tasks.filter(
					(task) =>
						task.title.toLowerCase().includes(term.toLowerCase()) ||
						task.description.toLowerCase().includes(term.toLowerCase())
				)
			: tasks;
		if (showcompleted) {
			filteredTasks = filteredTasks.filter((task) => task.completed);
		}
		if (showincomplete) {
			filteredTasks = filteredTasks.filter((task) => !task.completed);
		}
		return filteredTasks;
	});
	//===========================================================
</script>

<main>
	<nav class="navbar">
		
		<!-- Completed Filter Button -->
		<SidebarButton
			text="Completed"
			pressed={toggleCompleted}
			isActive={showcompleted}
			disabled={editon}
		/>
		<!-- Incomplete Filter Button -->
		<SidebarButton
			text="Incomplete"
			pressed={toggleIncomplete}
			isActive={showincomplete}
			disabled={editon}
		/>
		<!-- Create Button -->
		<SidebarButton text="Create" pressed={toggleModal} disabled={editon} />

		<!-- Clear All Form & Button -->
		<form method="POST" action="?/delete" use:enhance>
			<SidebarButton text="Clear All" disabled={editon} />
		</form>

		<!-- Search Bar -->
		<div>
			<input
				class="searchbar"
				type="text"
				name="searchterm"
				placeholder="Search tasks..."
				bind:value={term}
				disabled={editon}
			/>
		</div>
	</nav>

	<!-- Content Area -->
	<div class="content">
		{#if badInput}
			<!-- Error Popup -->
			<label for="error-popup" class="error-backdrop"></label>
			<div class="error-popup" transition:fade={{ duration: 200 }}>
				<header class="error-header">
					<img src={alert} alt="Alert" class="alert" />
					<h1 class="error-title">ERROR <br /></h1>
					<button class="close-error" onclick={() => (badInput = false)}>X</button>
				</header>
				<p class="error-message">
					Title can't be more than 40 characters or empty! <br /> <br />
					Description can't be more than 500 characters or empty!
				</p>
			</div>
		{/if}
		<div class="card-grid-wrapper" transition:fade={{ duration: 200 }}>
			<!-- Populates the page with task elements and also will determin which cards are to be shown based on the state of filters -->
			{#each filtered as task}
				{#if task._id}
					<TaskCard
						taskTitle={task.title}
						taskDescription={task.description}
						taskCompleted={task.completed}
						taskID={task._id}
						bind:editon
						bind:badInput
					/>
				{/if}
			{:else}
				<p class="no-todos">No Tasks Found!</p>
			{/each}
		</div>
	</div>

	{#if showModal}
		<!-- Modal (shown only when checkbox is checked) -->
		<div transition:fade={{ duration: 100 }} class="modal-backdrop">
			<!-- Backdrop to create contrast between modal and content -->
			<label for="addTaskModal" class="create-form-backdrop"></label>

			<!-- Modal Content -->
			<div class="modal" role="dialog" aria-modal="true" aria-labelledby="addTaskTitle">
				<header class="modal-header">
					<h2 class="addTaskTitle">Add Task</h2>

					<!-- Close button -->
					<button onclick={toggleModal} class="close-button" aria-label="Close">X</button>
				</header>

				<!-- The form inside the modal to create a new task -->
				<form method="POST" action="?/create" onsubmit={toggleModal} use:enhance>
					{#if form?.missing}
						<p class="error">The title & description field is required</p>
					{/if}
					<div class="form-inputs">
						<label class="title-label">
							-Title-
							<input class="title-input" name="title" type="text" required maxlength="40" />
						</label>
						<label class="description-label">
							-Description-
							<textarea class="description-input" name="description" required maxlength="500"
							></textarea>
						</label>
					</div>

					<div class="modal-actions">
						<button class="save-button" type="submit">Save</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</main>

<style>
	/* Major elements styling */
	main {
		display: grid;
		grid-template-rows: auto 1fr;
		width: 100%;
	}

	.navbar {
		position: fixed;
		top: 10rem;
		transform: translateY(-50%);
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 4rem;
		padding: 1rem;
		justify-content: space-evenly;
		border-bottom: 2px solid var(--foreground);
		border-top: 2px solid var(--foreground);
		background-color: var(--cream);
		z-index: 10;
	}

	.card-grid-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		gap: 2rem;
	}

	.content {
		padding: 2rem;
	}

	.no-todos {
		font-family: '8bit';
		font-size: 1.5rem;
		color: var(--foreground);
		text-align: center;
		grid-column: 2;
		grid-row: 6;
	}

	/* Create Modal styling */
	.save-button {
		background-color: var(--yellow);
		border: 1px solid var(--foreground);
		color: var(--foreground);
		padding: 0.5rem 1rem;
		text-align: center;
		font-size: 1.5rem;
		cursor: pointer;
		font-family: '8bit';
		box-shadow: var(--foreground) 4px 4px;
		width: auto;
		height: 5vh;
		outline-color: var(--accent);
	}
	.save-button:hover {
		background-color: var(--accent);
		color: var(--cream);
	}
	.save-button:active {
		box-shadow: var(--foreground) 1px 1px;
		transform: translate(4px, 4px);
	}


	.form-inputs {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.modal-backdrop {
		display: block;
		position: fixed;
		inset: 0;
		z-index: 1000;
	}

	.create-form-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: var(--background, #fff);
		color: var(--foreground, #111);
		border: 1px solid var(--foreground);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		padding: 1.25rem;
		min-width: min(600px, 90vw);
		box-shadow: 4px 4px var(--foreground);
		background-color: var(--contrast);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		font-family: '8bit';
		border-bottom: 2px dashed var(--foreground);
		line-height: 1.5;
	}

	.close-button {
		cursor: pointer;
		font-family: '8bit';
		font-weight: bold;
		font-size: x-large;
		background-color: transparent;
		border: none;
		color: var(--foreground);
	}

	.modal-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.title-input {
		height: 2rem;
		border: 2px solid var(--foreground);
		padding-left: 1rem;
		background-color: var(--cream);
		width: 100%;
		outline-color: var(--accent);
		font-family: body;
		font-size: large;
		font-weight: bold;
		color: var(--foreground);
	}

	textarea {
		vertical-align: top;
		color: var(--foreground);
		font-family: body;
		font-weight: bold;
		font-size: large;
		background-color: var(--cream);
		border: 2px solid var(--foreground);
		padding: 1rem;
		outline-color: var(--accent);
		scrollbar-color: var(--foreground) var(--contrast);
	}

	textarea:focus {
		outline: none;
	}

	.description-label {
		display: flex;
		flex-direction: column;
	}

	label {
		gap: 1rem;
	}

	.title-label {
		display: flex;
		flex-direction: column;
	}

	/* Search Bar styling */
	.searchbar {
		font-family: '8bit';
		background: transparent;
		font-size: 1rem;
		line-height: 1.5;
		padding: 1rem;
		border: 2px solid var(--foreground);
		color: var(--foreground);
		height: 1rem;
		outline-color: var(--accent);
	}

	.searchbar:disabled {
		opacity: 0.5;
		pointer-events: none;
		cursor: not-allowed;
	}

	.searchbar:focus {
		outline: none;
		background-color: var(--accent);
		color: var(--cream);
	}

	input {
		border: none;
	}

	input:focus {
		outline: none;
	}

	.searchbar:focus::placeholder {
		color: var(--cream);
	}

	input::placeholder {
		color: var(--foreground);
	}

	/* Error Popup styling */

	.error-message {
		font-family: 'title';
		color: var(--foreground);
		font-size: 1rem;
		text-align: left;
	}
	.error-popup {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		border: 2px solid var(--foreground);
		padding: 0.5rem;
		background-color: var(--contrast);
		box-shadow: var(--foreground) 4px 4px;
		height: 3rem;
		width: auto;
		z-index: 1000;
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

	.error-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.error-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-bottom: -1rem;
		font-family: '8bit';
		border-bottom: 2px dashed var(--foreground);
		line-height: 1.5;
		gap: 4rem;
		padding: 0.5rem;
	}
	.error-title {
		font-family: '8bit';
		color: var(--foreground);
		font-size: 2.5rem;
		margin: 0;
	}
	.close-error {
		cursor: pointer;
		font-family: '8bit';
		font-weight: bold;
		font-size: 2rem;
		background-color: transparent;
		border: none;
		color: var(--accent);
	}
	.error-message {
		font-family: body;
		padding: 0.5rem;
		font-weight: 700;
		font-size: 1.2rem;
	}
</style>
