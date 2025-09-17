<script lang="ts"> 
    let { 
        text,
        pressed
    }: {
        text: string,
        pressed?: VoidFunction
    }= $props();
</script>

<button onclick={() => pressed ? pressed() : null} class="sidebar-btn">
    {text}
</button>

<style>
    .sidebar-btn {
        background-color: var(--yellow);
        border: none;
        padding: 0.5rem 1rem;
        text-align: center;
        font-size: 1rem;
        cursor: pointer;
        color: var(--foreground);
        font-family: '8bit';
        box-shadow: var(--foreground) 4px 4px;
        width: 12rem;
        height: 3rem;

    }

    .sidebar-btn:hover {
        background-color: var(--accent);
        color: var(--cream);
        box-shadow: var(--foreground) 4px 4px;
    }

    .sidebar-btn:active {
        box-shadow: var(--foreground) 1px 1px;
        transform: translate(4px, 4px);
    }
</style>