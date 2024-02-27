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
  updateMapMarkerToSelectedEarthquake,
  highlightSelectedEarthquakeOnList,
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

    map.on('click', 'earthquakes-viz', (event) => {
      console.log('from map view', event);
      console.log(event.features);
      map.getCanvas().style.cursor = 'pointer';
      const clickedOnEarthquake = event.features[0];
      updateMapMarkerToSelectedEarthquake(map, clickedOnEarthquake, clickedOnEarthquake.id);
      this.$store.commit('setSelectedEarthquake', clickedOnEarthquake);
      highlightSelectedEarthquakeOnList(clickedOnEarthquake.properties.code);
    });
    this.$store.commit('setMap', map);

    this.map = map;
  },
  unmounted() {
    this.map.remove();
    this.map = null;
  },
  watch: {
    '$store.state.filteredEarthquakes': function () {
      if (this.map.getLayer('earthquakes-viz')) {
        // this.map.center: [33.805245183926935, -118.16196929744874] TODO ////
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
