import { defineConfig } from "vite";
import AutoRouter from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Vue from "@vitejs/plugin-vue";
import WebfontDownload from "vite-plugin-webfont-dl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      extensions: [".vue"],
      dts: "src/typed-router.d.ts",
    }),
    AutoRouter({
      imports: ["vue", VueRouterAutoImports],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/stores"],
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/components.d.ts",
    }),
    WebfontDownload(),
    Vue(),
  ],
});
