<template>
  <div class="registration-main">
    <h3>Register Your Organization</h3>
    <v-form v-model="valid">
      <v-text-field
        type="email"
        label="Email"
        v-model="email"
        :rules="emailRules"
      ></v-text-field>
      <v-text-field
        :type="show1 ? 'text' : 'password'"
        label="Password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        v-model="password"
        :rules="passwordRules"
      ></v-text-field>
      <v-text-field
        :type="show2 ? 'text' : 'password'"
        label="Retype Password"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show2 = !show2"
        v-model="passwordCheck"
        :rules="passwordCheckRules"
      ></v-text-field>
      <v-text-field
        label="Organization Name"
        v-model="name"
        :rules="nameRules"
      ></v-text-field>
      <v-text-field
        label="PR Warning Threshold"
        type="number"
        hint="How many days should a PR be open before it becomes stale?"
        persistent-hint
        v-model.number="threshold"
        :rules="thresholdRules"
      ></v-text-field>
      <v-text-field
        v-model="currentUser"
        append-icon="mdi-plus-circle-outline"
        @click:append="
          users.push(currentUser);
          currentUser = '';
        "
        label="Add Users"
      ></v-text-field>
      <v-textarea
        label="Users"
        readonly
        v-model="listUsers"
        no-resize
        rows="2"
      ></v-textarea>
      <div class="registration-main-buttons">
        <v-btn
          class="registration-main-button"
          :disabled="!valid"
          color="success"
          @click="handleSubmit"
          width="5rem"
        >
          Submit
        </v-btn>
        <v-btn
          class="registration-main-button"
          color="red lighten-2"
          @click="router.go(-1)"
          width="5rem"
        >
          Back
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router/index';

export default {
  name: 'Registration',
  data() {
    return {
      router,
      valid: false,
      show1: false,
      show2: false,
      currentUser: '',
      users: [],
      name: '',
      nameRules: [(v) => !!v || 'Name is required'],
      threshold: null,
      thresholdRules: [
        (v) => !!v || 'Threshold is required',
        (v) => v >= 0 || 'Threshold must be greater than 0',
      ],
      email: null,
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must have 8+ characters',
        (v) => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        (v) => /(?=.*\d)/.test(v) || 'Must have one number',
        (v) => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]',
      ],
      passwordCheck: '',
      passwordCheckRules: [
        (v) => v === this.password || 'Password does not match',
      ],
    };
  },
  computed: {
    listUsers() {
      return this.users.join(', ');
    },
  },
  methods: {
    ...mapActions(['createNewOrg']),
    async handleSubmit() {
      console.log('Moving to tracker');
      const data = {
        email: this.email,
        password: this.password,
        users: this.users,
        warningThreshold: this.threshold,
        name: this.name,
        deactivated: '',
      };
      await this.createNewOrg(data);

      router.push('tracker');
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.registration-main {
  width: 60%;
  margin: auto;
  padding-top: 5%;
}

.registration-main-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.registration-main-button {
  color: black;
}
</style>
