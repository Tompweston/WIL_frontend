<script lang="ts">
	import { fade } from 'svelte/transition';
	import SidebarButton from '$lib/components/NavbarButton.svelte';
	import TaskCard from '$lib/components/TaskCard.svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	let { data, form }: PageProps = $props();
	let term: string = $state('');
	let showModal = $state(false);
    let showcompleted = $state(false);
	let showincomplete = $state(false);
	const toggleModal = () => showModal = !showModal;

	const toggleCompleted = () => {
		showcompleted = !showcompleted;  
		if (showcompleted) showincomplete = false; 
	};
	const toggleIncomplete = () => {
		showincomplete = !showincomplete; 
		if (showincomplete) showcompleted = false; 
	};


	const filtered = $derived.by(() => {
		let tasks = data.todos;
		let filteredTasks = term.trim()
			? tasks.filter(task => task.title.toLowerCase().includes(term.toLowerCase()))
			: tasks
		return filteredTasks;
	})
</script>

<main>
	<div class="bg"></div>
	<section class="navbar">
		<div class="navbar-buttons">
			<!-- This label opens the modal by toggling the hidden checkbox -->
			<!-- <label for="addTaskModal" class="add-button">Add</label> -->
			<SidebarButton text="Completed" pressed={toggleCompleted} isActive={showcompleted} />
			<SidebarButton text="Incomplete" pressed={toggleIncomplete} isActive={showincomplete} />
			<SidebarButton text="Create" pressed={toggleModal} />
			<form method="POST" action="?/delete" use:enhance>
				<SidebarButton text="Clear All" />
			</form>
			<div>
				<input
					class="searchbar"
					type="text"
					name="searchterm"
					placeholder="Search tasks..."
					bind:value={term}
				/>
			</div>
		</div>
	</section>

	<section class="content">
		<div class="card-grid-wrapper"> 
			<!-- Populates the page with task elements and also will determin which cards are to be shown based on the state of filters -->
			{#each filtered as task}
				{#if task._id && !showcompleted && !showincomplete}
					<TaskCard taskTitle={task.title} taskDescription={task.description} taskCompleted={task.completed} taskID={task._id} />
				{:else if task._id && showcompleted && task.completed == true}
					<TaskCard taskTitle={task.title} taskDescription={task.description} taskCompleted={task.completed} taskID={task._id} />
				{:else if task._id && showincomplete && task.completed == false}
					<TaskCard taskTitle={task.title} taskDescription={task.description} taskCompleted={task.completed} taskID={task._id} />
				{/if} 
			{:else}
				<p class="no-todos">No To-Dos Yet! <br /><br /> Add some tasks :)</p>
			{/each}
		</div>
	</section>

	{#if showModal}
		<!-- 2) Modal (shown only when checkbox is checked) -->
		<div transition:fade={{duration:100}} class="modal-backdrop">
			<!-- Clicking the backdrop closes the modal -->
			<label for="addTaskModal" class="backdrop"></label>

			<div class="modal" role="dialog" aria-modal="true" aria-labelledby="addTaskTitle">
				<header class="modal-header">
					<h2 class="addTaskTitle">Add Task</h2>
					<!-- Close button -->
					<button onclick={toggleModal} class="close-button" aria-label="Close">X</button>
				</header>

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
							<textarea class="description-input" name="description" required maxlength="500"></textarea>
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
	main {
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
	.content { padding: 2vw; }

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
	.save-button:hover { background-color: var(--accent); color: var(--cream); }
	.save-button:active { box-shadow: var(--foreground) 1px 1px; transform: translate(4px, 4px); }

	.form-inputs {
		display: flex;
		flex-direction: column;
		gap: 1rem
	}

	/* Modal — hidden by default */
	.modal-backdrop {
		display: block;
		position: fixed;
		inset: 0;
		z-index: 1000;
	}
	

	.backdrop {
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
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
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
        font-family: "8bit";
		border-bottom: 2px dashed var(--foreground);
		line-height: 1.5;
	}

	.close-button {
		cursor: pointer;
        font-family: "8bit";
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
    input{
        background-color: var(--cream);
        width: 100%;
		outline-color: var(--accent);
		font-family: body;
		font-size: large;
		font-weight: bold;
		color: var(--foreground);
    }
    .no-todos{
        font-family: '8bit';
        font-size: 1.5rem;
        color: var(--foreground);
        text-align: center;
        grid-column: 2;
        grid-row: 6;
    }

	.title-input {
		height: 2rem;
		border: 2px solid var(--foreground);
		padding-left: 1rem;
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

	.description-label {
		display: flex;
		flex-direction: column;

	}

	label{
		gap: 1rem;
	}

	.title-label{
		display: flex;
		flex-direction: column;
	}
	.searchbar {
		font-family: '8bit';
		background: var(--accent);
		font-size: 1rem;
		line-height: 1.5;
		padding: 1rem;
		border:none;
		color: var(--cream);
		width: 100%;
		height:60%;
		box-shadow: var(--foreground) 4px 4px;  
		outline-color: var(--accent);
		/* border: 2px solid var(--foreground); */
	}

	.searchbar:focus{
		box-shadow: var(--foreground) 1px 1px;
		transform: translate(3px, 3px);
	}

	input {
		border: none;
	}
	input:focus {
		outline: none;
	}

	input::placeholder {
		color: var(--cream);
	}


</style>
