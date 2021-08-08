<template>
  <div>
    <h3>{{ label }}</h3>
    <v-divider color="black"></v-divider>
    <div v-if="Array.isArray(data)">
      <ul class="tracker-card-details-list">
        <li v-for="item in data" :key="`${item}${id}`" class="subtitle-1">
          {{ item }}
        </li>
      </ul>
    </div>
    <span v-else class="body-2">{{ data }}</span>
  </div>
</template>

<script>
export default {
  name: 'TrackerCardDetailsSection',
  props: {
    data: {
      required: true,
    },
    label: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: [Number, String],
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.tracker-card-details-list {
  list-style: none;
  padding-left: 0;
}
</style>
