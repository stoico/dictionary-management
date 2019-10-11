<template>
  <div>
    <h1 style="text-align: center;">
      {{ dictionariesFromStore[0].name }}
    </h1>
    <a-table
      bordered
      :data-source="dictionariesFromStore[0].content"
      :columns="columns"
      size="middle"
    >
      <template
        slot="validity"
        slot-scope="text, record"
      >
        <div v-if="record.validity.status === true">
          <a-icon
            theme="filled"
            type="check-circle"
            class="valid-message"
          />
        </div>
        <div v-else>
          <!-- TO DO: else if reason Cycle or Chain then red warning -->
          <div v-if="record.validity.reason === 'Cycle'">
            <a-icon
              theme="filled"
              type="exclamation-circle"
              style="color: #fa541c;"
            />
            <div class="severe-warning-message font10px">
              {{ record.validity.reason }}
            </div>
          </div>
          <div v-else-if="record.validity.reason === 'Chain'">
            <a-icon
              theme="filled"
              type="exclamation-circle"
              style="color: #fa541c;"
            />
            <div class="severe-warning-message font10px">
              {{ record.validity.reason }}
            </div>
          </div>
          <div v-else>
            <a-icon
              theme="filled"
              type="exclamation-circle"
              style="color: orange;"
            />
            <div class="warning-message font10px">
              {{ record.validity.reason }}
            </div>
          </div>
        </div>
      </template>
      <template
        slot="domain"
        slot-scope="text, record"
      >
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'domain', $event)"
        />
      </template>
      <template
        slot="range"
        slot-scope="text, record"
      >
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'range', $event)"
        />
      </template>
      <template
        slot="operation"
        slot-scope="text, record"
      >
        <a-popconfirm
          v-if="dataSource.length"
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
        @click="handleAdd"
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
import { uuid } from 'vue-uuid';
import {
  checkForDuplicates,
  checkForForks,
  checkForCycles,
  checkForChains,
  resetValidity,
} from '../assets/js/consistencyChecks';
import EditableCell from './EditableCell';

export default {
  components: {
    EditableCell,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selected:
    {
      type: Object,
      required: true,
    },
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
  // Make validity checks run at every change in the dictionary.
  computed: {
    // Next level shit
    dictionariesFromStore() {
      return this.$store.state.dictionaries;
    },
    warningColor(record) {
      if (record.validity.reason === ('Chain' || 'Cycle')) {
        return 'severe-warning-message';
      }
      if (record.validity.reason === ('Duplicate' || 'Fork')) {
        return 'warning-message';
      }
      return 'valid-message';
    },
  },
  watch: {
    dataSource() {
      this.runAllValidityChecks();
    },
  },
  // Make validity checks run at the start
  mounted() {
    this.runAllValidityChecks();
    console.log(this.selected);
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    handleAdd() {
      const { dataSource } = this;
      const newData = {
        key: uuid.v4(),
        domain: this.domainToAdd,
        range: this.rangeToAdd,
        validity: { status: true, reason: '' },
      };
      this.dataSource = [...dataSource, newData];
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map((item) => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0],
        );
        delete target.editable;
        this.data = newData;
      }
    },
    // TO DO: Create master helper function to avoid repetition of code
    // If possible
    runAllValidityChecks() {
      this.dataSource = resetValidity(this.dataSource);
      // Change the order to establish which validity error needs to be marked (first)
      // TO DO: Add conditions to check whether the row is already valid: false

      this.dataSource = checkForDuplicates(this.dataSource);
      this.dataSource = checkForForks(this.dataSource);
      this.dataSource = checkForCycles(this.dataSource);
      this.dataSource = checkForChains(this.dataSource);
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
