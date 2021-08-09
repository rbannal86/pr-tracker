<template>
  <div class="login-main">
    <h2>Log In</h2>
    <v-text-field
      type="email"
      label="Enter Your Email"
      v-model="email"
      @input="error ? (error = null) : null"
    ></v-text-field>
    <v-text-field
      type="password"
      label="Enter Your Password"
      v-model="password"
      @input="error ? (error = null) : null"
    ></v-text-field>
    <div class="login-main-buttons">
      <v-btn color="green lighten-1" @click="handleLogin">Submit</v-btn>
    </div>
    <div class="login-main-error-section">
      <div v-if="error" class="login-main-error">Log In Failed</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router/index';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: false,
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    async handleLogin() {
      try {
        await this.loginUser({ email: this.email, password: this.password });
        router.push('tracker');
      } catch (error) {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
.login-main {
  width: 60%;
  margin: auto;
  padding-top: 5%;
}
.login-main-buttons {
  display: flex;
  justify-content: space-around;
}
.login-main-error-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5%;
}
.login-main-error {
  margin: auto;
  font-weight: bold;
  color: red;
}
</style>
