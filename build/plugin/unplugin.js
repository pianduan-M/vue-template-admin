import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from "vite-plugin-style-import";

export default [
  // 自动引入组件
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  // 自动引入 hook
  AutoImport({
    imports: ["vue", "vue-router"],
  }),
  // 自动引入组件样式
  createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    // 自定义规则
    libs: [
      // {
      //   libraryName: "ant-design-vue",
      //   esModule: true,
      //   resolveStyle: (name) => {
      //     return `ant-design-vue/es/${name}/style/index`;
      //   },
      // },
    ],
  }),
];
