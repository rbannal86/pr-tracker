<template>
  <div class="tracker-card-main">
    <v-card :class="`tracker-card-initial ${id}`" id :color="backgroundColor">
      <v-card-title v-if="typeof id === 'number'">{{
        prById(id).name
      }}</v-card-title>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2 tracker-card-expand-button"
            :aria-label="label"
            text
            icon
            @click="toggleExpand"
            label
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ currentIcon }}</v-icon>
          </v-btn>
        </template>
        <span>{{
          expanded && label === 'Create New PR' ? 'Cancel' : label
        }}</span>
      </v-tooltip>
    </v-card>
    <tracker-card-details
      :id="id"
      v-if="expanded"
      :toggleDetails="toggleExpand"
    ></tracker-card-details>
  </div>
</template>

<script>
import TrackerCardDetails from './TrackerCardDetails.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'TrackerCard',
  components: {
    TrackerCardDetails,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    openIcon: {
      type: String,
      required: true,
    },
    closeIcon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentPr: this.pr,
      expanded: false,
      currentIcon: this.openIcon,
      backgroundColor: 'gray',
    };
  },
  methods: {
    toggleExpand() {
      this.currentIcon =
        this.currentIcon === this.openIcon ? this.closeIcon : this.openIcon;
      return (this.expanded = !this.expanded);
    },
    setBgColor() {
      const current = new Date();
      const start = Date.parse(this.prById(this.id)?.openDate);

      if (isNaN(start)) return (this.backgroundColor = 'blue');

      const days = Math.floor((current - start) / (60 * 60 * 24 * 1000));

      let color;

      if (days > this.orgData.warningThreshold) color = 'red';
      else if (days > this.orgData.warningThreshold / 2) color = 'yellow';
      else if (days >= 0) color = 'green';
      else color = 'grey';

      this.backgroundColor = color;
    },
    handleUpdate() {
      console.log('handlingUpdate');
      this.setBgColor();
    },
  },
  computed: mapGetters(['orgData', 'prById']),
  mounted() {
    this.setBgColor();
  },
  updated() {
    this.setBgColor();
  },
};
</script>

<style scoped>
.tracker-card-initial {
  height: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.new {
  justify-content: center;
}
.tracker-card-expand-button {
  align-self: center;
}
</style>
