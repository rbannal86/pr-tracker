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
    <div>
      <arbitrary-editor :arbitraryData="arbitraryData"></arbitrary-editor>
    </div>
    <div class="login-main-error-section">
      <div v-if="error" class="login-main-error">Log In Failed</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router/index';
import ArbitraryEditor from '../components/ArbitraryEditor.vue'
export default {
  name: 'Login',
  components: {
    ArbitraryEditor
  },
  data() {
    return {
      email: '',
      password: '',
      error: false,
    };
  },
  computed: {
    arbitraryData: {
      get() {
        return { ...this.$store.state.arbitraryData.somethingComplex };
      },
      set(value) {
        console.log('setting', value)
        this.$store.commit('UPDATE_ARBITRARY', value);
        return { ...this.$store.state.arbitraryData.somethingComplex };
      }
    }
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
