import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { basicRoutes,asyncRoutes } from "./routes";
import { getToken } from "@/utils";
import { setupRouterGuard } from "./guard";

const isHash = import.meta.env.VITE_USE_HASH === "true";
export const router = createRouter({
  history: isHash ? createWebHashHistory("/") : createWebHistory("/"),
  routes: [...basicRoutes,...asyncRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app) {
  setupRouterGuard(router);
  app.use(router);
}

export function resetRouter() {
  const basicRouteNames = getRouteNames(basicRoutes);
  router.getRoutes().forEach((route) => {
    const name = route.name;
    if (!basicRouteNames.includes(name)) {
      router.removeRoute(name);
    }
  });
}

export function getRouteNames(routes) {
  return routes.map((route) => getRouteName(route)).flat(1);
}

function getRouteName(route) {
  const names = [route.name];
  if (route.children && route.children.length) {
    names.push(...route.children.map((item) => getRouteName(item)).flat(1));
  }
  return names;
}
