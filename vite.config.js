import { defineConfig, loadEnv } from "vite";

import { convertEnv, getSrcPath, getRootPath } from "./build/utils";
import { createVitePlugins } from "./build/plugin";
import { createViteProxy, viteDefine } from "./build/config";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const srcPath = getSrcPath();
  const rootPath = getRootPath();

  const isBuild = command === "build";

  const env = loadEnv(mode, process.cwd());
  const viteEnv = convertEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_USE_PROXY, VITE_PROXY_TYPE } =
    viteEnv;

  return {
    // base: VITE_PUBLIC_PATH || "/",
    resolve: {
      alias: {
        "@": srcPath,
        "~": rootPath,
      },
    },
    define: viteDefine,
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      host: "0.0.0.0",
      port: VITE_PORT,
      open: false,
      proxy: createViteProxy(VITE_USE_PROXY, VITE_PROXY_TYPE),
    },
    build: {
      target: "es2015",
      outDir: "dist",
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
    // 全局 css 注册
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/common/style.scss";`,
        },
      },
    },
  };
});
