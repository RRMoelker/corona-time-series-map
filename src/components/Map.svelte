<script>
	import { onMount } from 'svelte';
  import L from 'leaflet';
  import { spreadLevels, spreadColor } from '../levels';
  import { dayIdx, sites } from '../store';

  import {computeCircleRadius} from '../map/calculations';

  let markersGroup = undefined;
  let map;

  const mapCenter = [30, 60]; // between Europe and Asia it bit more on the northern hemisphere.

  const showDay = (sites, dayIdx) => {
    if(!map) {
      console.warn('leaflet map not yet initialised');
      return;
    }
    if(!sites) {
      console.warn('no data to display on map');
      return;
    }

    if (markersGroup) {
      map.removeLayer(markersGroup);
    }

    markersGroup = L.layerGroup();
    for (const site of sites) {
      const count = site.count[dayIdx];
      const derivativeA = site.derivativeA[dayIdx];
      const latLng = [site.lat, site.lng];

      if (count > 0) {
        const radius = computeCircleRadius(count);

        let color;
        if (derivativeA == spreadLevels.stagnant) {
          color = spreadColor.stagnant;
        } else if (derivativeA <= spreadLevels.low) {
          color = spreadColor.low;
        } else if (derivativeA <= spreadLevels.medium) {
          color = spreadColor.medium;
        } else {
          color = spreadColor.high;
        }

        const marker = L.circle(latLng, {
          color,
          radius // Radius of the circle in meters.
        });

        marker.addTo(markersGroup);
      }
    }
    markersGroup.addTo(map)
  };

	onMount(async () => {
	  const  southWest = L.latLng(-90, -99999);
    const northEast = L.latLng(90, 999999);
    const bounds = L.latLngBounds(southWest, northEast);

    map = L.map('map', {
      maxBounds: bounds,
      maxBoundsViscosity: 1.0
    }).setView(mapCenter, 3);

    const wikimediaLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    	minZoom: 1.5,
    	maxZoom: 19
    });

    wikimediaLayer.addTo(map);

    // add a scale to map (left bottom corner scale)
    L.control.scale().addTo(map);
  });

  // listen to changes on dayIdx
  $: showDay($sites, $dayIdx);
</script>

<style>
  #map {
    width: 100%;
    min-height: 800px;
    height: 100%;
  }
</style>

<div id="map"></div>

