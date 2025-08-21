<script>
  import tony from '$lib/assets/tony.jpg';
</script>

<main>
    <img src={tony} alt="Tony" class= "tony"/>
</main>
<style>
    main{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .tony {
        width: 40rem;
        height: 40rem;
        box-shadow: 10px 10px 0px rgb(0, 0, 0);
        border-radius: 1rem;
    }
</style>




