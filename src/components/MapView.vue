<template>
  <section>
    <div id="map-container">
      <div id="layout">
        <div ref="mapContainer" class="map-container"></div>
      </div>
      <div class="quake-info">
        <div><strong>Magnitude:</strong> <span id="mag"></span></div>
        <div><strong>Location:</strong> <span id="loc"></span></div>
        <div><strong>Date:</strong> <span id="date"></span></div>
      </div>
    </div>
  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;

export default {
  name: 'MapView',
  mounted() {
    // Target the span elements used in the sidebar
    const magDisplay = document.getElementById('mag');
    const locDisplay = document.getElementById('loc');
    const dateDisplay = document.getElementById('date');
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12', // Replace with your preferred map style
      center: [-71.224518, 42.213995],
      zoom: 4,
    });
    map.on('load', () => {
      map.addSource('earthquakes', {
        type: 'geojson',
        data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson',
        generateId: true, // This ensures that all features have unique IDs
      });
      map.addLayer({
        id: 'earthquakes-viz',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          // The feature-state dependent circle-radius expression will render
          // the radius size according to its magnitude when
          // a feature's hover state is set to true
          'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              1,
              8,
              1.5,
              10,
              2,
              12,
              2.5,
              14,
              3,
              16,
              3.5,
              18,
              4.5,
              20,
              6.5,
              22,
              8.5,
              24,
              10.5,
              26,
            ],
            5,
          ],
          'circle-stroke-color': '#000',
          'circle-stroke-width': 1,
          // The feature-state dependent circle-color expression will render
          // the color according to its magnitude when
          // a feature's hover state is set to true
          'circle-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              1,
              '#fff7ec',
              1.5,
              '#fee8c8',
              2,
              '#fdd49e',
              2.5,
              '#fdbb84',
              3,
              '#fc8d59',
              3.5,
              '#ef6548',
              4.5,
              '#d7301f',
              6.5,
              '#b30000',
              8.5,
              '#7f0000',
              10.5,
              '#000',
            ],
            '#000',
          ],
        },
      });
    });
    let quakeID = null;

    map.on('mousemove', 'earthquakes-viz', (event) => {
      map.getCanvas().style.cursor = 'pointer';
      // Set constants equal to the current feature's magnitude, location, and time
      const quakeMagnitude = event.features[0].properties.mag;
      const quakeLocation = event.features[0].properties.place;
      const quakeDate = new Date(event.features[0].properties.time);

      // Check whether features exist
      if (event.features.length === 0) return;
      // Display the magnitude, location, and time in the sidebar
      console.log(magDisplay);
      magDisplay.textContent = quakeMagnitude;
      locDisplay.textContent = quakeLocation;
      dateDisplay.textContent = quakeDate;
      console.log(magDisplay);

      // If quakeID for the hovered feature is not null,
      // use removeFeatureState to reset to the default behavior
      if (quakeID) {
        map.removeFeatureState({
          source: 'earthquakes',
          id: quakeID,
        });
      }

      quakeID = event.features[0].id;

      // When the mouse moves over the earthquakes-viz layer, update the
      // feature state for the feature under the mouse
      map.setFeatureState(
        {
          source: 'earthquakes',
          id: quakeID,
        },
        {
          hover: true,
        },
      );
    });
    this.map = map;
  },
  unmounted() {
    this.map.remove();
    this.map = null;
  },
};
</script>

<style>
.map-container {
  flex: 1;
}

.quake-info {
  position: absolute;
  font-family: sans-serif;
  margin-top: 5px;
  margin-left: 5px;
  padding: 5px;
  width: 30%;
  border: 2px solid black;
  font-size: 14px;
  color: #222;
  background-color: #fff;
  border-radius: 3px;
}
</style>
