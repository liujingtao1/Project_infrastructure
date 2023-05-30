import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import legacy from "@vitejs/plugin-legacy";
import removeConsole from "vite-plugin-remove-console";
import { createHtmlPlugin } from "vite-plugin-html";
import DefineOptions from "unplugin-vue-define-options/vite";
import viteCompression from "vite-plugin-compression";

export function getPluginsList(VITE_APP_NAME: string) {
  return [
    vue(),
    // 默认引入vue、vue-router相关配置
    AutoImport({ imports: ["vue", "vue-router"], dts: "src/auto-import.d.ts" }),
    // 浏览器兼容适配
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    }),
    // 线上环境删除console
    removeConsole(),
    DefineOptions(),
    viteCompression({
      deleteOriginFile: false,
      algorithm: "gzip"
    }),
    // html模板
    createHtmlPlugin({
      minify: true,
      entry: "src/main.ts",
      inject: {
        data: {
          title: VITE_APP_NAME
        }
      }
    })
  ];
}
