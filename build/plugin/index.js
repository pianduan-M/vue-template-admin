import vue from "@vitejs/plugin-vue";

import unplugin from "./unplugin";
import { configHtmlPlugin } from "./html";

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [vue(), ...unplugin, configHtmlPlugin(viteEnv, isBuild)];

  return plugins;
}
