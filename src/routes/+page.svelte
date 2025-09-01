<script lang="ts">
    import SidebarButton from '$lib/components/SidebarButton.svelte';
    import TaskCard from '$lib/components/TaskCard.svelte';
    import type { PageData } from './$types';

    // `data` is populated by the `load` function in +page.server.ts
    // Exporting `data` makes it available to this component.
    export let data: PageData;
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
            {#if data.todos?.length > 0}
                {#each data.todos as task}
                    <TaskCard taskTitle={task.title} taskDescription={task.description} />
                {/each}
            {:else}
                <p>No Todos found! <br> <br> Get started by adding a new task :)</p>
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

