import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { stringify, parse } from "zipson";

import router from "@/router";
import App from "@/App.vue";
import "@/style.css";

createApp(App)
  .use(router)
  .use(
    createPinia().use(
      createPersistedState({
        storage: localStorage,
        serializer: {
          serialize: stringify,
          deserialize: parse,
        },
      })
    )
  )
  .mount("#app");
