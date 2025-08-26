<script lang="ts">
    let {taskTitle, taskDescription}: {taskTitle: string, taskDescription: string} = $props();
</script>

<div class="task">
    <h3 class="task-title">{taskTitle}</h3>
    <p class="task-description">{taskDescription}</p>
</div>

<style>
    .task {
        border: 2px solid #614432; 
        border-radius: 10px;
        padding-left: 1rem;
        background-color: #EDCFAA;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .task-title {
        font-family: subheading;
        color: #614432;
        font-size: 2.5rem;
        border-radius: 10px;
        margin: 0; /* Remove default margin */
    }

</style>