
<main>
    <aside class="sidebar">
        <div class="sidebar-buttons">
            <button class="sidebar-btn">Add Task</button>
            <button class="sidebar-btn">Urgent Tasks</button>
            <button class="sidebar-btn">Completed Tasks</button>
            <button class="sidebar-btn">Incomplete Tasks</button>
            <button class="sidebar-btn">Clear All Tasks</button>
        </div>
    </aside>
    
    <section class="content">
        <div class="card-grid-wrapper">
            <div class="card">
                <h3 class="card-title">Task 1</h3>
                <p class="card-description">Description for task 1</p>
            </div>
            <div class="card">
                <h3 class="card-title">Task 2</h3>
                <p class="card-description">Description for task 2</p>
            </div>
            <div class="card">
                <h3 class="card-title">Task 3</h3>
                <p class="card-description">Description for task 3</p>
            </div>
            <div class="card">
                <h3 class="card-title">Task 4</h3>
                <p class="card-description">Description for task 4</p>
            </div>
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

    .sidebar-btn {
        background-color: #EDCFAA;
        border: 1px solid #614432;
        padding: 0.5rem 1rem;
        text-align: center;
        font-size: x-large;
        cursor: pointer;
        border-radius: 10px;
        color: #de603b;
        font-family: 'subheading', cursive;
        box-shadow: #614432 4px 4px;
    }

    .sidebar-btn:hover {
        background-color: #de603b;
        color: wheat;
    }

    .sidebar-btn:active {
        box-shadow: #614432 1px 1px;
        transform: translate(4px, 4px);
    }

    .card-grid-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 1rem;
    }

    .card {
        border: 2px solid #614432; 
        border-radius: 10px;
        padding-left: 1rem;
        background-color: #EDCFAA;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .content {
        padding: 1rem;
    }

    .card-title {
        font-family: subheading;
        color: #614432;
        font-size: 2.5rem;
        border-radius: 10px;
        margin: 0; /* Remove default margin */
    }
</style>

