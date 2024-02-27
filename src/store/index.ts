import { createStore } from 'vuex';

export default createStore({
  state: {
    earthquakes: [],
    selectedEarthquake: '',
    filteredEarthquakes: [],
    map: {},
  },
  getters: {
    getEarthquakes(state) {
      return state.earthquakes;
    },
    getSelectedEarthquake(state) {
      return state.selectedEarthquake;
    },
    getFilteredEarthquakes(state) {
      return state.filteredEarthquakes;
    },
    getMap(state) {
      return state.map;
    },
  },
  mutations: {
    setEarthquakes(state, earthquakes) {
      state.earthquakes = earthquakes;
    },
    setSelectedEarthquake(state, selectedEarthquake) {
      state.selectedEarthquake = selectedEarthquake;
    },
    setFilteredEarthquakes(state, earthquakes) {
      state.filteredEarthquakes = earthquakes;
    },
    setMap(state, map) {
      state.map = map;
    },
  },
  actions: {},
  modules: {},
});
