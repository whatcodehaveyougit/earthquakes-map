<template>
  <div>
    <Header />
    <div id="page-wrapper">
      <Sidebar />
      <Map />
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import Header from './components/HeaderView.vue';
import Sidebar from './components/SidebarView.vue';
import Map from './components/MapView.vue';
import 'mapbox-gl/dist/mapbox-gl.css';

@Options({
  components: {
    Map,
    Header,
    Sidebar,
  },
  mounted() {
    axios
      .get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojso')
      .then((response) => {
        console.log(response.data);
        this.$store.commit('setEarthquakes', response.data);
        this.$store.commit('setFilteredEarthquakes', response.data);
      })
      .catch((error) => {
        document.getElementsByClassName('earthquake-list').item(0).innerHTML =
          'Error loading data from API';
        console.log(error);
      });
  },
})
export default class App extends Vue {}
</script>

<style>
#layout {
  flex: 1;
  display: flex;
  position: relative;
}
</style>
