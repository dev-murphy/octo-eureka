import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    appName: "Octo Eureka",
  }),
});
