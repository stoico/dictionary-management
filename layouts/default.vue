<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    style="height:100vh"
  >
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <span
        v-if="!collapsed"
        style="padding: 12px 24px; color: #324453;"
      >
        Dictionaries
      </span>
      <a-menu
        theme="dark"
      >
        <a-menu-item
          v-for="(dictionary, index) in dictionariesFromStore"
          :key="index"
          @click="select(index)"
        >
          <!-- Display the list of dictionaries -->
          <a-icon type="database" />
          <span>{{ dictionary.name }}</span>

          <a-tooltip placement="right">
            <template slot="title">
              <span>Delete dictionary</span>
            </template>
            <!-- Button to delete each dictionary -->
            <a-icon
              type="delete"
              theme="filled"
              class="delete-dict-icon"
              @click="deleteObject(dictionary)"
            />
          </a-tooltip>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <!-- Load previously saved data -->
        <a-button
          icon="download"
          size="large"
          style="float:right; margin: 12px 12px 12px 6px;"
          @click="loadData"
        >
          Load saved data
        </a-button>
        <!-- Display 'Save' button to store data in local storage -->
        <a-button
          icon="save"
          size="large"
          type="primary"
          style="float:right; margin: 12px 6px 12px 12px;"
          @click="saveData"
        >
          Save for later
        </a-button>
      </a-layout-header>
      <a-layout-content
        class="content-style"
        :style="{ padding: '24px', background: '#fff', minHeight: '180px', borderRadius: '15px'}"
      >
        <!-- Entry point to the Vue app with Nuxt -->
        <nuxt />
      </a-layout-content>
      <div class="center-flex">
        <CreateTableButton />
      </div>
      <!-- Footer -->
      <a-layout-footer class="footer-style">
        Created by Carmine for OneDot, 2019 ©
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import CreateTableButton from '../components/CreateTableButton';

export default {
  components: {
    CreateTableButton,
  },
  data() {
    return {
      collapsed: false,
      selDictionary: this.$store.state.dictionaries[0],
    };
  },
  computed: {
    // Next level shit
    dictionariesFromStore() {
      return this.$store.state.dictionaries;
    },
    selectedIndex() {
      return [(this.$store.state.indexOfSelected + 1).toString()];
    },
  },
  mounted() {
  },
  methods: {
    deleteObject(dictionary) {
      // Delete if it's not the only one remaining
      if (this.dictionariesFromStore.length > 1) {
        this.select(this.dictionariesFromStore.indexOf(dictionary) - 1);
        this.$store.commit('deleteDictionary', dictionary);
      }
    },
    select(index) {
      this.$store.commit('setIndexSelected', index);
    },
    saveData() {
      this.$store.commit('saveDataLocally');
      this.$message.success('Dictionaries saved');
    },
    loadData() {
      this.$store.commit('retrieveLocalData');
      this.$message.success('Data loaded successfully');
    },
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}

.content-style {
  margin: 24px auto;
  max-width: 1024px;
  box-sizing: content-box;
  display: inline-table;
}

.footer-style {
  text-align: center;
  margin-top: 180px;
}

.delete-dict-icon {
  color: #ffffff99;
  float: right;
  margin-top: 14px;
}
</style>
