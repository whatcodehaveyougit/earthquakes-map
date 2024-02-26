<template>
  <section>
    <h3>Recent Earthquakes</h3>
    <input placeholder="Filter Earthquakes" />
    <br /><br />
    <div class="earthquakes-list">
      <button
        class="earthquake-list-item"
        v-for="earthquake in earthquakes"
        :key="earthquake.properties.time"
        :id="earthquake.properties.code"
        @click="earthquakeClicked(earthquake)"
      >
        {{ earthquake.properties.title }}
      </button>
    </div>

    <b>{{ selectedEarthquake }}</b>
  </section>
</template>

<script>
// <script lang="ts"> NEED TO TYPE THIS FILE

export default {
  name: 'SidebarView',
  methods: {
    earthquakeClicked(earthquake) {
      console.log(earthquake);
    },
  },
  computed: {
    earthquakes() {
      return this.$store.getters.getEarthquakes;
    },
    selectedEarthquake() {
      return this.$store.getters.getSelectedEarthquake;
    },
    getCustomClass(e) {
      return e.properties.ids;
    },
  },
};
</script>

<style scoped>
section {
  text-align: center;
}
.earthquakes-list {
  padding: 1rem 0;
}
.highlight {
  background-color: grey;
  text-decoration: underline;
}
</style>
