import { createStore } from 'vuex';

export default createStore({
  state: {
    earthquakes: [],
    selectedEarthquakeID: '',
  },
  getters: {
    getEarthquakes(state) {
      return state.earthquakes;
    },
    getSelectedEarthquake(state) {
      return state.selectedEarthquakeID;
    },
  },
  mutations: {
    setEarthquakes(state, earthquakes) {
      state.earthquakes = earthquakes;
    },
    setSelectedEarthquakeID(state, selectedEarthquake) {
      state.selectedEarthquakeID = selectedEarthquake;
    },
  },
  actions: {},
  modules: {},
});
