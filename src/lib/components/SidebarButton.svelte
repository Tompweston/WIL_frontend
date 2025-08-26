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
        text-align: left;
        font-size: 1.5vw;
        cursor: pointer;
        border-radius: 10px;
        color: var(--accent);
        font-family: 'subheading', cursive;
        box-shadow: var(--foreground) 4px 4px;
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