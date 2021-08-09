<template>
  <div class="tracker-card-details-edit-main">
    <v-text-field
      label="Issue Name"
      :value="issueName"
      v-model="issueName"
    ></v-text-field>
    <v-select
      :items="users"
      label="Assignee"
      :value="assignee"
      v-model="assignee"
    ></v-select>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date Created"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        scrollable
        :full-width="screenToggle"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">
          Cancel
        </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)">
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
    <v-select
      :items="users"
      label="Reviewers"
      multiple
      :value="reviewers"
      v-model="reviewers"
    ></v-select>
    <v-text-field
      label="Reviewer Count"
      type="number"
      :value="reviewCount"
      v-model.number="reviewCount"
    ></v-text-field>
    <v-text-field
      label="Approvals"
      type="number"
      :value="approvals"
      v-model.number="approvals"
    ></v-text-field>
    <div class="tracker-card-details-edit-buttons">
      <v-btn @click="handleToggle" color="red lighten-2">Cancel</v-btn>
      <v-btn @click="handleSave" color="green lighten-2">Save</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TrackerCardDetailsEdit',
  props: {
    id: {
      required: true,
    },
    toggleEdit: {
      type: Function,
      required: true,
    },
    toggleDetails: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      users: [],
      menu: false,
      approvals: 0,
      reviewCount: 0,
      reviewers: [],
      issueName: '',
      assignee: '',
      date: '',
    };
  },
  methods: {
    ...mapActions(['updatePr', 'createPr']),
    handleSave() {
      if (this.id === 'new') {
        this.createPr(this.updatedPr);
        this.toggleDetails();
      } else this.updatePr(this.updatedPr);

      this.toggleEdit();
    },
    handleToggle() {
      if (this.id === 'new') this.toggleDetails();
      this.toggleEdit();
    },
  },
  computed: {
    ...mapGetters(['orgData', 'prById']),
    screenToggle() {
      return screen.width < 750;
    },
    updatedPr: function() {
      return {
        id: this.id,
        name: this.issueName,
        assignee: this.assignee,
        reviewers: this.reviewers,
        reviewCount: this.reviewCount,
        openDate: this.date,
        approvals: this.approvals,
      };
    },
  },
  mounted() {
    this.users = this.orgData.users;
    const currPr = this.prById(this.id);
    this.date =
      currPr?.openDate ||
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    this.approvals = currPr?.approvals || 0;
    this.reviewCount = currPr?.reviewCount || 0;
    this.reviewers = currPr?.reviewers || [];
    this.issueName = currPr?.name || '';
    this.assignee = currPr?.assignee || '';
  },
};
</script>

<style scoped>
.tracker-card-details-edit-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
