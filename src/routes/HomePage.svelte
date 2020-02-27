<script>
  import Map from '../components/Map.svelte';
  import Header from '../components/Header.svelte';
  import Controls from '../components/Controls.svelte';
</script>


<div class="container">
  <div class="header-container">
    <Header title="Coronavirus infection map"></Header>
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
  }
  .map-container {
    flex: 1 1 auto;
  }
  .controls-container {
    flex: 0 1 auto;
  }
</style>
