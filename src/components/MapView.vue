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
  highlightSelectedEarthquakeOnMap,
  highlightSelectedEarthquakeOnList,
  centerMapToSelectedEarthquake,
} from '../utils/mapFunctions';

mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;

export default {
  name: 'MapView',
  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-116.1088, 44.3923],
      zoom: 4,
    });

    map.on('load', () => {
      renderMap(map, this.$store.getters.getEarthquakes);
      addEarthquakesToMap(map);
    });

    map.on('click', 'earthquakes-viz', (event) => {
      if (event.features.length > 0) {
        map.getCanvas().style.cursor = 'pointer';
        const clickedOnEarthquake = event.features[0];
        // this.$store.commit('setSelectedEarthquake', clickedOnEarthquake);
        centerMapToSelectedEarthquake(map, clickedOnEarthquake);
        highlightSelectedEarthquakeOnList(clickedOnEarthquake.properties.code);
      }
    });
    map.on('mouseover', 'earthquakes-viz', (event) => {
      if (event.features.length > 0) {
        map.getCanvas().style.cursor = 'pointer';
        const clickedOnEarthquake = event.features[0];
        // this.$store.commit('setSelectedEarthquake', clickedOnEarthquake);
        highlightSelectedEarthquakeOnMap(map, clickedOnEarthquake, clickedOnEarthquake.id);
        highlightSelectedEarthquakeOnList(clickedOnEarthquake.properties.code);
      }
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
      const storeMap = this.$store.state.map;
      if (storeMap.getLayer('earthquakes-viz')) {
        storeMap.removeLayer('earthquakes-viz');
        storeMap.removeSource('earthquakes');
        renderMap(storeMap, this.$store.state.filteredEarthquakes);
        addEarthquakesToMap(storeMap);
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

#layout {
  flex: 1;
  display: flex;
  position: relative;
}
</style>
