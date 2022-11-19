import { createApp } from "vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupI18n } from "@/lang";
import App from "./App.vue";
import 'virtual:svg-icons-register'

async function setupApp() {
  const app = createApp(App);
  setupStore(app);

  setupI18n(app);

  await setupRouter(app);
  app.mount("#app");
}

setupApp();
  