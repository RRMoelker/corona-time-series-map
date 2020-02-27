<script>
  import Map from '../components/Map.svelte';
  import Header from '../components/Header.svelte';
  import Controls from '../components/Controls.svelte';
</script>

<Header title="Coronavirus spread over time"></Header>
<Map />
<Controls />

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    min-height: 100%;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
