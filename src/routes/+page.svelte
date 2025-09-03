<script lang="ts">
    import SidebarButton from '$lib/components/SidebarButton.svelte';
    import TaskCard from '$lib/components/TaskCard.svelte';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<main>

    <aside class="sidebar">
        <div class="sidebar-buttons">
            <SidebarButton text="Add " />
            <SidebarButton text="Urgent" />
            <SidebarButton text="Completed" />
            <SidebarButton text="Incomplete" />
            <form style="width: 100%;"method="POST" action="?/delete">
                <SidebarButton text="Clear All" />
            </form>
        </div>
    </aside>
    
    <section class="content">
        <div class="card-grid-wrapper">
            {#each data.todos as task}
                <TaskCard taskTitle={task.title} taskDescription={task.description} />
            {:else}
                <p>No Todos found! <br> <br> Get started by adding a new task :)</p>
            {/each}
        
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

