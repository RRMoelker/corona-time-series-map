<script>
	import { onMount } from 'svelte';
  import L from 'leaflet';
  import Papa from 'papaparse';
	export let name;

	const loadCsv = (map, url) => {
    let header;

    Papa.parse(url, {
      download: true,
      complete: function(results) {
        console.log(results);

        let data = results.data;header = data[0];
        console.log(data[1]);

        for (let rowIdx = 1; rowIdx < data.length; ++rowIdx) {
          const latLng = [data[rowIdx][2], data[rowIdx][3]];

          const circleMarker = L.circleMarker(latLng, {
              color: '#ff0000'
          }).addTo(map);
        }
      }
    });
	};

	onMount(async () => {
    const lMap = L.map('map').setView([0, 0], 3);

    const Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    	minZoom: 1,
    	maxZoom: 19
    });

    Wikimedia.addTo(lMap);

    const csvUrl = 'http://localhost:8080/time_series_19-covid-Confirmed.csv';
    loadCsv(lMap, csvUrl);
  });
</script>

<style>
  #map {
    width: 100%;
    min-height: 600px;
    height: 100%;
  }
</style>

<div id="map"></div>
