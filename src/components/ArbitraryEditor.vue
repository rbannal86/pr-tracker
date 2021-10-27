<template>
  <div>
    <v-text-field v-model="a" label="field-1"></v-text-field>
    <v-text-field v-model="b" label="field-2"></v-text-field>
    <v-checkbox v-model="c" label="field-3"></v-checkbox>
  </div>
</template>

<script>
/**
 * Naive way to map 2 way computed properties. Idea borrowed from SpyFu
 * @see https://github.com/spyfu/spyfu-vuex-helpers/blob/master/lib/helpers/map_two_way_state.js
 * @param {String[]} keys Keys to map from store.
 * @returns {Object} Object with computed properties to spread onto the computed property.
 */
function mapComputedProps(keys) {
  const computedProps = {};
  keys.forEach(key => {
    computedProps[key] = {
      get: function() {
        return this.arbitraryData[key];
      },
      set: function(value) {
        console.log('local setter', value);
        this.arbitraryData = { ...this.arbitraryData, [key]: value };
        return this.arbitraryData[key];
      }
    }
  });
  return computedProps;
}

export default {
  props: {
    arbitraryData: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapComputedProps(['a', 'b', 'c'])
  }
}
</script>

<style>

</style>
