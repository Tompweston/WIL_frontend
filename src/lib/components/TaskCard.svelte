<script lang="ts">
    let {taskID, taskTitle, taskDescription, taskCompleted}: {taskID: string | null | undefined, taskTitle: string, taskDescription: string, taskCompleted: boolean} = $props();
    import { Trash2 } from '@lucide/svelte';
    import bin from '$lib/assets/bin.svg';
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
        <form method="POST" action="/?/deleteTask">
            <input type="hidden" name="_id" value={taskID} />
            <button class="delete-button">
                <img src={bin} alt="Delete" class="Bin"/>
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
        box-shadow: 4px 4px var(--foreground);
    }

    .task-title {
        font-family: "8bit";
        color: var(--foreground);
        font-size: 1.5vw;
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
        padding: .5rem;
        white-space: pre-wrap; /* preserve newlines from textarea */
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

    /* Delete button */
    .delete-button {
        background-color: var(--yellow);
        color: var(--foreground);
        border:none;
        box-shadow: 3px 3px var(--foreground);
        cursor: pointer;
        padding: 0;
        width: 2.2rem;
        height: 2.2rem;
    }
    .Bin {
        width: 2rem;
        height: 2rem;
    }

    .delete-button:hover {
        background-color: var(--accent);
        color: var(--yellow);
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
    }

    .checkbox-container input {
        position: absolute;
        opacity: 0;
    }

    .checkmark {
        height: 2rem;
        width: 2rem;
        background-color: var(--cream);
        box-shadow: 3px 3px var(--foreground);
        display: inline-block;
        position: relative; /* ensure :after is positioned relative to the box */
        box-sizing: border-box;
    }

    .checkbox-container input:checked ~ .checkmark {
        background-color: var(--accent);
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
        left: 50%;
        top: 50%;
        width: 0.45vw;
        height: 0.9vw;
        border: solid var(--cream);
        /* small, consistent border widths in vw so scaling matches the box */
        border-width: 0 0.18vw 0.18vw 0;
        transform: translate(-50%, -55%) rotate(45deg);
        box-sizing: border-box;
    }
</style>
