// vitest.config.js
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ["src/tests/unit/*.test.ts"],
    exclude: ["node_modules/**", "dist/**", "tests/e2e/**", "**/*.d.ts"],
  },
});
