<template>
  <div>
    <a-divider />

    <a-input
      v-model="dictionaryName"
      style="width: 220px;"
      autosize="true"
      size="large"
      default-value="Name"
      :maxlength="max"
    />
    <a-button
      type="primary"
      class="editable-add-btn"
      size="large"
      @click="addDictionary"
    >
      <a-icon type="plus-circle" />
      Create new dictionary
    </a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dictionaryName: 'New dictionary',
      max: 26,
    };
  },
  methods: {
    handleAdd() {

    },
    addDictionary() {
      this.$store.commit('addDictionary', this.dictionaryName);
      this.$store.commit('setIndexSelected', this.$store.state.dictionaries.length - 1);
    },
  },
};
</script>

<style>
</style>
