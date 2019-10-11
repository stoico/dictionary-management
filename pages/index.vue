<template>
  <Table :data-set="dict" />
</template>

<script>
import { uuid } from 'vue-uuid';
import Table from '../components/Table';

export default {
  components: {
    Table,
  },
  data() {
    return {
      dict: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Dark Grey',
          range: 'Black',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Acquamarine',
          range: 'Blue',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    };
  },
};
</script>

<style>
.center-flex {
  display: flex;
  justify-content: center;
}
</style>
