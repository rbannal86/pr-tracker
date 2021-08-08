<template>
  <div>
    <ul class="tracker-pr-list">
      <li v-for="pr in allPrs" :key="pr.id" class="tracker-pr-list-item">
        <tracker-card
          v-if="!pr.deactivated"
          :id="pr.id"
          :openIcon="existingOpenIcon"
          :closeIcon="existingCloseIcon"
          label="Toggle Details"
        ></tracker-card>
      </li>
      <li key="tracker-pr-new" class="tracker-pr-list-item">
        <tracker-card
          :id="'new'"
          :openIcon="newOpenIcon"
          :closeIcon="newClosedIcon"
          label="Create New PR"
        ></tracker-card>
      </li>
    </ul>
  </div>
</template>

<script>
import TrackerCard from '../components/TrackerCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Tracker',
  components: {
    TrackerCard,
  },
  data() {
    return {
      newOpenIcon: 'mdi-plus-circle-outline',
      newClosedIcon: 'mdi-close-circle-outline',
      existingOpenIcon: 'mdi-chevron-down',
      existingCloseIcon: 'mdi-chevron-up',
    };
  },
  computed: mapGetters(['allPrs']),
};
</script>

<style scoped>
.tracker-pr-list {
  list-style: none;
  padding: 3%;
}
.tracker-pr-list-item {
  margin: 2%;
}
</style>
