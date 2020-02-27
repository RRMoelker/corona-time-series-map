<script>
	import { onMount } from 'svelte';
  import L from 'leaflet';
  import { spreadLevels, spreadColor } from '../levels';
  import { dayIdx, sites } from '../store';
  import { createLegend } from '../map/legendControl';
  import {computeCircleRadius} from '../map/calculations';

  let markersGroup = undefined;
  let map;

  const mapCenter = [30, 60]; // between Europe and Asia it bit more on the northern hemisphere.

  const addLi = (ul, text) => {
    const li = document.createElement("li");
    li.innerText = text;
    ul.appendChild(li);
  };

  const createPopupContent = (site, count, derivativeA) => {
    const ul = document.createElement("ul");
    addLi(ul, `Province/State: ${site.province}`);
    addLi(ul, `Country/Region: ${site.region}`);
    addLi(ul, `Confirmed: ${count}`);
    addLi(ul, `infect/day (smooth): ${derivativeA}`);
    return ul;
  };

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

        marker.bindPopup(createPopupContent(site, count, derivativeA));
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });

        marker.addTo(markersGroup);
      }
    }
    markersGroup.addTo(map)
  };

	onMount(async () => {
	  const  southWest = L.latLng(-90, -180);
    const northEast = L.latLng(90, 180);
    const bounds = L.latLngBounds(southWest, northEast);

    map = L.map('map', {
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      minZoom: 1.5,
    }).setView(mapCenter, 3);

    // const wikimediaLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    // 	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    // 	minZoom: 1,
    //   maxZoom: 19
    // });

    const esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    });

    esriLayer.addTo(map);

    // add a scale to map (left bottom corner scale)
    L.control.scale().addTo(map);

    const legend = createLegend('bottomright');

    legend.addTo(map);

  });

  // listen to changes on dayIdx
  $: showDay($sites, $dayIdx);
</script>

<div id="map"></div>

<style>
  #map {
    width: 100%;
    min-height: 300px;
    height: 100%;
  }

  :global(.leaflet-container .legend-panel) {
    border: solid 2px #777777;
    background-color: white;
    padding: 0.5rem 1rem;
  }

  :global(.leaflet-container .legend-panel h3) {
    margin: 0;
  }
  :global(.leaflet-container .legend-panel ul) {
    list-style: none;
    padding: 0;
  }
  :global(.leaflet-container .legend-panel .indent) {
    padding-left: 2em;
  }
  :global(.leaflet-container .legend-panel .swatch) {
    display: inline-block;
    margin-right: 1em;
    width: 1em;
    height: 1em;
    background-color: gray;
  }
</style>
