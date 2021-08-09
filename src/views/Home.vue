<template>
  <div class="home-main">
    <v-btn class="home-main-button" color="green lighten-1" @click="handleLogin"
      >Log In</v-btn
    >
    <v-btn
      class="home-main-button"
      color="yellow lighten-1"
      @click="router.push('registration')"
      >Register</v-btn
    >
    <v-btn ckass="home-main-button" color="red lighten-1">About</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router/index';
export default {
  name: 'Home',
  data() {
    return {
      router,
    };
  },
  methods: {
    ...mapActions(['fetchOrgData']),
    async handleLogin() {
      router.push('login');
    },
  },
};
</script>

<style scoped>
.home-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  margin: auto;
  padding-top: 15vh;
}
.home-main-button {
  margin-bottom: 5%;
  width: 100%;
}
@media only screen and (max-width: 750px) {
  .home-main {
    width: 50%;
  }
}
</style>
