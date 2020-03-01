<script>
  import Map from '../components/Map.svelte';
  import Header from '../components/Header.svelte';
  import Controls from '../components/Controls.svelte';
</script>


<div class="container">
  <div class="header-container">
    <Header title="Coronavirus spread"></Header>
  </div>
  <div class="map-container">
    <Map />
  </div>
  <div class="controls-container">
    <Controls />
  </div>
</div>

<style>
  main {
    height: 100%;
  }
  .container {
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  .header-container {
    flex: 0 1 auto;
    z-index: 99; /* on top of map-container */
  }
  .map-container {
    flex: 1 1 auto;
    z-index: 20;
    height: 50%; /* Safari (a.k.a: Apple IE) needs a starting height for Leaflet to init... */
  }
  .controls-container {
    flex: 0 1 auto;
    z-index: 42; /* on top of map */
  }


</style>
