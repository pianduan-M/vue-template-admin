import { defineStore } from "pinia";
import { lStorage } from "@/utils";
import { getLanguage } from "@/lang/index.js";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    device: "desktop",
    language: getLanguage(),
    size: lStorage.get("size") || "default",
    sidebar: {
      opened: lStorage.get("sidebarStatus")
        ? !!+lStorage.get("sidebarStatus")
        : true,
      withoutAnimation: false,
    },
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        lStorage.set("sidebarStatus", 1);
      } else {
        lStorage.set("sidebarStatus", 0);
      }
    },
    closeSideBar(withoutAnimation) {
      lStorage.set("sidebarStatus", 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device) {
      this.device = device;
    },
    setLanguage(language) {
      this.language = language;
      lStorage.set("language", language);
    },
    setSize(size) {
      this.size = size;
      lStorage.set("size", size);
    },
  },
});

