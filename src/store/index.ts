import { createStore } from 'vuex';

export default createStore({
  state: {
    earthquakes: [],
    selectedEarthquakeID: '',
    filteredEarthquakes: [],
  },
  getters: {
    getEarthquakes(state) {
      return state.earthquakes;
    },
    getSelectedEarthquake(state) {
      return state.selectedEarthquakeID;
    },
    getFilteredEarthquakes(state) {
      return state.filteredEarthquakes;
    },
  },
  mutations: {
    setEarthquakes(state, earthquakes) {
      state.earthquakes = earthquakes;
    },
    setSelectedEarthquakeID(state, selectedEarthquake) {
      state.selectedEarthquakeID = selectedEarthquake;
    },
    setFilteredEarthquakes(state, earthquakes) {
      state.filteredEarthquakes = earthquakes;
    },
  },
  actions: {},
  modules: {},
});
