<script>
	import { onMount } from 'svelte';
  import L from 'leaflet';
	export let name;

	onMount(async () => {
    const LMap = L.map('map').setView([0, 0], 3);

    const Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    	minZoom: 1,
    	maxZoom: 19
    });

    Wikimedia.addTo(LMap);
  });
</script>

<style>
  #map {
    width: 100%;
    height: 400px;
  }
</style>

<div id="map"></div>
