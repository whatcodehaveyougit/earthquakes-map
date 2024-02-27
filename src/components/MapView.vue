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
  highlightSelectedEarthquake,
} from '../utils/mapFunctions';

mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
let map;
export default {
  name: 'MapView',
  mounted() {
    map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12', // Replace with your preferred map style
      center: [-71.224518, 42.213995],
      zoom: 4,
    });
    map.on('load', () => {
      renderMap(map, this.$store.getters.getEarthquakes);
      addEarthquakesToMap(map);
    });

    map.on('mousemove', 'earthquakes-viz', (event) => {
      map.getCanvas().style.cursor = 'pointer';
      const code = changeMapMarkerOnEvent(map, event);
      this.$store.commit('setSelectedEarthquakeID', code);
      highlightSelectedEarthquake(code);
    });

    this.map = map;
  },
  unmounted() {
    this.map.remove();
    this.map = null;
  },
  watch: {
    '$store.state.filteredEarthquakes': function () {
      if (this.map.getLayer('earthquakes-viz')) {
        this.map.removeLayer('earthquakes-viz');
        this.map.removeSource('earthquakes');
        renderMap(this.map, this.$store.state.filteredEarthquakes);
        addEarthquakesToMap(this.map);
      }
    },
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
