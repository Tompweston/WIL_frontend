<script lang="ts"> 
    let {text}: {text: string}= $props();
</script>

<button class="sidebar-btn">
    {text}
</button>

<style>
    .sidebar-btn {
        background-color: var(--contrast);
        border: 1px solid var(--foreground);
        padding: 0.5rem 1rem;
        text-align: center;
        font-size: 1.5vw;
        cursor: pointer;
        color: var(--foreground);
        font-family: '8bit';
        box-shadow: var(--foreground) 4px 4px;
        width: auto;
        height: 5vh;

    }

    .sidebar-btn:hover {
        background-color: var(--accent);
        color: wheat;
    }

    .sidebar-btn:active {
        box-shadow: var(--foreground) 1px 1px;
        transform: translate(4px, 4px);
    }
</style>