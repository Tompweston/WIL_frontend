<script lang="ts">
    import { onMount } from 'svelte';
    import SidebarButton from '$lib/components/SidebarButton.svelte';
    import TaskCard from '$lib/components/TaskCard.svelte';

    type Todo = {
        title: string;
        description: string;
    };

    let todos: Todo[] = [];

    onMount(async () => {
        const response = await fetch('http://127.0.0.1:8000/tasks/');
        todos = await response.json();
    });
</script>

<main>

    <aside class="sidebar">
        <div class="sidebar-buttons">
            <SidebarButton text="Add " />
            <SidebarButton text="Urgent" />
            <SidebarButton text="Completed" />
            <SidebarButton text="Incomplete" />
            <SidebarButton text="Clear All" />
        </div>
    </aside>
    
    <section class="content">
        <div class="card-grid-wrapper">
            {#if todos.length > 0}
                {#each todos as todo}
                    <TaskCard taskTitle={todo.title} taskDescription={todo.description} />
                {/each}
            {:else}
                <p>Loading todos...</p>
            {/if}
        </div>
    </section>
</main>

<style>
    main{
        display: grid;
        grid-template-columns: 1fr 5fr;
        width: 100%;
	}

    .sidebar {
        border-right: 2px solid var(--foreground);
    }

    .sidebar-buttons {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
        padding: 1rem;
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
</style>

