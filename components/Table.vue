<template>
  <div>
    <h2>Stored data</h2>
    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          v-on:confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-divider></a-divider>
    <h2>Would you like to add a new row?</h2>
    <div style="display: flex; flex-direction: row; margin-bottom: 240px;">
      <div style="margin-bottom: 10px; margin-right: 10px;">
        <a-input
          style="width: 260px;"
          autosize="true"
          addonBefore="Domain"
          defaultValue="Stonegrey"
          :maxlength="max"
          v-model="domainToAdd"
        />
      </div>
      <div style="margin-bottom: 10px; margin-right: 10px;">
        <a-input
          style="width: 260px;"
          autosize="true"
          addonBefore="Range"
          defaultValue="Dark Grey"
          :maxlength="max"
          v-model="rangeToAdd"
        />
      </div>
      <a-button type="primary" class="editable-add-btn" v-on:click="handleAdd">Add</a-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      max: 26,
      domainToAdd: "Silver",
      rangeToAdd: "Mystic Silver",
      count: 6,
      dataSource: [
        {
          domain: "Stonegrey",
          range: "Dark Grey",
          validity: { status: true, reason: "" },
          key: 0
        },
        {
          domain: "Midnight Black",
          range: "Black",
          validity: { status: true, reason: "" },
          key: 1
        },
        {
          domain: "Mystic Silver",
          range: "Silver",
          validity: { status: true, reason: "" },
          key: 2
        },
        {
          domain: "Stonegrey",
          range: "Dark Grey",
          validity: { status: true, reason: "" },
          key: 3
        },
        {
          domain: "Stonegrey",
          range: "Anthracite",
          validity: { status: true, reason: "" },
          key: 4
        },
        {
          domain: "Dark Grey",
          range: "Stonegrey",
          validity: { status: true, reason: "" },
          key: 5
        }
      ],
      columns: [
        {
          title: "Valid?",
          dataIndex: "validity",
          scopedSlots: { customRender: "validity" }
        },
        {
          title: "Domain",
          dataIndex: "domain",
          width: "30%",
          scopedSlots: { customRender: "domain" }
        },
        {
          title: "Range",
          dataIndex: "range",
          width: "30%",
          scopedSlots: { customRender: "range" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      const { dataSource } = this;
      const newData = {
        key: this.count,
        domain: this.domainToAdd,
        range: this.rangeToAdd
      };
      this.dataSource = [...dataSource, newData];
      this.count = this.count + 1;
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    }
  }
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

.warning-message {
  color: orange;
  font-size: 10px;
}

.severe-warning-message {
  color: #fa541c;
  font-size: 10px;
}
</style>
