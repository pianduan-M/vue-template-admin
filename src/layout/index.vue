<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
      </div>

      <!--主页面-->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";
import { AppMain, Navbar } from "./components/index.js";
import Sidebar from "./components/Sidebar/index.vue";

import { useAppStore } from "@/store";

const { width } = useWindowSize();
const WIDTH = 992;

const app = useAppStore();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === "mobile",
}));

watchEffect(() => {
  if (width.value < WIDTH) {
    app.toggleDevice("mobile");
    app.closeSideBar(true);
  } else {
    app.toggleDevice("desktop");
  }
});

function handleClickOutside() {
  app.closeSideBar(false);
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
