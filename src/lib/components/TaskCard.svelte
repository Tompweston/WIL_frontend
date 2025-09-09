<script lang="ts">
    let {taskID, taskTitle, taskDescription, taskCompleted}: {taskID: string | null | undefined, taskTitle: string, taskDescription: string, taskCompleted: boolean} = $props();
    import { Trash2 } from '@lucide/svelte';
</script>

<div class="task">
    <div class="task-content">
        <h3 class="task-title">{taskTitle}</h3>
        <p class="task-description">{taskDescription}</p>
    </div>
    <div class="togglers">
        <!-- Custom Checkbox -->
        <label class="checkbox-container">
            <input type="checkbox" bind:checked={taskCompleted}>
            <span class="checkmark"></span>
        </label>
        <!-- Delete Button -->
        <button class="delete-button">
            <Trash2  size="2vw"/>
        </button>
    </div>
</div>

<style>

    .task {
        border: 2px solid var(--foreground);
        padding-left: 1rem;
        background-color: var(--yellow);
        display: grid;
        grid-template-columns: 9fr 1fr;
        min-width: 25vw;
        min-height: 30vh;
    }

    .task-title {
        font-family: "8bit";
        color: var(--foreground);
        font-size: 1.5vw;
        border-radius: 10px;
        padding: 0.25rem;
        line-height: 1.5;
    }

    .task-description {
        font-family: body;
        color: var(--foreground);
        font-size: 1vw;
        padding: 0.2vw;
    }

    .togglers {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: .5rem;
    }

    /* Delete button */
    .delete-button {
        background: var(--peach);
        border: 1px solid var(--foreground);
        box-shadow: 2px 2px var(--foreground);
        cursor: pointer;
        padding: 0;
    }

    .delete-button:hover {
        color: var(--cream);
    }

    .delete-button:active {
        box-shadow: var(--foreground) 0px 0px;
        transform: translate(2px, 2px);
    }

    /* Custom Checkbox */
    .checkbox-container {
        display: block;
        position: relative;
        cursor: pointer;
        font-size: 1.2vw;
    }

    .checkbox-container input {
        position: absolute;
        opacity: 0;
    }

    .checkmark {
        height: 1.5vw;
        width: 1.5vw;
        background-color: var(--cream);
        border: 2px solid var(--foreground);
        box-shadow: 2px 2px var(--foreground);
        display: inline-block;
    }

    .checkbox-container input:checked ~ .checkmark {
        background-color: var(--peach);
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .checkbox-container input:checked ~ .checkmark:after {
        display: block;
    }

    .checkbox-container .checkmark:after {
        left: 0.45vw;
        top: 0.1vw;
        width: 0.4vw;
        height: 1vw;
        border: solid var(--foreground);
        border-width: 0 0.25vw 0.25vw 0;
        transform: rotate(45deg);
    }
</style>
