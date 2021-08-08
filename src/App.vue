<template>
  <v-app>
    <v-app-bar app color="green darken-3" dark>
      <h1 class="app-name-header">PR TRACKER</h1>
      <v-spacer></v-spacer>
      <h2 class="app-org-header">{{ orgData.name }}</h2>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data: () => ({}),
  computed: mapGetters(['orgData']),
};
</script>

<style scoped>
.app-name-header {
  font-size: 1rem;
}
.app-org-header {
  font-size: 0.8rem;
}
</style>
