import path from "node:path";

import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Tailwindcss from "@tailwindcss/vite";
import Vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import WebfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ["vue", VueRouterAutoImports],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/stores"],
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/components.d.ts",
    }),
    Vue(),
    VueDevTools(),
    Tailwindcss(),
    WebfontDownload(),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
