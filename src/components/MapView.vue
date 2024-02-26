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
import {
  renderMap,
  addEarthquakesToMap,
  changeMapMarkerOnEvent,
} from '../utils/mapFunctions';

mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;

export default {
  name: 'MapView',
  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12', // Replace with your preferred map style
      center: [-71.224518, 42.213995],
      zoom: 4,
    });
    map.on('load', () => {
      renderMap(map);
      addEarthquakesToMap(map);
    });

    map.on('mousemove', 'earthquakes-viz', (event) => {
      map.getCanvas().style.cursor = 'pointer';
      changeMapMarkerOnEvent(map, event);
    });
    // Create a popup, but don't add it to the map yet.
    // const popup = new mapboxgl.Popup({
    //   closeButton: false,
    //   closeOnClick: false,
    // });

    // map.on('mouseenter', 'places', (e) => {
    //   console.log('helo mouse her');
    //   // Change the cursor style as a UI indicator.
    //   map.getCanvas().style.cursor = 'pointer';

    //   // Copy coordinates array.
    //   const coordinates = e.features[0].geometry.coordinates.slice();
    //   const { description } = e.features[0].properties;

    //   // Ensure that if the map is zoomed out such that multiple
    //   // copies of the feature are visible, the popup appears
    //   // over the copy being pointed to.
    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //   }

    //   // Populate the popup and set its coordinates
    //   // based on the feature found.
    //   popup.setLngLat(coordinates).setHTML(description).addTo(map);
    // });

    // map.on('mouseleave', 'places', () => {
    //   map.getCanvas().style.cursor = '';
    //   popup.remove();
    // });

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
