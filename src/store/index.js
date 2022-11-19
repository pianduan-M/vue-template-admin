import { createPinia } from "pinia";

export function setupStore(app) {
  console.log("setupStore");
  app.use(createPinia());
}

export * from "./modules";
