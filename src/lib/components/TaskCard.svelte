<script lang="ts">
    let {taskTitle, taskDescription}: {taskTitle: string, taskDescription: string} = $props();
</script>

<div class="task">
    <h3 class="task-title">{taskTitle}</h3>
    <p class="task-description">{taskDescription}</p>
</div>

<style>
    .task {
        border: 2px solid var(--foreground);
        border-radius: 10px;
        padding-left: 1rem;
        background-color: var(--contrast);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .task-title {
        font-family: subheading;
        color: var(--foreground)    ;
        font-size: 2.5vw;
        border-radius: 10px;
    }

</style>