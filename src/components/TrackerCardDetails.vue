<template>
  <div class="tracker-card-details-main">
    <div v-if="!edit && prDisplayData(id)" class="tracker-card-details-show">
      <div
        class="tracker-card-details-section"
        v-for="key in Object.keys(prDisplayData(id))"
        :key="`${id}${key}`"
      >
        <tracker-card-details-section
          :data="prDisplayData(id)[key]"
          :label="labels[key]"
          :id="id"
        ></tracker-card-details-section>
      </div>
      <div class="tracker-card-details-buttons">
        <v-btn @click="toggleEdit" color="green lighten-2">Edit</v-btn>
        <v-btn color="red lighten-2" @click="handleDeactivate()">
          Deactivate
        </v-btn>
      </div>
    </div>
    <div v-else>
      <tracker-card-details-edit
        :toggleEdit="toggleEdit"
        :toggleDetails="toggleDetails"
        :id="id"
      ></tracker-card-details-edit>
    </div>
  </div>
</template>

<script>
import TrackerCardDetailsSection from './TrackerCardDetailsSection.vue';
import TrackerCardDetailsEdit from './TrackerCardDetailsEdit.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TrackerCardDetails',
  components: {
    TrackerCardDetailsSection,
    TrackerCardDetailsEdit,
  },
  props: {
    id: {
      required: true,
    },
    toggleDetails: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      labels: {
        assignee: 'Assignee',
        openDate: 'Open Date',
        reviewers: 'Reviewers',
        reviewCount: 'Reviewer Count',
        approvals: 'Approvals',
      },
      edit: false,
    };
  },
  methods: {
    ...mapActions(['deactivatePr']),
    toggleEdit() {
      return (this.edit = !this.edit);
    },
    handleDeactivate() {
      this.deactivatePr(this.id);
      this.toggleDetails();
    },
  },
  computed: {
    ...mapGetters(['prById', 'prDisplayData']),
  },
  mounted() {
    if (this.id === 'new') this.edit = true;
  },
};
</script>

<style scoped>
.tracker-card-details-main {
  background-color: lightgrey;
  padding: 1.5rem;
}
.tracker-card-details-show {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tracker-card-details-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media only screen and (max-width: 750px) {
  .tracker-card-details-show {
    font-size: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .tracker-card-details-section {
    margin-bottom: 0.5rem;
  }
}
</style>
