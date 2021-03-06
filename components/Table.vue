<template>
  <div>
    <!-- Display name of the Dictionary -->
    <h1 style="text-align: center;">
      {{ dictionariesFromStore[selectedIndex].name }}
    </h1>
    <!-- Display pairs in the dictionary in a table -->
    <a-table
      bordered
      :data-source="dictionariesFromStore[selectedIndex].content"
      :columns="columns"
      size="middle"
    >
      <!-- Display validity of the pair,
      with an icon (green, orange, red) and label -->
      <template
        slot="validity"
        slot-scope="text, record"
      >
        <a-icon
          theme="filled"
          :class="warningColor(record)"
          :type="warningIcon(record)"
        />
        <div
          class="font10px"
          :class="warningColor(record)"
        >
          {{ record.validity.reason }}
        </div>
      </template>
      <template
        slot="domain"
        slot-scope="text, record"
      >
        <!-- Display domain column -->
        <editable-cell
          :text="text"
          @change="onValueChange(selectedIndex, record.key, 'domain', $event)"
        />
      </template>
      <template
        slot="range"
        slot-scope="text, record"
      >
        <!-- Display range column -->
        <editable-cell
          :text="text"
          @change="onValueChange(selectedIndex, record.key, 'range', $event)"
        />
      </template>
      <!-- Button to delete the pair -->
      <template
        slot="operation"
        slot-scope="text, record"
      >
        <a-popconfirm
          v-if="dictionariesFromStore.length"
          style="width: 40px; !important"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">
            <a-icon
              type="delete"
              theme="outlined"
            />
            <span>Delete</span>
          </a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-divider />
    <!-- Input to add a new pair to the dictionary -->
    <h2>Would you like to add a new row?</h2>
    <div style="display: flex; flex-direction: row;">
      <div style="margin-bottom: 10px; margin-right: 10px;">
        <a-input
          v-model="domainToAdd"
          style="width: 260px;"
          autosize="true"
          addon-before="Domain"
          default-value="Stonegrey"
          :maxlength="max"
        />
      </div>
      <div style="margin-bottom: 10px; margin-right: 10px;">
        <a-input
          v-model="rangeToAdd"
          style="width: 260px;"
          autosize="true"
          addon-before="Range"
          default-value="Dark Grey"
          :maxlength="max"
        />
      </div>
      <a-button
        type="primary"
        class="editable-add-btn"
        @click="handleAdd()"
      >
        Add row
      </a-button>
    </div>
    <div style="padding: 8px 0; font-size: 10px;">
      The validity of the new row will be checked in real-time.
    </div>
  </div>
</template>
<script>
import EditableCell from './EditableCell';

export default {
  components: {
    EditableCell,
  },
  data() {
    return {
      max: 26,
      domainToAdd: 'Mystic Silver',
      rangeToAdd: 'Silver',
      dataSource: [],
      columns: [
        {
          title: 'Valid?',
          dataIndex: 'validity',
          scopedSlots: { customRender: 'validity' },
        },
        {
          title: 'Domain',
          dataIndex: 'domain',
          width: '30%',
          scopedSlots: { customRender: 'domain' },
        },
        {
          title: 'Range',
          dataIndex: 'range',
          width: '30%',
          scopedSlots: { customRender: 'range' },
        },
        {
          title: '',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  computed: {
    // Next level shit
    dictionariesFromStore() {
      return this.$store.state.dictionaries;
    },
    selectedDictionary() {
      return this.$store.state.dictionaries[this.$store.state.indexOfSelected].content;
    },
    selectedIndex() {
      return this.$store.state.indexOfSelected || 0;
    },
  },
  watch: {
    // Make validity checks run at every change in the dictionary.
    selectedIndex() {
      this.runAllValidityChecks();
    },
  },
  // Make validity checks run at the start
  mounted() {
    this.runAllValidityChecks();
  },
  methods: {
    onValueChange(index, key, column, value) {
      this.$store.commit('editPair', {
        index, key, column, value,
      });
      this.runAllValidityChecks();
    },
    onDelete(key) {
      const index = this.$store.state.indexOfSelected;

      this.$store.commit('deletePairFromDictionary', { index, key });
      this.runAllValidityChecks();
    },
    handleAdd() {
      const domain = this.domainToAdd;
      const range = this.rangeToAdd;

      const index = this.$store.state.indexOfSelected;
      const dictionary = this.dictionariesFromStore[index];
      if (dictionary) {
        this.$store.commit('addNewPairToDictionary', { dictionary, domain, range });
      }
      this.runAllValidityChecks();
    },
    runAllValidityChecks() {
      // reset validity before running the checks
      this.$store.commit('resetValidity', this.$store.state.indexOfSelected);

      // Check for duplicates, forks, cycles, chains
      //
      // Priority: [First] Chains -> Cycles -> Forks -> Duplicates [Last]
      // Change the order to establish which validity error needs to be marked first
      this.$store.commit('checkForCycles', this.$store.state.indexOfSelected);
      this.$store.commit('checkForChains', this.$store.state.indexOfSelected);
      this.$store.commit('checkForDuplicates', this.$store.state.indexOfSelected);
      this.$store.commit('checkForForks', this.$store.state.indexOfSelected);
    },
    warningColor(record) {
      if (record.validity.reason === 'Cycle' || record.validity.reason === 'Chain') {
        return 'severe-warning-message';
      }
      if (record.validity.reason === 'Duplicate' || record.validity.reason === 'Fork') {
        return 'warning-message';
      }
      return 'valid-message';
    },
    warningIcon(record) {
      if (record.validity.status) {
        return 'check-circle';
      }
      return 'exclamation-circle';
    },
  },
  // mounted() {
  //   if (localStorage.dataSource) this.dataSource = localStorage.dataSource;
  // },
  // watch: {
  //   name(newName) {
  //     localStorage.dataSource = newName;
  //   }
  // },
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}

.ant-table-wrapper:focus {
  outline: none !important;
}

th:nth-child(1),
td:nth-child(1) {
  width: 10%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 15%;
}

th:nth-child(1),
td:nth-child(1),
th:nth-child(4),
td:nth-child(4) {
  border: white !important;
  background: white !important;
}

th:nth-child(2),
td:nth-child(2),
th:nth-child(3),
td:nth-child(3) {
  border: 1px solid #e8e8e8 !important;
}

th:nth-child(1),
td:nth-child(1) {
  text-align: center !important;
  /* width: 5% !important; */
}

table {
  border: none !important;
}

.font10px {
  font-size: 10px;
}

.valid-message {
  color: #36bb0f;
}
.warning-message {
  color: orange;
}

.severe-warning-message {
  color: #fa541c;
}
</style>
