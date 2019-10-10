<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div style="width: 1024px; margin: auto;">
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">Example 1</a-menu-item>
          <a-menu-item key="2">Example 2</a-menu-item>
          <a-menu-item key="3">Example 3</a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content
      style="padding: 0 50px; min-height: 100vh; min-width: 1024px; margin: 0 auto; box-sizing: content-box;"
    >
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div
        :style="{ background: '#fff', padding: '32px', minHeight: '180px', borderRadius: '15px' }"
      >
        <!-- Entry point to the Vue app with Nuxt -->
        <nuxt />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">Created by Carmine for OneDot, 2019 ©</a-layout-footer>
  </a-layout>
</template>

<style>
/* Use this to debug CSS */
/* * {
  border: 1px solid red;
} */

#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>