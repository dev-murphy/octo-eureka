import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

// lcoal files
import App from "./App.vue";
import "./style.css";

createApp(App).use(router).use(createPinia()).mount("#app");
