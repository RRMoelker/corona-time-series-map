<script>
	import { onMount } from 'svelte';
  import L from 'leaflet';
  import DataTable from './DataTable.svelte';
  import { spreadColor } from './levels';

  import { loadCsv } from './data/data';

  let data;
  let markersGroup = undefined;
  let a = 2;

  const showDay = (map, sites, dayIdx) => {
      if (markersGroup) {
        map.removeLayer(markersGroup);
      }

      markersGroup = L.layerGroup();
      for (const site of sites) {
        // const site = sites[rowIdx];
        const count = site.count[dayIdx];
        const derivate = site.derivative[dayIdx];
        const latLng = [site.lat, site.lng];

        if (count > 0) {
          const radius = 5 + Math.min(count / 100, 95) * 5000;

          // const marker = L.circleMarker(latLng, {
          //   color: '#ff0000',
          //   radius
          // });

          let color;
          if (derivate == 0) {
            color = spreadColor.stagnant;
          } else if (derivate <= 5) {
            color = spreadColor.low;
          } else if (derivate <= 50) {
            color = spreadColor.medium;
          } else {
            color = spreadColor.high;
          }

          const marker = L.circle(latLng, {
            // color: '#ff0000',
            color,
            radius // Radius of the circle in meters.
          });

          marker.addTo(markersGroup);
        }
      }
      markersGroup.addTo(map)
  };

  const loadMapData = (map) => {

    loadCsv().then(result => {
      data = result;
      const { fullHeader, dayHeader, sites } = result;

      let dayIdx = 0;
      setInterval(() => {
        console.log('showing: ', dayHeader[dayIdx]);
        showDay(map, sites, dayIdx);
        ++dayIdx;
        if (dayIdx > dayHeader.length) {
          dayIdx = 0;
        }
      }, 1000);
    });
	};

	onMount(async () => {
    const lMap = L.map('map').setView([0, 0], 3);

    const wikimediaLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    	minZoom: 1,
    	maxZoom: 19
    });

    wikimediaLayer.addTo(lMap);

    // add a scale to map (left bottom corner scale)
    L.control.scale().addTo(lMap);

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

<DataTable data={data} />
