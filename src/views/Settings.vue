<template>
  <div class="settings-main">
    <h2 class="settings-header">Settings for {{ orgData.name }}</h2>
    <div class="settings-section">
      <h3>Modify Users</h3>
      <h6 class="settings-users-subheader">
        Click a name to remove it from a list
      </h6>
      <v-divider color="gray"></v-divider>
      <div class="settings-users-lists">
        <div class="settings-users-list">
          <h4>Current Users</h4>
          <div v-for="user in displayCurrent(orgData.users)" :key="user">
            <h5 @click="removeFromList('currentUsers', user)">
              {{ user }}
            </h5>
          </div>
        </div>
        <div class="settings-users-list">
          <h4>Adding Users</h4>
          <div v-for="user in addedUsers" :key="user">
            <h5 @click="removeFromList('addedUsers', user)">{{ user }}</h5>
          </div>
        </div>
        <div class="settings-users-list">
          <h4>Removing Users</h4>
          <div v-for="user in removedUsers" :key="user + '-removed'">
            <h5 @click="removeFromList('removedUsers', user)">{{ user }}</h5>
          </div>
        </div>
      </div>
      <v-text-field
        label="Add User"
        append-icon="mdi-plus-circle-outline"
        @click:append="addUser"
        v-model="newUserName"
      ></v-text-field>
    </div>
    <div class="settings-section">
      <h3>Modify PR Threshold</h3>
      <v-divider color="gray"></v-divider>
      <span>Current Threshold: {{ orgData.warningThreshold }}</span>
      <v-text-field
        type="number"
        label="Input New Setting"
        v-model.number="updatedThreshold"
        :rules="thresholdRules"
      ></v-text-field>
    </div>
    <div class="settings-section">
      <h3>Change Organization Name</h3>
      <v-divider color="gray"></v-divider>
      <span>Current Name: {{ orgData.name }}</span>
      <v-text-field label="Input New Name" v-model="updatedName"></v-text-field>
    </div>
    <div class="settings-buttons">
      <v-btn color="green lighten-2" class="settings-button" @click="handleSave"
        >Save</v-btn
      >
      <v-btn color="red lighten-2" class="settings-button">Cancel</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from '../router/index';

export default {
  name: 'Settings',
  data() {
    return {
      newUserName: '',
      addedUsers: [],
      removedUsers: [],
      currentUsers: this.orgData?.users,
      updatedThreshold: null,
      updatedName: '',
      thresholdRules: [(v) => v >= 0 || 'Threshold must be greater than 0'],
    };
  },
  computed: {
    ...mapGetters(['orgData']),
  },
  methods: {
    ...mapActions(['updateOrg']),
    addUser() {
      this.addedUsers.push(this.newUserName);
      this.newUserName = '';
    },
    removeFromList(list, target) {
      if (list !== 'currentUsers')
        this[list] = this[list].filter((name) => name !== target);
      else {
        this.removedUsers.push(target);
      }
    },
    displayCurrent(users) {
      return users.filter((el) => !this.removedUsers.includes(el));
    },
    async handleSave() {
      const updatedUsers = [
        ...this.orgData.users.filter((el) => !this.removedUsers.includes(el)),
        ...this.addedUsers,
      ];

      const updatedOrg = {
        users: updatedUsers,
      };

      this.updatedThreshold
        ? (updatedOrg.warningThreshold = this.updatedThreshold)
        : (updatedOrg.warningThreshold = this.orgData.warningThreshold);
      this.updatedName
        ? (updatedOrg.name = this.updatedName)
        : (updatedOrg.name = this.orgData.name);

      await this.updateOrg(updatedOrg);
      router.push('tracker');
    },
  },
};
</script>

<style scoped>
.settings-main {
  width: 60%;
  margin: auto;
  margin-top: 5%;
}

.settings-header {
  margin-bottom: 3%;
}

.settings-section {
  margin-bottom: 3%;
}

.settings-users-lists {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.settings-users-list {
  display: flex;
  flex-direction: column;
}

.settings-users-subheader {
  margin-bottom: 2%;
}

.settings-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.settings-button {
  width: 8rem;
}
</style>
