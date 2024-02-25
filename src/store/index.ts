import { createStore } from 'vuex';

export default createStore({
  state: {
    earthquakes: [],
  },
  getters: {
    getEarthquakes(state) {
      return state.earthquakes;
    },
  },
  mutations: {
    setEarthquakes(state, earthquakes) {
      state.earthquakes = earthquakes;
    },
  },
  actions: {
  },
  modules: {
  },
});
