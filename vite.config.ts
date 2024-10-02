import { defineConfig } from "vite";
import VueRouter from "unplugin-vue-router/vite";
import Vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      extensions: [".vue"],
      dts: "src/typed-router.d.ts",
    }),
    Vue(),
  ],
});
