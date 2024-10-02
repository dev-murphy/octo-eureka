import { createApp } from "vue";
import { createPinia } from "pinia";

// lcoal files
import App from "./App.vue";
import "./style.css";

createApp(App).use(createPinia()).mount("#app");
