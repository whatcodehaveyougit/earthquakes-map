<template>
   <div>
      <Header />
      <div id="page-wrapper">
        <Sidebar />
        <div id="map-container">
          <div id="layout">
            <Map/>
          </div>
        </div>
      </div>
    </div>
</template>

<script >
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
    axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
      .then((response) => {
        this.$store.commit('setEarthquakes', response.data.features);
      })
      .catch((error) => {
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
