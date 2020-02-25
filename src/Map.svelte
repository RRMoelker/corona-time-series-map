<script>
	import { onMount } from 'svelte';
  import L from 'leaflet';

  import { loadCsv } from './data/data';

  let markersGroup = undefined;
  const showDay = (map, data, dayIdx) => {
      if (markersGroup) {
        map.removeLayer(markersGroup);
      }

      markersGroup = L.layerGroup();
      for (let rowIdx = 1; rowIdx < data.length; ++rowIdx) {
          const count = data[rowIdx][dayIdx + 4];
          const latLng = [data[rowIdx][2], data[rowIdx][3]];

          if (count > 0) {

            const radius = 5 + Math.min(count / 100, 95);

            const marker = L.circleMarker(latLng, {
              color: '#ff0000',
              radius
            });
            marker.addTo(markersGroup);
          }
      }
      markersGroup.addTo(map)
  };

  const loadMapData = (map) => {

    loadCsv().then(({data, header}) => {

      let dayIdx = 0;
      setInterval(() => {
        console.log('showing: ', header[4 + dayIdx]);
        showDay(map, data, dayIdx);
        ++dayIdx;
        if (dayIdx > data[0].length - 4) {
          dayIdx = 0;
        }
      }, 1000);
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


    loadMapData(lMap);
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
