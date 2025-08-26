<script>
    import SidebarButton from '$lib/components/SidebarButton.svelte';
    import TaskCard from '$lib/components/TaskCard.svelte';
</script>

<main>
    <aside class="sidebar">
        <div class="sidebar-buttons">
            <SidebarButton text="Add Task" />
            <SidebarButton text="Urgent Tasks" />
            <SidebarButton text="Completed Tasks" />
            <SidebarButton text="Incomplete Tasks" />
            <SidebarButton text="Clear All Tasks" />
        </div>
    </aside>
    
    <section class="content">
        <div class="card-grid-wrapper">
            <TaskCard taskTitle="Sample Task 1" taskDescription="This is a description for Sample Task 1." />
            <TaskCard taskTitle="Sample Task 2" taskDescription="This is a description for Sample Task 2." />
            <TaskCard taskTitle="Sample Task 3" taskDescription="This is a description for Sample Task 3." />
            <TaskCard taskTitle="Sample Task 4" taskDescription="This is a description for Sample Task 4." />
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
        border-right: 2px solid #614432;
    }

    .sidebar-buttons {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4rem;
        padding: 1rem;
    }

    .card-grid-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 1rem;
    }

    .content {
        padding: 1rem;
    }
</style>

