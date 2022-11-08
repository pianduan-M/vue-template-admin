import { createApp } from "vue";
import { setupRouter } from "@/router";
import App from "./App.vue";

async function setupApp() {
  const app = createApp(App);
  await setupRouter(app);
  app.mount("#app");
}

setupApp();
