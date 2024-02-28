<template>
  <section class="sidebar-view">
    <h3>Recent Earthquakes</h3>
    <form>
      <label for="filterInput"
        >Filter Earthquakes
        <input
          placeholder="Filter Earthquakes"
          type="text"
          v-model="filterInput"
          @keyup="filterInputKeyUp(e)"
        />
      </label>
    </form>
    <br /><br />
    <div class="earthquake-list">
      <button
        class="earthquake-list-item"
        v-for="earthquake in getFilteredEarthquakes.features"
        :key="earthquake.properties.time"
        :id="earthquake.properties.code"
        @click="earthquakeClicked(earthquake)"
      >
        {{ earthquake.properties.title }}
      </button>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import {
  updateMapMarkerToSelectedEarthquake,
  highlightSelectedEarthquakeOnList,
  findIndexOfEarthquake,
} from '../utils/mapFunctions';

const filterInput = ref('');

export default {
  name: 'SidebarView',
  data() {
    return {
      filterInput,
    };
  },
  methods: {
    earthquakeClicked(earthquake) {
      const map = this.$store.getters.getMap;
      const index = findIndexOfEarthquake(this.$store.getters.getEarthquakes, earthquake);
      console.log('res', index);
      updateMapMarkerToSelectedEarthquake(map, earthquake, index);
      highlightSelectedEarthquakeOnList(earthquake.properties.code);
      this.$store.commit('setSelectedEarthquake', earthquake);
    },
    filterInputKeyUp() {
      const res = this.$store.state.earthquakes.features.filter(
        (item) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          item.properties.title.toLowerCase().includes(filterInput.value.toLowerCase()),
        // eslint-disable-next-line function-paren-newline
      );
      const filteredEarthquakesNew = {
        ...this.$store.state.earthquakes,
        features: res,
      };
      this.$store.commit('setFilteredEarthquakes', filteredEarthquakesNew);
    },
  },
  computed: {
    earthquakes() {
      return this.$store.getters.getEarthquakes.features;
    },
    selectedEarthquake() {
      return this.$store.getters.getSelectedEarthquake;
    },
    getFilteredEarthquakes() {
      return this.$store.getters.getFilteredEarthquakes;
    },
  },
};
</script>

<style scoped>
section {
  text-align: center;
}
.earthquake-list {
  width: 100%;
}
.earthquake-list-item {
  width: 100%;
  display: block;
  padding: 1rem 0;
  margin: 1rem 0;
}
.earthquake-list-item:hover {
  cursor: pointer;
}
.highlight {
  background-color: grey;
  text-decoration: underline;
  color: white;
  font-weight: 700;
}
</style>
