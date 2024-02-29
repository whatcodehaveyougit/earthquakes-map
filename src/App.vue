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
      .get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
      .then((response) => {
        this.$store.commit('setEarthquakes', response.data);
        this.$store.commit('setFilteredEarthquakes', response.data);
        if (response.data.features.length > 0) {
          const longitude = response.data.features[0].geometry.coordinates[0];
          const latitude = response.data.features[0].geometry.coordinates[1];
          this.$store.state.map.flyTo({
            center: [longitude, latitude],
          });
        }
      })
      .catch((error) => {
        document.getElementsByClassName('earthquake-list')[0].innerHTML = `<b>${error}</b>`;
        console.log(error);
      });
  },
})
export default class App extends Vue {}
</script>
