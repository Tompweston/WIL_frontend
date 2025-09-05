<script lang="ts">
    import SidebarButton from '$lib/components/SidebarButton.svelte';
    import TaskCard from '$lib/components/TaskCard.svelte';
    import type { PageProps } from './$types';
    let { data, form}: PageProps = $props();
</script>

<main>

    <aside class="sidebar">
        <div class="sidebar-buttons">
            <form method="POST" action="/?/create">
                {#if form?.missing}<p class="error">The title & description field is required</p>{/if}
                <label>
                    Title
                    <input name="title" type="text"> 
                </label>
                <label>
                    Description
                    <input name="description" type="text">
                </label>
                <button class= "add-button" type="submit">Add</button>
            </form>
            <SidebarButton text="Urgent" />
            <SidebarButton text="Completed" />
            <SidebarButton text="Incomplete" />
            <form method="POST" action="/?/delete">
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

    .add-button {
        background-color: var(--contrast);
        border: 1px solid var(--foreground);
        padding: 0.5rem 1rem;
        text-align: left;
        font-size: 1.5vw;
        cursor: pointer;
        border-radius: 10px;
        color: var(--accent);
        font-family: 'subheading', cursive;
        box-shadow: var(--foreground) 4px 4px;
        width: 100%;
    }

    .add-button:hover {
        background-color: var(--accent);
        color: wheat;
    }

    .add-button:active {
        box-shadow: var(--foreground) 1px 1px;
        transform: translate(4px, 4px);
    }
</style>

