<script lang="ts">
	// ========================Imports==============================
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import bin from '$lib/assets/bin.svg';
	import edit from '$lib/assets/edit4.svg';
	import submit from '$lib/assets/creamSubmit.svg';
	import cancel from '$lib/assets/creamCancel.svg';
	import lock from '$lib/assets/lock.svg';
	//===============================================================

	// ========================Declarations==========================
	let {
		taskID,
		taskTitle,
		taskDescription,
		taskCompleted,
		editon = $bindable<boolean>(false),
		badInput = $bindable<boolean>(false)
	}: {
		taskID: string;
		taskTitle: string;
		taskDescription: string;
		taskCompleted: boolean;
		editon?: boolean;
		badInput?: boolean;
	} = $props();
	let editable = $state(false);
	let newTitle = $state(taskTitle);
	let newDescription = $state(taskDescription);
	//================================================================

	//========================FUNCTIONS===============================
	const toggleEdit = () => {
		editable = !editable;
		editon = editable;
	};

	const toggleComplete = (taskID: string) => {
		// Submit the form when the checkbox is toggled
		const form = document.getElementById(`complete-form-${taskID}`) as HTMLFormElement;
		form.requestSubmit();
	};

	const cancelEdit = () => {
		toggleEdit();
		taskTitle = taskTitle; // revert title to original
		taskDescription = taskDescription; // revert description to original
		newDescription = taskDescription;
		newTitle = taskTitle;
		badInput = false;
	};

	const checkInputs = () => {
		if (newTitle.length > 40) {
			badInput = true;
		}
		if (newDescription.length > 500) {
			badInput = true;
		}
		if (newTitle.length <= 40 && newDescription.length <= 500) {
			badInput = false;
		}
		if (newTitle.length === 0 || newDescription.length === 0) {
			badInput = true;
		}
	};
	//================================================================
</script>

<div class="task">
	<div class="task-content">
		{#key editable}
			<h3
				contenteditable={editable}
				id={`editable-title-${taskID}`}
				class={editable ? 'task-title-edit' : 'task-title'}
				oninput={(e) => (newTitle = e.currentTarget.textContent ?? taskTitle)}
			>
				{taskTitle}
			</h3>

			<p
				contenteditable={editable}
				id={`editable-description-${taskID}`}
				class={editable ? 'task-description-edit' : 'task-description'}
				oninput={(e) => (newDescription = e.currentTarget.textContent ?? taskDescription)}
			>
				{taskDescription}
			</p>
		{/key}
	</div>
	<div class="togglers">
		<!-- Update Completed Form -->
		{#if editon}
			<div class="checkbox-locked">
				<img src={lock} alt="Locked" class="Locked" />
			</div>
		{:else}
			<form
				id="complete-form-{taskID}"
				method="POST"
				action="?/updateCompleted"
				use:enhance={() => {
					return async ({ result }) => {
						await invalidateAll(); // fix for ensuring that the form consistently updates the DB after the action without needing a page refresh
						await applyAction(result);
					};
				}}
			>
				<!-- Custom Checkbox for completing tasks -->

				<label for="checkbox-{taskID}" class="checkbox-container">
					<input
						id="checkbox-{taskID}"
						type="checkbox"
						name="completed"
						bind:checked={taskCompleted}
						onchange={() => toggleComplete(taskID)}
					/>
					<span class="checkmark"></span>
				</label>
				<input type="text" name="_id" value={taskID} hidden />
			</form>
		{/if}

		<!-- Edit Button -->
		{#if editable === true}
			<form
				id={taskID}
				method="POST"
				action="?/updateTask"
				use:enhance={() => {
					return async ({ result }) => {
						await invalidateAll(); // fix for ensuring that the form consistently updates the DB after the action without needing a page refresh
						await applyAction(result);
						toggleEdit(); // exit edit mode after submitting changes
					};
				}}
			>
				<input type="text" name="_id" value={taskID} hidden />
				<input type="text" name="title" value={newTitle} required maxlength="40" hidden />
				<input
					type="text"
					name="description"
					value={newDescription}
					required
					maxlength="500"
					hidden
				/>
				<!-- Submit Button -->
				<div class="edit-controls">
					<button class="submit-button" onclick={checkInputs} type="submit" disabled={badInput}>
						<img src={submit} alt="submit-icon" class="submit-icon" />
					</button>
					<!-- Cancel Button -->
					<button class="cancel-button" onclick={cancelEdit} type="button">
						<img src={cancel} alt="cancel-icon" class="cancel-icon" />
					</button>
				</div>
			</form>
		{:else}
			<!-- Edit Button -->
			<button class="toggle-button" onclick={toggleEdit} disabled={editon}>
				{#if editon}
					<img src={lock} alt="Locked" class="Locked" />
				{:else}
					<img src={edit} alt="edit-icon" class="edit-icon" />
				{/if}
			</button>
		{/if}
		<!-- Delete Button -->
		<form method="POST" action="?/deleteTask" use:enhance>
			<input type="hidden" name="_id" value={taskID} />
			<button class="toggle-button" disabled={editon}>
				{#if editon}
					<img src={lock} alt="Locked" class="Locked" />
				{:else}
					<img src={bin} alt="Delete" class="delete-icon" />
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	.task {
		padding-left: 1rem;
		background-color: var(--contrast);
		display: grid;
		grid-template-columns: 9fr 1fr;
		min-width: 25vw;
		min-height: 30vh;
		box-shadow: 5px 5px var(--foreground);
	}

	.task-title {
		font-family: '8bit';
		color: var(--foreground);
		font-size: 1.5rem;
		border-radius: 10px;
		padding: 0.5rem;
		line-height: 1.5;
		word-wrap: break-word;
		word-break: break-word;
		max-width: 100%;
		box-sizing: border-box;
	}

	.task-description {
		font-family: body;
		color: var(--foreground);
		font-size: 1rem;
		font-weight: bolder;
		padding: 0.5rem;
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: break-word;
		max-width: 100%;
		box-sizing: border-box;
	}

	.togglers {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
	}

	.toggle-button {
		background-color: var(--yellow);
		color: var(--foreground);
		border: none;
		box-shadow: 3px 3px var(--foreground);
		cursor: pointer;
		padding: 0;
		width: 2.2rem;
		height: 2.2rem;
	}

	.toggle-button:hover {
		background-color: var(--accent);
		color: var(--yellow);
	}

	.toggle-button:active {
		box-shadow: var(--foreground) 0px 0px;
		transform: translate(2px, 2px);
	}

	.toggle-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #c3850b;
	}

	.delete-icon {
		width: 1.5rem;
		height: 2rem;
		cursor: pointer;
	}

	.edit-icon {
		width: 1.5rem;
		height: 2rem;
		cursor: pointer;
	}

	/* Custom Checkbox and checkmark styling*/
	.checkbox-container {
		display: block;
		position: relative;
		cursor: pointer;
	}

	.checkbox-container input {
		position: absolute;
		opacity: 0;
	}

	.checkmark {
		height: 2.2rem;
		width: 2.2rem;
		background-color: var(--cream);
		box-shadow: 3px 3px var(--foreground);
		display: inline-block;
		position: relative; /* ensure :after is positioned relative to the box */
		box-sizing: border-box;
	}

	.checkmark:active {
		box-shadow: var(--foreground) 1px 1px;
		transform: translate(2px, 2px);
	}

	.checkbox-container input:checked ~ .checkmark {
		background-color: var(--accent);
		box-shadow: 1px 1px var(--foreground);
		transform: translate(2px, 2px);
	}

	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}

	.checkbox-container input:checked ~ .checkmark:after {
		display: block;
	}

	.checkbox-container .checkmark:after {
		left: 50%;
		top: 50%;
		width: 0.45vw;
		height: 0.9vw;
		border: solid var(--cream);
		border-width: 0 0.18rem 0.18rem 0;
		transform: translate(-50%, -55%) rotate(45deg);
		box-sizing: border-box;
	}

	/* Edit mode styling*/

	.task-title:focus {
		outline: none;
	}
	.task-description:focus {
		outline: none;
	}

	.cancel-button {
		background-color: #f73802;
		width: 2.2rem;
		height: 2.2rem;
		border: none;
		box-shadow: var(--foreground) 3px 3px;
		cursor: pointer;
	}

	.submit-button {
		background-color: #019b3d;
		width: 2.2rem;
		height: 2.2rem;
		border: none;
		box-shadow: var(--foreground) 3px 3px;
		cursor: pointer;
	}

	.submit-button:active,
	.cancel-button:active {
		box-shadow: var(--foreground) 1px 1px;
		transform: translate(2px, 2px);
	}

	.edit-controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.submit-icon {
		width: 2rem;
		height: 2rem;
		cursor: pointer;
	}

	.task-title-edit {
		font-family: '8bit';
		color: var(--foreground);
		text-decoration: dashed underline var(--accent);
		font-size: 1.5rem;
		border-radius: 10px;
		padding: 0.5rem;
		line-height: 1.5;
		word-wrap: break-word;
		word-break: break-word;
		max-width: 100%;
		box-sizing: border-box;
	}

	.task-description-edit {
		font-family: body;
		color: var(--foreground);
		text-decoration: dashed underline var(--accent);
		font-size: 1rem;
		font-weight: bolder;
		padding: 0.5rem;
		white-space: pre-wrap; /* preserve newlines from textarea */
		word-wrap: break-word;
		word-break: break-word;
		max-width: 100%;
		box-sizing: border-box;
	}

	.task-title-edit:focus {
		outline: none;
	}
	.task-description-edit:focus {
		outline: none;
	}
	.Locked {
		width: 2rem;
		height: 1.5rem;
	}
	.checkbox-locked {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #c3850b;
		background-color: #c3850b;
		color: var(--foreground);
		border: none;
		box-shadow: 3px 3px var(--foreground);
		width: 2.2rem;
		height: 2.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
