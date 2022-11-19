<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template v-if="!item.children">
      <app-link v-if="item.label" :to="item.path">
        <el-menu-item
          :index="item.path"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon v-if="item.icon" :icon-class="item.icon" />
          <template #title>
            {{ generateTitle(item.label) }}
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else :index="item.path" popper-append-to-body>
      <!-- popper-append-to-body -->
      <template #title>
        <svg-icon
          v-if="(item.meta || {}).icon"
          :icon-class="item.meta.icon"
        ></svg-icon>
        <span v-if="item.label">{{ generateTitle(item.label) }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { isExternal, generateTitle } from "@/utils";
import AppLink from "./Link.vue";

import SvgIcon from "@/components/SvgIcon/index.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    required: false,
  },
  basePath: {
    type: String,
    required: true,
  },
});

const onlyOneChild = ref();

function hasOneShowingChild(children = [], parent) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter((item) => {
    if (item.meta && item.meta.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, noShowingChildren: true };
    return true;
  }
  return false;
}
</script>
