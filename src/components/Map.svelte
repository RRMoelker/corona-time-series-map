<script>
	import { onMount } from 'svelte';
  import L from 'leaflet';
  import { spreadLevels, spreadColor } from '../levels';
  import { day, dayIdx, sites } from '../store';
  import { createLegend } from '../map/legendControl';
  import { computeCircleRadius } from '../map/calculations';

  let markersGroup = undefined;
  let map;

  const mapCenter = [20, 110]; // China
  let activeProvince = undefined; // Stores selected marker between days to show pop up

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
    addLi(ul, `Infections/day (smooth): ${derivativeA}`);
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
      const activeProvinceMem = activeProvince; // remember active province because pop up removal will delete value. No way around this hack as far as I can tell.
      map.removeLayer(markersGroup);
      activeProvince = activeProvinceMem;
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


        let className = 'virusmarker';
        if(site.active[dayIdx] == 1) {
          // first day of confirmed case
          className += ' first';
        }
        const marker = L.circle(latLng, {
          color: color,
          fillColor: color,
          weight: 4, // px (larger radius means dots are visible zoomed out)
          radius, // Radius of the circle in meters.
          className
        });

        marker.bindPopup(createPopupContent(site, count, derivativeA));

        if (site.province == activeProvince)  {
          // province was selected on different day already, immediately open this pop up
          setTimeout(() => {
            marker.openPopup(); // needs to be called after it is added to the map (but that is outside this loop, hacking with setTimeout).
          }, 10);
        }

        // Whole lot of events and logic to have pop up stay visible between days for both mouse and touch users.
        marker.on('click', function (e) {
          // toggle active marker
          activeProvince = activeProvince == site.province ? undefined : site.province;
        });
        marker.on('mouseover', function (e) {
            this.openPopup();
        });

        marker.on('mouseout', function (e) {
          activeProvince = undefined;
          this.closePopup();
        });
        marker.on('popupclose', () => { // e.g.: closed by user manually
          activeProvince = undefined;
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
      maxZoom: 12,
      zoomControl: false
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

    const el = map.getContainer();
    const width = el.offsetWidth;
    const height = el.offsetHeight

    const isLargeishScreen = width > 700 || height > 700;
    if (isLargeishScreen) {
      new L.Control.Zoom({ position: 'topright' }).addTo(map);
    }

    const isOpen = width > 600 && height > 400;
    const legend = createLegend('bottomright', isOpen);

    legend.addTo(map);

    map.on('click', () => activeProvince = undefined);
  });

  // listen to changes on dayIdx
  $: showDay($sites, $dayIdx);
</script>

<div class="container">
  <div id="map"></div>

  <h1 class="header day">{$day.format('MMM D, YYYY')}</h1>
</div>

<style>
  .container {
    position: relative;
    overflow-x: hidden;
    min-height: 60vh;
    height: 100%;
  }
  .day {
    position: absolute;
    top: 1rem;
    left: 1rem;
    margin: 0;
    padding: 0;
    z-index: 99;
    width: 100%;
    text-align: center;
    mix-blend-mode: difference;
    color: #e2ff00;
  }
  #map {
    z-index: 42;
    width: 100%;
    height: 100%;
  }

  @media(max-width: 415px) {
    .day {
      text-align: left;
      font-size: 1rem;
      width: auto; /* if we leave it at 100% it will get outside of the page bounds on the right on mobile */
    }
  }
  @media(max-height: 415px) { /* duplicate logic of max-width query, svelte doesn't seem to support media query OR */
    .day {
      text-align: left;
      font-size: 1rem;
      width: auto; /* if we leave it at 100% it will get outside of the page bounds on the right on mobile */
    }
  }

  /* Additional marker styling (on top of leaflet) */
  :global(.virusmarker.first) {
    animation: scalein 0.5s ease-out 1;
  }

  /* Legend panel styling */
  :global(.legend-panel) {
    border: solid 2px #777777;
    padding: 0.5rem 1rem;
    background-color: white;
    font-size: 1rem;
  }
  :global(.legend-panel h3) {
    display: inline-block;
    margin: 0;
  }
  :global(.legend-panel .content) {
    height: 100%;
  }
  :global(.legend-panel ul) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  :global(.legend-panel li) {
    display: inline-block;
    flex: 1 1 50%;
  }
  :global(.legend-panel .count) {
    display: inline-block;
    min-width: 5ch;
    text-align: right;
  }
  :global(.legend-panel .indent) {
    padding-left: 2em;
    flex-basis: 100%;
  }
  :global(.legend-panel .swatch) {
    display: inline-block;
    margin-right: 1em;
    width: 1em;
    height: 1em;
    background-color: gray;
  }
  :global(.legend-panel:hover) {
    background-color: #f3f3f3;
  }
  :global(.legend-panel.closed .content) {
    padding: 0.5rem 1rem;
    display: none;
  }
  :global(.legend-panel.open .header) {
    display: none;
  }
  :global(.legend-panel .icon) {
    float: right;
  }
  :global(.legend-panel.open .do-open) {
    display: none;
  }
  :global(.legend-panel.closed .do-close) {
    display: none;
  }
</style>
