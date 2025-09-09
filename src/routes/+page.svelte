<script lang="ts">
	import SidebarButton from '$lib/components/NavbarButton.svelte';
	import TaskCard from '$lib/components/TaskCard.svelte';
	import type { PageProps } from './$types';
	let { data, form }: PageProps = $props();
</script>

<main>
	<div class="bg"></div>
	<section class="navbar">
		<div class="navbar-buttons">
			<!-- This label opens the modal by toggling the hidden checkbox -->
			<label for="addTaskModal" class="add-button">Add</label>
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
				<TaskCard taskTitle={task.title} taskDescription={task.description} taskCompleted={task.completed} taskID={task._id} />
			{:else}
				<p class="no-todos">No Todos Yet! <br /><br /> Add some tasks :)</p>
			{/each}
		</div>
	</section>

	
	<!-- 1) Hidden checkbox controls visibility -->
	<input id="addTaskModal" type="checkbox" hidden />

	<!-- 2) Modal (shown only when checkbox is checked) -->
	<div class="modal-backdrop">
		<!-- Clicking the backdrop closes the modal -->
		<label for="addTaskModal" class="backdrop"></label>

		<div class="modal" role="dialog" aria-modal="true" aria-labelledby="addTaskTitle">
			<header class="modal-header">
				<h2 class="addTaskTitle">Add Task</h2>
				<!-- Close button -->
				<label for="addTaskModal" class="close-button" aria-label="Close">X</label>
			</header>

			<form method="POST" action="/?/create">
				{#if form?.missing}
					<p class="error">The title & description field is required</p>
				{/if}

				<div class="form-inputs">
					<label>
						Title
						<input class="title-input" name="title" type="text" required />
					</label>
					<label class="description-label">
						Description
						<textarea class="description-input" name="description" required></textarea>
					</label>
				</div>
				<div class="modal-actions">
					<button class="add-button" type="submit">Save</button>
				</div>
			</form>
		</div>
	</div>
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

	.add-button {
		background-color: var(--yellow);
		border: 1px solid var(--foreground);
        color: var(--foreground);
		padding: 0.5rem 1rem;
		text-align: center;
		font-size: 1.5vw;
		cursor: pointer;
		font-family: '8bit';
		box-shadow: var(--foreground) 4px 4px;
		width: auto;
		height: 5vh;
	}
	.add-button:hover { background-color: var(--accent); color: var(--cream); }
	.add-button:active { box-shadow: var(--foreground) 1px 1px; transform: translate(4px, 4px); }

	.form-inputs {
		display: flex;
		flex-direction: column;
		gap: 2vw;
		margin-bottom: 2vh;
	}

	/* Modal — hidden by default */
	.modal-backdrop {
		display: none;
		position: fixed;
		inset: 0;
		z-index: 1000;
	}

	/* Show modal when checkbox is checked */
	#addTaskModal:checked ~ .modal-backdrop {
		display: block;
	}

	/* Clickable dimmed backdrop that closes modal */
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
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
        font-family: "8bit";
	}

	.close-button {
		border-radius: 8px;
		padding: 0.25rem 0.6rem;
		cursor: pointer;
		user-select: none;
        font-family: "8bit";
        font-weight: bold;
        font-size: x-large;
	}

	.modal-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}
    input{
        background-color: blanchedalmond;
        width: 100%;
    }
    .no-todos{
        font-family: '8bit';
        font-size: 1.5vw;
        color: var(--foreground);
        text-align: center;
        grid-column: 2;
        grid-row: 2;
    }


	.title-input {
		height: 2rem;
		border: 1px solid var(--foreground);
		background-color: var(--contrast); 
		padding-left: 1rem;
	}

	textarea {
        vertical-align: top; 
		font-family: body;
		font-weight: bold;
		background-color: var(--contrast);
		border: 1px solid var(--foreground);
		padding: 1rem;
		outline-color: var(--accent); 
	}

	.description-label {
		display: flex;
		flex-direction: column;
	}

	input:focus {
        outline-color: var(--accent); 
    }


</style>
