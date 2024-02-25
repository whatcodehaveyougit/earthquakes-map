<template>
  <section>
    <div v-for="quake in storeEarthquakes" :key="quake.properties.time">
      <p>{{ quake.properties.title }}</p>
    </div>
  </section>
</template>

<script>
// <script lang="ts"> NEED TO TYPE THIS FILE

export default {
  name: 'SidebarView',
  computed: {
    storeEarthquakes() {
      return this.$store.getters.getEarthquakes;
    },
  },
};
</script>

<style scoped>

</style>
