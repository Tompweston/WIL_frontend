<script lang="ts">
    let {taskTitle, taskDescription}: {taskTitle: string, taskDescription: string} = $props();
    import { Trash2 } from '@lucide/svelte';
    import { TriangleAlert } from '@lucide/svelte';
    import { SquarePen } from '@lucide/svelte';
</script>

<div class="task">
    <div class="task-content">
        <h3 class="task-title">{taskTitle}</h3>
        <p class="task-description">{taskDescription}</p>
    </div>
    <div class="togglers">
        <button class="delete-button">
            <Trash2 size="2vw"/>
        </button>
        <button class="edit-button">
            <SquarePen size="2vw"/>
        </button>
        <label class="urgent-button">
            <TriangleAlert size="2vw"/>
        </label>
    </div>
</div>

<style>
    .task {
        border: 2px solid var(--foreground);
        border-radius: 10px;
        padding-left: 1rem;
        background-color: var(--contrast);
        display: grid;
        grid-template-columns: 9fr 1fr;
        flex-direction: column;
        justify-content: flex-start;
        min-width: 25vw;
        min-height: 30vh;

    }

    .task-title {
        font-family: "8bit";
        color: var(--foreground);
        font-size: 1.5vw;
        border-radius: 10px;
        padding: 0.5rem;
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
        padding: .5vw;
        border-left: 2px solid var(--foreground);
    }

    .urgent-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .delete-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .edit-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .edit-button:hover, .delete-button:hover, .urgent-button:hover {
        color: var(--accent);
    }
</style>