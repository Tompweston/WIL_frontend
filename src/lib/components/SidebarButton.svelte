<script lang="ts"> 
    let {text}: {text: string}= $props();
</script>

<button class="sidebar-btn">
    {text}
</button>

<style>
    .sidebar-btn {
        background-color: #EDCFAA;
        border: 1px solid #614432;
        padding: 0.5rem 1rem;
        text-align: left;
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
</style>