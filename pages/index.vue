<template>
  <div class="container">
    <div>
      <h1 class="title">onedot</h1>
      <Table />
    </div>
  </div>
</template>

<script>
import Table from "~/components/Table.vue";

export default {
  components: {
    Table
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  width: 960px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
