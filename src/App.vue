<template>
  <v-app>
    <v-app-bar app color="green darken-3" dark>
      <h1 class="app-name-header">
        <router-link to="/" class="app-name-router-link">
          PR TRACKER
        </router-link>
      </h1>
      <v-spacer></v-spacer>
      <v-menu left bottom v-if="orgData.id">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="selection in menuOptions"
            :key="selection"
            @click="() => {}"
          >
            <v-list-item-title @click="router.push(menuRoutes[selection])">{{
              selection
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <h2 class="app-org-header">{{ orgData.name }}</h2>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import router from './router/index';

export default {
  name: 'App',
  data: () => ({
    router,
    menuOptions: ['Settings', 'Users', 'Tracker', 'Home'],
    menuRoutes: {
      Settings: 'settings',
      Users: 'users',
      Tracker: 'tracker',
      Home: '/',
    },
  }),
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
.app-name-router-link {
  color: white;
  text-decoration: none;
}
</style>
