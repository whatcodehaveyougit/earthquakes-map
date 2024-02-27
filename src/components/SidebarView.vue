<template>
  <section>
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
    <div class="earthquakes-list">
      <button
        class="earthquake-list-item"
        v-for="earthquake in filteredEarthquakes"
        :key="earthquake.properties.time"
        :id="earthquake.properties.code"
        @click="earthquakeClicked(earthquake)"
      >
        {{ earthquake.properties.title }}
      </button>
    </div>
    <!-- {{ filter }} -->
    <!-- <b>{{ selectedEarthquake }}</b> -->
  </section>
</template>

<script>
import { ref } from 'vue';

const filterInput = ref('');

export default {
  name: 'SidebarView',
  data() {
    return {
      filteredEarthquakes: [],
      filterInput,
      // store,
    };
  },
  methods: {
    earthquakeClicked(earthquake) {
      console.log(earthquake);
    },
    filterInputKeyUp() {
      const res = this.$store.state.earthquakes.features.filter(
        (item) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          item.properties.title.includes(filterInput.value),
        // eslint-disable-next-line function-paren-newline
      );
      this.filteredEarthquakes = res;
    },
  },
  watch: {
    '$store.state.earthquakes': function () {
      this.filteredEarthquakes = this.$store.state.earthquakes.features;
    },
  },
  computed: {
    earthquakes() {
      return this.$store.getters.getEarthquakes.features;
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
