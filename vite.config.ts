import { defineConfig, loadEnv, ConfigEnv } from "vite";
import { getPluginsList } from "./build/plungins";
import { resolve } from "path";

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

// 设置别名
const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "@api": pathResolve("src/api")
};

export default defineConfig(({ mode }: ConfigEnv): any => {
  const root = process.cwd();
  const { VITE_APP_NAME, VITE_PORT, VITE_PUBLIC_PATH } = loadEnv(mode, root);

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    server: {
      host: "0.0.0.0",
      port: VITE_PORT,
      https: false,
      proxy: {
        "/api": {
          target: "http://0.0.0.0:5200",
          changeOrigin: true
        }
      }
    },
    plugins: getPluginsList(VITE_APP_NAME),
    optimizeDeps: {
      include: ["pinia"]
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 4000
    }
  };
});
